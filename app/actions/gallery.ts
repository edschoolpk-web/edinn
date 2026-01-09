"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { storage } from "@/lib/storage";

import { GalleryImage } from "@prisma/client";

type GalleryResponse = {
  success: boolean;
  data?: GalleryImage[];
  error?: string;
};

type SingleGalleryResponse = {
  success: boolean;
  data?: GalleryImage;
  error?: string;
};

export async function getGalleryImages(category: string): Promise<GalleryResponse> {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: images };
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return { success: false, error: "Failed to fetch images" };
  }
}

export async function uploadGalleryImage(formData: FormData): Promise<SingleGalleryResponse> {
  try {
    const file = formData.get("image") as File | null;
    const category = (formData.get("category") as string) || "general";

    if (!file || file.size === 0) {
      return { success: false, error: "No file provided" };
    }

    // Limit Check for home category only
    if (category === "home") {
      const currentCount = await prisma.galleryImage.count({ where: { category } });
      if (currentCount >= 10) {
        return {
          success: false,
          error: "Limit reached for home gallery (10).",
        };
      }
    }

    // Upload using storage adapter
    const imageUrl = await storage.upload(file, "gallery");

    const newImage = await prisma.galleryImage.create({
      data: {
        url: imageUrl,
        category,
        title: file.name,
      },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/admin");
    revalidatePath("/gallery");
    revalidatePath("/"); // For home gallery

    return { success: true, data: newImage };
  } catch (error) {
    console.error("Failed to upload image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}

export async function deleteGalleryImage(id: string): Promise<GalleryResponse> {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return { success: false, error: "Image not found" };
    }

    // Attempt to delete file using storage adapter
    if (image.url) {
      await storage.delete("gallery", image.url);
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/admin");
    revalidatePath("/gallery");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete image:", error);
    return {
      success: false,
      error: error.message || "Failed to delete image",
    };
  }
}

export async function deleteBulkGalleryImages(ids: string[]): Promise<GalleryResponse> {
  try {
    for (const id of ids) {
      await deleteGalleryImage(id);
    }

    // Revalidation is already inside deleteGalleryImage, but this is fine too
    revalidatePath("/admin/gallery");

    return { success: true };
  } catch (error) {
    console.error("Failed to bulk delete images:", error);
    return { success: false, error: "Failed to bulk delete images" };
  }
}

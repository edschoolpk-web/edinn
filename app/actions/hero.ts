"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { storage } from "@/lib/storage";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");
    const url = await storage.upload(file, "hero");
    return { success: true, url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: (error as Error).message };
  }
}


export async function getHeroSlides() {
  try {
    return await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

export async function createHeroSlide(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    if (!file) throw new Error("No image provided");

    const imageUrl = await storage.upload(file, "hero");

    // Get highest order to append to the end
    const lastSlide = await prisma.heroSlide.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const nextOrder = lastSlide ? lastSlide.order + 1 : 0;

    const slide = await prisma.heroSlide.create({
      data: {
        imageUrl,
        order: nextOrder,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true, slide };
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateHeroSlide(id: string, data: {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
}) {
  try {
    const slide = await prisma.heroSlide.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true, slide };
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteHeroSlide(id: string) {
  try {
    const slide = await prisma.heroSlide.findUnique({
      where: { id },
    });

    if (slide) {
      // Attempt to delete the file from storage
      await storage.delete('hero', slide.imageUrl);
      
      await prisma.heroSlide.delete({
        where: { id },
      });
    }
    
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true };
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return { success: false, error: (error as Error).message };
  }
}

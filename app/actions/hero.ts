"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { storage } from "@/lib/storage";

export async function uploadImage(file: File) {
  try {
    const url = await storage.upload(file, 'hero');
    return { success: true, url };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Upload failed" };
  }
}


export async function getHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
    return { success: true, slides };
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return { success: false, error: "Failed to fetch hero slides" };
  }
}

export async function getActiveHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return { success: true, slides };
  } catch (error) {
    console.error("Error fetching active hero slides:", error);
    return { success: false, error: "Failed to fetch active hero slides" };
  }
}

export async function createHeroSlide(data: {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
}) {
  try {
    // Get highest order to append to the end
    const lastSlide = await prisma.heroSlide.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const nextOrder = lastSlide ? lastSlide.order + 1 : 0;

    const slide = await prisma.heroSlide.create({
      data: {
        ...data,
        order: nextOrder,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true, slide };
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return { success: false, error: "Failed to create hero slide" };
  }
}

export async function updateHeroSlide(id: string, data: {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
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
    return { success: false, error: "Failed to update hero slide" };
  }
}

export async function toggleHeroSlideStatus(id: string, isActive: boolean) {
  try {
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true, slide };
  } catch (error) {
    console.error("Error toggling hero slide status:", error);
    return { success: false, error: "Failed to toggle status" };
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
    }

    await prisma.heroSlide.delete({
      where: { id },
    });
    
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true };
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return { success: false, error: "Failed to delete hero slide" };
  }
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';

export async function uploadImage(file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create safe filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'hero');
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Save file
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);
    
    // Return the relative URL string for Next.js to serve from public
    return { success: true, url: `/uploads/hero/${filename}` };
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

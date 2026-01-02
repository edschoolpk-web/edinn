
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

export async function getGalleryImages(category: string = "general") {
    try {
        const images = await prisma.galleryImage.findMany({
            where: { category },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: images };
    } catch (error) {
        console.error("Failed to fetch images:", error);
        return { success: false, error: "Failed to fetch images" };
    }
}

export async function uploadGalleryImage(formData: FormData) {
    try {
        const files = formData.getAll("image") as File[];
        const category = (formData.get("category") as string) || "general";

        if (!files || files.length === 0) {
            return { success: false, error: "No image files provided" };
        }

        // Limit Check for 'home' category
        if (category === "home") {
            const currentCount = await prisma.galleryImage.count({
                where: { category: "home" }
            });
            if (currentCount + files.length > 10) {
                return { success: false, error: `Home Page Gallery limit (10) exceeded. You can only add ${10 - currentCount} more images.` };
            }
        }

        const savedImages = [];

        for (const file of files) {
            // Upload to Vercel Blob
            const blob = await put(file.name, file, {
                access: 'public',
            });

            const newImage = await prisma.galleryImage.create({
                data: {
                    url: blob.url,
                    title: file.name,
                    category,
                    width: 0,
                    height: 0,
                },
            });
            savedImages.push(newImage);
        }

        revalidatePath("/admin/gallery");
        revalidatePath("/");
        revalidatePath("/gallery");
        return { success: true, data: savedImages };

    } catch (error: any) {
        console.error("Upload failed:", error);
        return { success: false, error: error.message || "Upload failed" };
    }
}

export async function deleteGalleryImage(id: string) {
    try {
        const image = await prisma.galleryImage.findUnique({ where: { id } });
        if (!image) return { success: false, error: "Image not found" };

        // Delete from DB
        await prisma.galleryImage.delete({ where: { id } });

        // Try to delete local file
        // Delete from Blob
        if (image.url) {
            try {
                await del(image.url);
            } catch (err) {
                console.warn("Failed to delete blob:", err);
            }
        }

        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Delete failed:", error);
        return { success: false, error: "Delete failed" };
    }
}

export async function deleteBulkGalleryImages(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: "No images selected" };

        const images = await prisma.galleryImage.findMany({
            where: { id: { in: ids } }
        });

        // Delete from DB
        await prisma.galleryImage.deleteMany({
            where: { id: { in: ids } }
        });

        // Delete local files
        // Delete from Blob
        for (const image of images) {
            if (image.url) {
                try {
                    await del(image.url);
                } catch (err) {
                    console.warn(`Failed to delete blob for image ${image.id}:`, err);
                }
            }
        }

        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Bulk delete failed:", error);
        return { success: false, error: "Bulk delete failed" };
    }
}


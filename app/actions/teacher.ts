
"use server";


import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function getTeachers() {
    try {
        const teachers = await prisma.teacher.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: teachers };
    } catch (error) {
        console.error("Failed to fetch teachers:", error);
        return { success: false, error: "Failed to fetch teachers" };
    }
}

export async function createTeacher(data: FormData) {
    try {
        const name = data.get("name") as string;
        const role = data.get("role") as string;
        const email = data.get("email") as string;
        const bio = data.get("bio") as string;

        // Slug generation (simple)
        const slug = name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

        await prisma.teacher.create({
            data: {
                name,
                role,
                email,
                bio: bio || "",
                slug,
                // Image handling to be added specifically
            },
        });

        revalidatePath("/admin/teachers");
        return { success: true };
    } catch (error) {
        console.error("Failed to create teacher:", error);
        return { success: false, error: "Failed to create teacher" };
    }
}

export async function deleteTeacher(id: string) {
    try {
        await prisma.teacher.delete({ where: { id } });
        revalidatePath("/admin/teachers");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete teacher:", error);
        return { success: false, error: "Failed to delete teacher" };
    }
}

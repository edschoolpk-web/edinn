"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCareerApplications() {
    return await prisma.careerApplication.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function getCareerApplication(id: string) {
    return await prisma.careerApplication.findUnique({
        where: { id }
    });
}

export async function updateCareerStatus(id: string, status: string) {
    await prisma.careerApplication.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/careers");
}

export async function deleteCareerApplication(id: string) {
    await prisma.careerApplication.delete({
        where: { id }
    });
    revalidatePath("/admin/careers");
}

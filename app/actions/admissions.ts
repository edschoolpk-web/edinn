"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdmissionApplications() {
    return await prisma.admissionApplication.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function getAdmissionApplication(id: string) {
    return await prisma.admissionApplication.findUnique({
        where: { id }
    });
}

export async function updateAdmissionStatus(id: string, status: string) {
    await prisma.admissionApplication.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/admissions");
}

export async function deleteAdmissionApplication(id: string) {
    await prisma.admissionApplication.delete({
        where: { id }
    });
    revalidatePath("/admin/admissions");
}

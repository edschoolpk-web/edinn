"use server";

import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updatePassword(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return { success: false, error: "Unauthorized" };
        }

        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;

        if (!currentPassword || !newPassword) {
            return { success: false, error: "All fields are required" };
        }

        if (newPassword.length < 6) {
            return { success: false, error: "New password must be at least 6 characters" };
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const isPasswordValid = await compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return { success: false, error: "Incorrect current password" };
        }

        const hashedPassword = await hash(newPassword, 12);

        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword },
        });

        revalidatePath("/admin/settings");
        return { success: true, message: "Password updated successfully" };
    } catch (error) {
        console.error("Password update error:", error);
        return { success: false, error: "Failed to update password" };
    }
}

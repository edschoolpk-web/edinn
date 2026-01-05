"use server";

import { prisma } from "@/lib/prisma";

export async function testDatabaseConnection() {
    try {
        const start = Date.now();
        console.log("Testing DB connection...");

        // Simple query
        const count = await prisma.user.count();

        const duration = Date.now() - start;
        console.log(`DB Connection successful. User count: ${count}. Time: ${duration}ms`);

        return {
            success: true,
            message: `Connected successfully. Users: ${count}`,
            duration
        };
    } catch (error: any) {
        console.error("DB Connection Failed:", error);
        return {
            success: false,
            error: error.message,
            code: error.code,
            meta: error.meta
        };
    }
}

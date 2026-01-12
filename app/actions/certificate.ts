'use server';

import { prisma } from '@/lib/prisma';
import { generateCertificatePDF } from '@/lib/certificate-utils';
import { z } from 'zod';
import { storage } from '@/lib/storage';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const generateSchema = z.object({
    studentName: z.string().min(1, 'Recipient Name is required'),
    type: z.string().min(1, 'Certificate Type is required'),
    commendation1: z.string().min(1, 'Commendation Line 1 is required'),
    commendation2: z.string().min(1, 'Commendation Line 2 is required'),
});

export async function generateCertificateAction(formData: FormData) {
    const rawData = {
        studentName: formData.get('studentName'),
        type: formData.get('type'),
        commendation1: formData.get('commendation1'),
        commendation2: formData.get('commendation2'),
    };

    const validatedFields = generateSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: 'Invalid input', details: validatedFields.error.flatten() };
    }

    const { studentName, type, commendation1, commendation2 } = validatedFields.data;

    // Generate Verify Code
    const verifyCode = crypto.randomBytes(16).toString('hex'); // 32 chars

    // Dynamic Base URL detection
    const host = (await headers()).get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    let baseUrl = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || 'https://edschool.pk');

    // Ensure protocol exists
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl}`;
    }

    try {
        // Generate PDF
        const pdfBytes = await generateCertificatePDF({
            studentName,
            type,
            commendation1,
            commendation2,
            verifyCode
        }, baseUrl);

        const pdfBuffer = Buffer.from(pdfBytes);
        const fileName = `${verifyCode}.pdf`;

        // Use storage adapter
        const pdfUrl = await storage.upload(pdfBuffer, 'certificates', fileName);

        // Save to DB
        const certificate = await prisma.certificate.create({
            data: {
                studentName,
                type,
                commendation1,
                commendation2,
                designation: '', // Legacy support
                universityName: '', // Legacy support
                verifyCode,
                pdfPath: pdfUrl,
                status: 'VALID',
            },
        });


        revalidatePath('/admin/certificate');
        return { success: true, certificate };
    } catch (error) {
        console.error('Failed to generate certificate:', error);
        // Returns the actual error message to the client for easier debugging
        return { error: 'Failed to generate certificate', details: error instanceof Error ? error.message : String(error) };
    }
}

export async function getCertificateByCode(code: string) {
    try {
        const cert = await prisma.certificate.findUnique({
            where: { verifyCode: code },
        });
        return cert;
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return null;
    }
}

export async function revokeCertificateAction(verifyCode: string) {
    try {
        await prisma.certificate.update({
            where: { verifyCode },
            data: { status: 'REVOKED' },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function restoreCertificateAction(verifyCode: string) {
    try {
        await prisma.certificate.update({
            where: { verifyCode },
            data: { status: 'VALID' },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function getRecentCertificates() {
    try {
        const certs = await prisma.certificate.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        return certs;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
}

export async function deleteCertificateAction(verifyCode: string) {
    try {
        // 1. Get the certificate to find the file path
        const cert = await prisma.certificate.findUnique({
            where: { verifyCode },
        });

        if (!cert) {
            return { success: false, error: 'Certificate not found' };
        }

        // 2. Delete file
        if (cert.pdfPath) {
            // Folder name must match what you used in storage.upload for certificates
            await storage.delete('certificates', cert.pdfPath);
        }

        // 3. Delete from database
        await prisma.certificate.delete({
            where: { verifyCode },
        });

        // 4. Revalidate
        revalidatePath('/admin/certificate');

        return { success: true };
    } catch (error) {
        console.error('Delete certificate error:', error);
        return { success: false, error: String(error) };
    }
}

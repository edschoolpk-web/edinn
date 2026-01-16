/**
 * Image URL utilities for handling uploads and optimization
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://edschool.pk";

/**
 * Converts relative upload paths to absolute URLs for Next.js image optimization.
 * Handles: /uploads/..., http(s)://..., blob:..., null/undefined
 */
export function toAbsoluteUploadsUrl(path: string | null | undefined): string {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith("blob:")) return path; // Keep blob URLs as-is
    return `${BASE_URL}${path}`;
}

/**
 * Checks if an image URL can be optimized by Next.js.
 * Blob URLs cannot be optimized and must use unoptimized prop or plain <img>.
 */
export function isOptimizableUrl(path: string | null | undefined): boolean {
    if (!path) return false;
    if (path.startsWith("blob:")) return false; // Blob URLs cannot be optimized
    return true;
}

import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

/**
 * Environment-agnostic storage adapter
 * Priority: 
 * 1. Vercel Blob (if BLOB_READ_WRITE_TOKEN is set)
 * 2. Local absolute path (if LOCAL_UPLOADS_DIR is set)
 * 3. Local public/ fallback (only in development)
 */

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_DIR = process.env.LOCAL_UPLOADS_DIR;
const PUBLIC_BASE_URL = process.env.PUBLIC_UPLOADS_BASE_URL || '';
const IS_DEV = process.env.NODE_ENV === 'development';

export const storage = {
  /**
   * Upload a file or buffer to the storage
   */
  async upload(file: File | Buffer, folder: string, filename?: string): Promise<string> {
    const name = filename || `${Date.now()}-${Math.random().toString(36).substring(2, 7)}${file instanceof File ? getsuffix(file.name) : ''}`;
    const key = `${folder}/${name}`;

    // 1. Vercel Blob
    if (BLOB_TOKEN) {
      const blob = await put(key, file, {
        access: 'public',
        token: BLOB_TOKEN,
      });
      return blob.url;
    }

    // 2. Local Storage (VPS) OR Dev Fallback
    if (LOCAL_DIR || IS_DEV) {
      const baseDir = LOCAL_DIR ? path.resolve(LOCAL_DIR) : path.join(process.cwd(), 'public', 'uploads');
      const targetDir = path.join(baseDir, folder);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const filePath = path.join(targetDir, name);
      const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
      
      fs.writeFileSync(filePath, buffer);

      // Return URL
      if (LOCAL_DIR) {
        // Ensure PUBLIC_BASE_URL doesn't end with slash
        const baseUrl = PUBLIC_BASE_URL.replace(/\/$/, '');
        return `${baseUrl}/${folder}/${name}`;
      } else {
        // Public fallback - now includes /uploads/ prefix
        return `/uploads/${folder}/${name}`;
      }
    }


    throw new Error('Storage not configured. Set BLOB_READ_WRITE_TOKEN or LOCAL_UPLOADS_DIR.');
  },

  /**
   * Delete a file from storage given its URL
   */
  async delete(url: string): Promise<void> {
    if (!url) return;

    // 1. Vercel Blob (starts with http and contains vercel-storage)
    if (url.startsWith('http') && url.includes('public.blob.vercel-storage.com')) {
      if (!BLOB_TOKEN) {
        console.warn('Cannot delete from Blob: BLOB_READ_WRITE_TOKEN not set');
        return;
      }
      await del(url, { token: BLOB_TOKEN });
      return;
    }

    // 2. Local Storage
    try {
      let relativePath = '';
      let baseDir = '';

      if (url.startsWith('http') && PUBLIC_BASE_URL && url.startsWith(PUBLIC_BASE_URL)) {
          // Absolute URL from LOCAL_DIR
          relativePath = url.replace(PUBLIC_BASE_URL, '');
          baseDir = LOCAL_DIR ? path.resolve(LOCAL_DIR) : '';
      } else if (url.startsWith('/uploads/')) {
          // Relative URL from public/uploads/
          relativePath = url.replace('/uploads/', '');
          baseDir = path.join(process.cwd(), 'public', 'uploads');
      }

      if (baseDir && relativePath) {
          const filePath = path.join(baseDir, relativePath);
          if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
          }
      }
    } catch (error) {
      console.error('Failed to delete local file:', error);
    }
  }
};

function getsuffix(filename: string): string {
    const ext = path.extname(filename);
    return ext || '';
}

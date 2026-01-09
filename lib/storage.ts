import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN ?? null;

function getFileExtension(name: string) {
  const idx = name.lastIndexOf('.');
  return idx === -1 ? '' : name.slice(idx);
}

function randomName(originalName?: string) {
  const ext = originalName ? getFileExtension(originalName) : '';
  const rand = Math.random().toString(36).substring(2, 8);
  const ts = Date.now();
  return `${ts}-${rand}${ext}`;
}

export const storage = {
  /**
   * Upload a file/buffer to a folder.
   * Returns a URL that you can store in DB and pass to <Image src="..."/>.
   */
  async upload(file: File | Buffer, folder: string, filename?: string): Promise<string> {
    const name =
      filename ||
      (file instanceof File ? randomName(file.name) : randomName('upload.bin'));

    const key = `${folder}/${name}`;

    // 1) If Vercel Blob token exists -> use Blob
    if (BLOB_TOKEN) {
      const blob = await put(key, file, {
        access: 'public',
        token: BLOB_TOKEN,
      });
      return blob.url; // e.g. https://...vercel-storage.com/folder/name
    }

    // 2) Local filesystem -> public/uploads/<folder>/<name>
    const baseDir = path.join(process.cwd(), 'public', 'uploads');
    const targetDir = path.join(baseDir, folder);

    await fs.promises.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, name);
    const buffer = Buffer.isBuffer(file)
      ? file
      : Buffer.from(await (file as File).arrayBuffer());

    await fs.promises.writeFile(filePath, buffer);

    // URL that Next will serve statically
    return `/uploads/${folder}/${name}`;
  },

  /**
   * Delete a file, given the folder and the stored URL or blob URL.
   */
  async delete(folder: string, urlOrKey: string | null | undefined): Promise<void> {
    if (!urlOrKey) return;

    // 1) Blob deletion
    if (BLOB_TOKEN && urlOrKey.startsWith('http')) {
      try {
        await del(urlOrKey, { token: BLOB_TOKEN });
      } catch {
        // ignore failures, don't crash app
      }
      return;
    }

    // 2) Local deletion (public/uploads)
    const baseDir = path.join(process.cwd(), 'public', 'uploads');

    let key = urlOrKey;

    // If it's a full URL, extract pathname
    try {
      if (key.startsWith('http://') || key.startsWith('https://')) {
        const u = new URL(key);
        key = u.pathname;
      }
    } catch {
      // ignore
    }

    // key might be "/uploads/gallery/file.jpg" or "gallery/file.jpg"
    key = key.replace(/^\/uploads\//, '');
    key = key.replace(/^\/+/, '');

    // Optional: make sure folder matches, but don't be too strict
    if (!key.startsWith(`${folder}/`)) {
      // we still try to delete, but you could early-return here if you want
    }

    const filePath = path.join(baseDir, key);
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      const e = err as NodeJS.ErrnoException;
      if (e.code !== 'ENOENT') {
        // log if you want, but don't crash
        console.error('Error deleting file:', e);
      }
    }
  },
};

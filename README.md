This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Storage Configuration

The project uses an environment-agnostic storage adapter (`lib/storage.ts`) that supports Vercel Blob, Local Storage (VPS/Shared Hosting), and a Dev Fallback.

### Priority Logic

1. **Vercel Blob**: Used if `BLOB_READ_WRITE_TOKEN` is set.
2. **Local Storage (VPS)**: Used if `LOCAL_UPLOADS_DIR` (absolute path) is set.
3. **Dev Fallback**: Defaults to `public/` folder only in `development` mode.
4. **Error**: Throws an error in `production` if no storage is configured.

### Environment Variables

Add these to your `.env.local`:

```bash
# Optional: For Vercel Blob
BLOB_READ_WRITE_TOKEN=your_token_here

# Optional: For VPS / Shared Hosting
LOCAL_UPLOADS_DIR=/var/www/edinn/uploads
PUBLIC_UPLOADS_BASE_URL=https://edinnschool.com/uploads
```

### Nginx Configuration (VPS)

If using `LOCAL_UPLOADS_DIR` on a VPS, map the public URL path to the directory:

```nginx
location /uploads/ {
    alias /var/www/edinn/uploads/;
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

---
description: Deploy Next.js to Hostinger via GitHub
---

# Deploying to Hostinger (GitHub Method)

This method automatically redeploys your site whenever you push changes to GitHub.

## 1. Push to GitHub
Make sure your latest code (including the `next.config.ts` changes we entered) is pushed to your repository.

## 2. Configure Hostinger
1.  Go to **Hostinger hPanel** -> **VPS / Web Hosting** -> **Node.js Config**.
2.  **Application Root:** `public_html/` (or your desired folder).
3.  **Application Repository:** Connect your GitHub account and select this repository.
4.  **Branch:** `main` (or `master`).

## 3. Build & Start Settings
Hostinger needs to know how to build and start your app.

*   **Build Command:** `npm run build`
    *   *Note: This runs `prisma generate && next build` as defined in your package.json.*
*   **Application Startup File:** `node_modules/next/dist/bin/next` 
    *   *Why?* Hostinger often struggles with `npm start` directly in the "Startup File" field. Pointing properly to the Next.js binary usually works best.
    *   *Alternative:* Just type `npm start` if it allows a command string.

## 4. Environment Variables
**Crucial Step:** You must manually add your `.env` variables in the Hostinger Dashboard.
1.  Go to the **Environment Variables** section (or create an `.env` file in the File Manager if the UI is missing).
2.  Add:
    *   `DATABASE_URL`: `mysql://u511174624_edschool_pk:7Os%3AC%2B%3AW@srv2024.hstgr.io:3306/u511174624_edschool_pk`
    *   `NEXTAUTH_SECRET`: (Your secret)
    *   `NEXTAUTH_URL`: `http://your-domain.com` (or `https://...`)

## 5. Deploy
Click **Deploy** (or "Install" / "Save").
Hostinger will:
1.  Clone the repo.
2.  Run `npm install`.
3.  Run `npm run build`.
4.  Start the server.

> [!IMPORTANT]
> If the deployment fails due to memory/RAM (common on shared hosting), switch to the **Manual Upload** method described previously using the `standalone` folder.

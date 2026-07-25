# 📸 Why Did My Uploaded Photos Disappear When I Transferred to GitHub or Vercel? (And How to Fix It in 10 Seconds)

If you uploaded photos of Janu inside the AI Studio preview link, and then transferred the project to GitHub or deployed it to Vercel/Netlify, you might notice the new site shows the default placeholder photos instead of your uploaded ones.

## ❓ Why does this happen?

1. **Browser Security & Storage Isolation**:
   When you clicked "Select & Save Her Photos Permanently" in the AI Studio preview, your browser saved those photos directly into your browser's local IndexedDB database **for that specific AI Studio web link**.
2. **New Domain = Fresh Database**:
   When you transfer to GitHub or deploy to Vercel, your app gets a brand new web link (e.g., `https://your-project.vercel.app` or `http://localhost:3000`). For privacy and security reasons, web browsers never share database storage between two different websites! So when you open the new GitHub/Vercel link, your browser opens a fresh, empty database for that URL.

---

## ⚡ How to fix it in 10 seconds (No coding required!)

We built a **Cross-Device & Vercel Backup Engine** right into the app to solve this exact problem:

### Step 1: Download your backup from AI Studio
1. Open your original **AI Studio preview link** where your photos are currently visible.
2. Scroll down to the **Permanent Photo Storage Engine** box in the Photo Gallery section.
3. Click the white **`Download Backup (.json)`** button.
4. This downloads a file named `janu_permanent_photos_backup_2026-07-25.json` to your computer or phone containing all 20 of Janu's photos!

### Step 2: Restore them on GitHub / Vercel / Phone
1. Open your new **GitHub, Vercel, or mobile link** where you want to view the app.
2. Scroll down to the **Permanent Photo Storage Engine** box.
3. Click the dark red **`Restore Backup`** button and select the `.json` file you just downloaded.
4. **🎉 Done!** All 20 photos will instantly load and be saved permanently into the database of your new site! You never have to upload them one by one again.

---

## 🛠️ Alternative Method: Hardcoding image files directly into your GitHub codebase (Optional)

If you want the photos to be permanently inside your GitHub source code so that anyone who visits your link sees them automatically without ever clicking "Restore Backup":

1. In your GitHub repository folder on your computer, create a folder named `public/photos/`.
2. Copy your photo files into that folder and name them:
   - `photo1.jpg`, `photo2.jpg`, `photo3.jpg` ... up to `photo20.jpg`.
3. In `src/components/JanuMemoryGallery.tsx`, change the `defaultUrl` values to point directly to `/photos/photo1.jpg`, `/photos/photo2.jpg`, etc.
4. Commit and push your changes to GitHub!

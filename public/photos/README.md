# 📸 How to Put Janu's Real Photos Permanently in GitHub

This folder (`/public/photos/`) is the best place to put Janu's actual picture files in your GitHub repository! When you put files here, they are baked into your website forever — **no one ever has to upload photos or click "Restore Backup" again!**

---

## ⚡ 3 Easy Steps to Add Photos to GitHub:

### Step 1: Add Your Picture Files to This Folder
Copy your 20 photos of Janu into this exact folder (`/public/photos/`) on your computer or directly on the GitHub website.

To keep it super simple, rename your photo files to match numbers from 1 to 20:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- ... up to `photo20.jpg`

*(Note: You can also use `.png` or `.jpeg` files! Just remember the exact file names).*

---

### Step 2: Link Them in Your Code (`src/components/JanuMemoryGallery.tsx`)
Open the file **`src/components/JanuMemoryGallery.tsx`** in your GitHub code editor.

Look at lines 16 to 220 where `JANU_MEMORIES` is defined. You will see lines like:
```ts
defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
```

Replace those internet links with your direct folder paths:
- For Photo 1: change `defaultUrl: '...'` to **`defaultUrl: '/photos/photo1.jpg',`**
- For Photo 2: change `defaultUrl: '...'` to **`defaultUrl: '/photos/photo2.jpg',`**
- For Photo 3: change `defaultUrl: '...'` to **`defaultUrl: '/photos/photo3.jpg',`**
- Repeat for all 20 photos!

---

### Step 3: Commit and Push to GitHub!
Once you save the file and upload the photos to GitHub:
1. Click **Commit changes** (or run `git push` if using git on your computer).
2. Your Vercel / Netlify / GitHub Pages website will automatically rebuild in 1 minute.
3. **🎉 Done!** Every time you or Janu open your website, her real photos will load instantly and permanently for everyone!

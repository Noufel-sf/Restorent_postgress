# Cloudinary Setup Guide

## 1. Create a Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account (supports up to 25GB storage)
3. Verify your email

## 2. Get Your Credentials

After logging in:
1. Go to **Dashboard** (https://console.cloudinary.com/)
2. You'll see your credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## 3. Add to `.env` File

Copy your credentials and update `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc123xyz456secret789
```

## 4. Security

- **Never commit `.env`** to git (already in `.gitignore`)
- For production (Vercel/Railway), add these as environment variables in the hosting dashboard

## 5. Test Upload

After adding credentials, restart your dev server:
```powershell
npm run dev
```

Then try uploading a food image from `/admin/new` page.

## 6. Free Tier Limits

- **Storage:** 25 GB
- **Bandwidth:** 25 GB/month
- **Transformations:** 25,000/month

Perfect for development and small projects!

## Alternative: Use Public Folder (No Cloudinary)

If you don't want to use Cloudinary right now, you can:

1. Store images in `public/` folder manually
2. Use image paths like `/pizza1.jpg`
3. Upload via FTP or direct file copy

**Pros:** Simple, no external service
**Cons:** Images stored in your repo, can't upload via form

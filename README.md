# Noufel Food Ordering App

A full-stack food ordering web app built with Next.js (App Router), TypeScript, Drizzle ORM, and PostgreSQL.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Drizzle ORM + drizzle-kit
- PostgreSQL (Neon works well)
- Tailwind CSS
- Cloudinary (for image uploads)

## Prerequisites

Make sure you have:

- Node.js 20+
- npm (or pnpm/yarn/bun)
- A PostgreSQL database URL
- Cloudinary account (optional, but required for image upload features)

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require

# Cloudinary (required for upload from admin panel)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

For Cloudinary setup details, see `CLOUDINARY_SETUP.md`.

## 3. Create Database Schema

This project uses Drizzle. Run one of these options:

### Option A: Push schema directly (fast for development)

```bash
npx drizzle-kit push
```

### Option B: Generate and run migrations

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## 4. Seed Initial Categories (Optional)

```bash
npx tsx seed.ts
```

This inserts default categories such as Burger, Pizza, Chicken, and Ramen.

## 5. Run the App

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure (High Level)

- `app/` - App Router pages, API routes, UI components
- `db/` - Drizzle DB client and schema
- `lib/` - Shared utilities (Cloudinary, Prisma helper)
- `seed.ts` - Seed script for initial category data

## Deployment Notes

For deployment (Vercel, Railway, etc.):

- Add the same environment variables in your hosting dashboard.
- Make sure your production database is reachable.
- Run DB migration/push before first production use.

## Troubleshooting

- If images fail to upload, verify Cloudinary variables and restart the dev server.
- If DB connection fails, verify `DATABASE_URL` and SSL settings required by your provider.
- If schema changes are not reflected, rerun `drizzle-kit push` or migrations.

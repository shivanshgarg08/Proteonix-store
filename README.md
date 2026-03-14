# PROTEONIX Demo Store

A demo-level but realistic e-commerce site for the Proteonix nutrition brand.

- Frontend: Next.js + TailwindCSS
- Backend: Node.js + Express API (Vercel serverless compatible)
- Database: MongoDB (Mongoose)

## Folder Structure

- `frontend`: Next.js app
- `backend`: Express API
- `database`: schema references

## Local Setup

### Backend

1. Open terminal in `backend`.
2. Install dependencies:
   - `npm install`
3. Create `.env` from `.env.example`.
4. Run:
   - `npm run dev`

API endpoints:
- `GET /api/health`
- `GET /api/products`
- `GET /api/orders`
- `POST /api/order`
- `POST /api/auth/register`
- `POST /api/auth/login`

### Frontend

1. Open terminal in `frontend`.
2. Install dependencies:
   - `npm install`
3. Create `.env.local` from `.env.local.example`.
4. Run:
   - `npm run dev`

## Order Notifications

Notification priority in backend:
1. Telegram Bot API (free)
2. WhatsApp Cloud API (fallback)

### Required for free Telegram notifications

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Optional WhatsApp fallback

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_ID`
- `WHATSAPP_NUMBER`
- `WHATSAPP_API_VERSION` (default `v20.0`)

If none are configured, orders are still saved and API returns success.

## Deployment (Vercel + Vercel)

### 1. Deploy backend project

- Import the same GitHub repo into Vercel.
- Set Root Directory to `backend`.
- Framework preset: `Other`.
- Add backend env vars from `backend/.env.example`.

### 2. Deploy frontend project

- Import the same repo into Vercel as a second project.
- Set Root Directory to `frontend`.
- Add:
  - `NEXT_PUBLIC_API_URL=https://<your-backend-project>.vercel.app`

### 3. Production test

- Place a checkout order on deployed frontend.
- Confirm Telegram notification arrives.

## Demo Login

Login uses contact (email or phone) and password. Backend issues JWT.
Set `JWT_SECRET` in backend env.

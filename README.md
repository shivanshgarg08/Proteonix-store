# PROTEONIX Demo Store

A demo-level but realistic e-commerce site for the Proteonix nutrition brand. Frontend uses Next.js + TailwindCSS, backend uses Node + Express, and orders are stored in MongoDB.

## Folder Structure

- frontend: Next.js app
- backend: Express API
- database: Mongoose schemas

## Local Setup

### 1) Backend

1. Open a terminal in the backend folder.
2. Install dependencies:
   - npm install
3. Create a .env file using .env.example and fill values.
4. Run the server:
   - npm run dev

API endpoints:
- GET /api/products
- GET /api/orders
- POST /api/order
- POST /api/auth/register
- POST /api/auth/login

### 2) Frontend

1. Open a terminal in the frontend folder.
2. Install dependencies:
   - npm install
3. Create a .env.local file using .env.local.example.
4. Run the app:
   - npm run dev

Open the site and place a demo order. The checkout submits to the backend and then shows a success screen.

## WhatsApp Order Notifications

The backend sends an order message using WhatsApp Cloud API from `POST /api/order`.

Set these backend env vars:
- WHATSAPP_ACCESS_TOKEN
- WHATSAPP_PHONE_ID
- WHATSAPP_NUMBER
- WHATSAPP_API_VERSION (optional, default `v20.0`)

If these are missing, the backend skips notification and still accepts orders.

## Demo Login

Login uses contact (email or phone) + password. The backend issues a JWT when users register or log in.
Set JWT_SECRET in backend .env for production.

## Deployment Notes

Frontend (Vercel):
- Build command: npm run build
- Output: Next.js default
- Env: NEXT_PUBLIC_API_URL pointing to the backend URL

Backend (Render or similar):
- Build command: npm install
- Start command: npm start
- Env: MONGO_URI, JWT_SECRET, and WhatsApp vars

## Deployment (Vercel + Render)

1. Push project to GitHub.
2. Deploy backend on Render (Web Service):
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add env vars from `backend/.env.example`
3. Deploy frontend on Vercel:
   - Root directory: `frontend`
   - Framework preset: Next.js
   - Add env var: `NEXT_PUBLIC_API_URL=https://<your-render-service>.onrender.com`
4. Redeploy frontend after setting API URL.
5. Test checkout and verify WhatsApp message delivery.

### Fast Deploy Checklist

1. GitHub
   - Create a new GitHub repository named `proteonix-store`.
   - Push the project root (`proteonix-store`) containing `frontend`, `backend`, and `render.yaml`.
2. Render backend
   - In Render, choose: New + > Blueprint.
   - Select your repo. Render will read `render.yaml` automatically.
   - Fill required env vars in Render dashboard:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `WHATSAPP_ACCESS_TOKEN`
     - `WHATSAPP_PHONE_ID`
     - `WHATSAPP_NUMBER`
   - Deploy and copy backend URL.
3. Vercel frontend
   - In Vercel, import the same repo.
   - Set Root Directory to `frontend`.
   - Add env var `NEXT_PUBLIC_API_URL` to your Render backend URL.
   - Deploy.
4. Production test
   - Open deployed frontend URL.
   - Place a test order from checkout.
   - Confirm WhatsApp message arrives on business number.

## Placeholders

The jar SVGs in frontend/public/images are placeholders and should be replaced with brand images for production.

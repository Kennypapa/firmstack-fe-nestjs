# firmstack-fe-nestjs

Firmstack is a backend-first, multi-tenant SaaS platform for managing business operations and finances.

## Local development

**Terminal 1 — backend** (`firmstack-be-nestjs`):

```bash
npm run start:dev
# API: http://localhost:3000/api/v1
```

**Terminal 2 — frontend** (this repo):

```bash
cp .env.example .env.local
npm run dev
# UI: http://localhost:3001
```

`.env.local` should point at your local API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

> **Note:** Frontend runs on **3001** so the backend can use **3000**. If login fails, check that nothing else is on port 3000 except the NestJS API.

To hit the deployed EC2 API instead, set `NEXT_PUBLIC_API_URL` in `.env` to your server URL (and ensure EC2 `CORS_ORIGINS` includes your frontend origin).

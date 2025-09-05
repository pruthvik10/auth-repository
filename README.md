# Next.js Auth System (JWT + Prisma)

Production-ready authentication boilerplate using:
- Next.js (App Router)
- Prisma + SQLite (dev) / Postgres (ready)
- BCrypt password hashing
- JWT access + refresh tokens in **httpOnly** cookies

## Features
- Register (hashed passwords)
- Login → sets `access_token` (15m) + `refresh_token` (7d)
- Protected `GET /api/auth/me`
- Token refresh `POST /api/auth/refresh`
- Logout (clears cookies)
- Prisma Client singleton (safe in dev)

## Stack
Next.js 15 • TypeScript • Prisma • bcryptjs • jsonwebtoken

## Getting Started
```bash
git clone https://github.com/pruthvik10/auth-repository.git
cd auth-repository
npm install
# set your secrets
cp .env.example .env  # (or create manually)
npm run dev

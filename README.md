# RescueLab

RescueLab is a deliberately small production-style application used to practise diagnosing and repairing AI-generated web apps. Phase 1 is the known-good baseline. Later phases will introduce one realistic failure at a time.

## Architecture

- React + Vite frontend
- Node.js + Express API
- PostgreSQL database
- Docker Compose runtime
- Nginx static hosting and `/api` reverse proxy

## Run with Docker

```bash
cp .env.example .env
docker compose up --build
```

Open <http://localhost:8080>. Verify the API directly with:

```bash
curl http://localhost:8080/api/health
```

Stop the stack with `docker compose down`. Add `-v` only when you intentionally want to delete the development database.

## Run without Docker

Start PostgreSQL separately, copy `.env.example` to `.env`, and change `DATABASE_URL` so its hostname points to your database. Then:

```bash
npm install
npm run dev
```

The frontend runs at <http://localhost:5173> and proxies `/api` to <http://localhost:3000>.

## Verification

```bash
npm install
npm run check
docker compose config
```

The first incident begins only after this baseline works on the learner's machine.

<!-- P2-003 assignment scaffold: replace this README through reviewed comment-based delivery. -->

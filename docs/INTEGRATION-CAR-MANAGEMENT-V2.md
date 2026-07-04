# Remix frontend → car-management-v2 integration

This branch (`integrate/car-management-v2`) points the Remix frontend at the
**JCC backend** in `../car-management-v2` instead of the legacy Express backend.

## Prerequisites

1. **car-management-v2** running on port 3000:
   ```bash
   cd ../car-management-v2
   npm run dev
   npm run watch
   ```

2. **MySQL** seeded in car-management-v2:
   ```bash
   cd ../car-management-v2
   bun artisanNode db:seed
   # or only demo accounts:
   bun artisanNode db:seed class=DemoIntegrationSeeder
   ```

3. **JWT alignment** (required for dashboard/profile loaders):
   - `JWT_SECRET` in `car-management-v2/.env`
   - `JWT_SECRET_KEY` in `frontend/.env` — **same value**

4. Copy env:
   ```bash
   cd frontend
   cp .env.example .env
   # Set JWT_SECRET_KEY to match car-management-v2 JWT_SECRET
   ```

## Run Remix against v2

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 (Vite default).

## Test accounts (from car-management-v2 seeders)

| Role | Email | Password |
|------|-------|----------|
| Admin (Inertia only) | admin@example.com | password |
| Dealer | dana@dealer.test | Password1234$ |
| Customer | customer@example.com | Password1234$ |

Admin UI: http://localhost:3000/admin/login — not part of this Remix app.

## What changed on this branch

- Centralized API config (`app/config/api.ts`, `app/store/apiEndpoints.ts`)
- Fixed dealers page default API URL (was `localhost:8080`)
- Safer `apiFetch` empty-list handling (`data: []`)
- Server services use shared `apiUrl` / `apiEndpoints`

## Parity checklist

See `../car-management-v2/docs/rebuild-plan.md` for the full API contract.
Run smoke checks from car-management-v2:

```bash
cd ../car-management-v2
./scripts/api-parity-check.sh
```

Or manually:

```bash
curl http://localhost:3000/api/v1/health
curl http://localhost:3000/api/v1/cars/carmakes
curl http://localhost:3000/api/v1/dealers
curl -c /tmp/cookies.txt -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dana@dealer.test","password":"password"}'
curl -b /tmp/cookies.txt http://localhost:3000/api/v1/dealer-dashboard/stats
```

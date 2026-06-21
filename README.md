# Skill Up Demo Web

Standalone demo frontend for client walkthroughs. This project is separate from `NGO_skill_up` and does not call any backend, database, auth provider, or external service.

## What it includes

- Demo login choices for `New User`, `Existing User`, and `Admin`
- Multi-step onboarding flow
- Learner dashboard, course detail, blogs, news, help, and profile screens
- Admin dashboard with mock KPIs and learner cards
- Vercel-ready SPA routing via `vercel.json`

## Run locally

```powershell
cd c:\Users\UDAY\Desktop\Projetcs\NGO\skill-up-demo-web
npm install
npm run dev
```

## Production build

```powershell
npm run build
```

## Deploy to Vercel

1. Push this folder to its own Git repository, or import it as a subfolder project in Vercel.
2. In Vercel:
   - Framework preset: `Vite`
   - Root directory: `skill-up-demo-web`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy and share the generated public URL.

## Demo behavior

- `New User` opens onboarding first
- `Existing User` opens learner dashboard directly
- `Admin` opens admin dashboard directly
- Demo session and onboarding draft are stored in browser local storage
- `Reset saved demo state` clears the local browser state for a fresh walkthrough

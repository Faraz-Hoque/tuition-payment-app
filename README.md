# TuitionPay

Track tuition fees, due dates and payments for students and teachers.
Front-end only for now: data comes from a mock database in `src/mock/db.js`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # production build in dist/
```

On the login page, pick **student** or **teacher** (demo mode, no password).

## Tech

| Tool | What it does here |
| --- | --- |
| React 19 + Vite | UI library + dev server/bundler |
| React Router | URLs -> pages (`src/app/router.jsx`) |
| TanStack Query | Loading, caching and refetching data (`src/services/queries.js`) |
| lucide-react | Icons |
| Plain CSS + custom properties | Styling; all colours/spacing are tokens in `src/styles/tokens.css` |

## Folder structure

```
src/
  app/            App wiring: providers, router, page registry (navigation.js)
  components/
    layout/       AppShell, Sidebar, Topbar: the frame around every page
    ui/           Reusable building blocks: Card, Badge, DataTable, StatCard...
  features/       One folder per area of the product
    auth/         Login page, auth context, route guard
    student/      Student pages + student-only components
    teacher/      Teacher pages
  services/
    api.js        THE ONLY place that knows where data comes from (mock today, server later)
    queries.js    React hooks that call api.js through TanStack Query
  mock/db.js      Fake data shaped like database tables
  utils/          Pure helpers: dates, formatting, status rules
  config/app.js   App name, currency, locale, "due soon" threshold
  styles/         Global CSS split by concern
```

Data flows one way: **page -> hook (queries.js) -> api.js -> mock db / server**.

## How to...

**Add a page**: create `src/features/<area>/pages/MyPage.jsx`, then add one line to
`src/app/navigation.js`. The route and the sidebar link are created from that list.

**Add data**: add a function to `src/services/api.js`, then a hook to `src/services/queries.js`,
then use the hook in your page.

**Connect a real backend**: replace function bodies in `src/services/api.js` with `fetch` calls
that return the same shapes. Pages don't change.

**Change currency or locale**: edit `src/config/app.js`.

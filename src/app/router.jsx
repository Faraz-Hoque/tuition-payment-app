import { createBrowserRouter } from 'react-router'
import AppShell from '@/components/layout/AppShell'
import LoginPage from '@/features/auth/LoginPage'
import RequireRole from '@/features/auth/RequireRole'
import { areas } from './navigation'
import { NotFound, RouteError } from './RouteFallbacks'

// URL map of the app (React Router "data mode"):
//
//   /                    -> LoginPage
//   /student             -> AppShell (student sidebar)  -> StudentDashboard
//   /student/payments    -> AppShell                    -> PaymentHistory
//   /teacher/...         -> AppShell (teacher sidebar)  -> teacher pages
//   anything else        -> NotFound
//
// Child routes render inside AppShell's <Outlet />.
export const router = createBrowserRouter([
  { path: '/', element: <LoginPage />, errorElement: <RouteError /> },

  ...areas.map(({ role, basePath, sectionLabel, pages }) => ({
    path: basePath,
    errorElement: <RouteError />,
    element: (
      <RequireRole role={role}>
        <AppShell pages={pages} basePath={basePath} sectionLabel={sectionLabel} />
      </RequireRole>
    ),
    children: pages.map(({ path, Component }) =>
      path ? { path, element: <Component /> } : { index: true, element: <Component /> },
    ),
  })),

  { path: '*', element: <NotFound /> },
])

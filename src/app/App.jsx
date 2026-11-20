import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import AuthProvider from '@/features/auth/AuthProvider'
import { router } from './router'

// One cache for the whole app. staleTime = how long data counts as "fresh"
// before TanStack Query refetches it in the background.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
  },
})

// Providers wrap the app so every component can reach shared services.
// Order matters: AuthProvider uses the query client, so it goes inside it.
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export function NotFound() {
  return (
    <main className="fallback">
      <h1>Page not found</h1>
      <p className="muted">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn">Go home</Link>
    </main>
  )
}

// Shown if a page crashes while rendering, instead of a blank white screen.
export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error?.message
  return (
    <main className="fallback">
      <h1>Something broke</h1>
      <p className="muted">{message ?? 'Unexpected error.'}</p>
      <Link to="/" className="btn">Go home</Link>
    </main>
  )
}

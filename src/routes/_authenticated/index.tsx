import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Link to="/dashboard">Dashboard</Link>
  )
}

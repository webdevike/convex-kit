import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {

  const currentUser = useQuery(api.users.current)


  return (
    <div>
      <h1>Dashboard</h1>
      hey {currentUser?.name}
    </div>
  )
}

import { SignUp } from '@clerk/clerk-react'
import { Center } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Center h="100vh">
      <SignUp signInUrl="/sign-in"  />
    </Center>
  )
}

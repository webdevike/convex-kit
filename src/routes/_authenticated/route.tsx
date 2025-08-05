import { Sidebar } from '@/components/sidebar/sidebar';
import { Burger, Center, Group, Loader } from '@mantine/core';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createFileRoute, Navigate, Outlet, ParsedLocation, redirect } from '@tanstack/react-router'
import { Authenticated, useConvexAuth } from 'convex/react';

function AuthenticatedLayout() {
  const [opened, { toggle }] = useDisclosure(false);
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader type="dots" />
      </Center>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/sign-in" />
    )
  }


  return (
    <Authenticated>

      <AppShell
        padding="md"
        header={{ height: { base: 60, sm: 0, md: 0, lg: 0, xl: 0 } }}
        navbar={{
          width: { base: 280 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >

        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Authenticated>
  )
}

const authCheck = (context: { isAuthenticated: boolean, isLoading: boolean }, location: ParsedLocation) => {
  if (!context.isAuthenticated && !context.isLoading) {
    redirect({
      to: '/sign-in',
      search: {
        redirect: location.href,
      },
    })
  }
}


export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: async ({ location, context }) => {
    authCheck(context, location)
  },
})
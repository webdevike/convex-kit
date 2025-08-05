import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { RouterProvider } from "@tanstack/react-router";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { MantineProvider } from '@mantine/core';
import router from "./router";
import { Notifications } from "@mantine/notifications";
import { nprogress, NavigationProgress } from "@mantine/nprogress";
import { dark } from "@clerk/themes";


router.subscribe('onBeforeLoad', () => nprogress.start())
router.subscribe('onLoad', () => nprogress.complete())



function InnerApp() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return <RouterProvider router={router} context={{ isAuthenticated, isLoading }} />;
}


function App() {
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);


  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} appearance={{
      baseTheme: dark,
    }}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <MantineProvider defaultColorScheme="dark" theme={{
          primaryColor: 'orange'
        }}>
          <Notifications />
          <NavigationProgress />
          <InnerApp />
        </MantineProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default App;
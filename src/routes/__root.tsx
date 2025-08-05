import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";




interface MyRouterContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
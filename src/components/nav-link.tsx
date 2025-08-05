import * as React from 'react'
import { createLink, LinkComponent, useLocation } from '@tanstack/react-router'
import { NavLink as MantineNavLink, NavLinkProps } from '@mantine/core'

interface MantineNavLinkProps extends Omit<NavLinkProps, 'href'> {
  className?: string;
  // Add any additional props you want to pass to the anchor
}

const MantineNavLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  MantineNavLinkProps
>((props, ref) => {
  const currentPath = useLocation()
  const isActive = !currentPath.pathname
  return <MantineNavLink style={{ borderRadius: 'var(--mantine-radius-sm)' }} ref={ref} {...props} active={isActive} />
})

const CreatedNavLinkComponent = createLink(MantineNavLinkComponent)

export const NavLink: LinkComponent<typeof MantineNavLinkComponent> = (
  props,
) => {
  return <CreatedNavLinkComponent preload="intent" {...props} />
}
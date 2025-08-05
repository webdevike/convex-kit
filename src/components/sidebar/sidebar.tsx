import { IconActivity, IconBulb, IconCheckbox, IconChevronRight, IconDashboard, IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Code,
  Group,
  // NavLink,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import classes from './sidebar.module.css';
import { UserButton } from '@clerk/clerk-react';
import { Link } from '../link';
import { useLocation } from '@tanstack/react-router';
import { NavLink } from '../nav-link';

const links = [
  { icon: IconDashboard, label: 'Dashboard', notifications: 0, to: '/dashboard' },
  // { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  // { icon: IconUser, label: 'Contacts' },
];



const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];

export function Sidebar() {

  const location = useLocation()
  const mainLinks = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.to}
      label={link.label}
      leftSection={<link.icon size={16} stroke={1.5} />}
      rightSection={
        link.notifications > 0 && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )
      }
      active={location.pathname === link.to}
    />
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <Box component="span" mr={9} fz={16}>
        {collection.emoji}
      </Box>{' '}
      {collection.label}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <UserButton showName />
      </div>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <div className={classes.section}>
        <Group className={classes.collectionsHeader} justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        {/* TODO: add collections */}
        {/* <div className={classes.collections}>{collectionLinks}</div> */}
      </div>
    </nav>
  );
}
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Kit project - a full-stack meta-framework that combines TanStack Router, React, Mantine UI, Convex, and Clerk. It follows a schema-driven development approach where entity definitions automatically generate backend functions, TypeScript types, and React components.

## Development Commands

```bash
# Main development workflow
npm run dev                    # Start frontend, backend, and entity watcher
npm run build                  # Build for production  
npm run lint                   # TypeScript check and ESLint
npm run preview                # Preview production build

# Entity management (Kit CLI)
npm run kit generate           # Generate all code from entities
npm run kit:watch             # Start entity file watcher only
npm run kit:dev               # Entity development mode
npm run kit entity list       # List all entities
npm run kit entity validate   # Validate entity definitions

# Backend (Convex)
npm run dev:backend           # Start Convex backend only
npm run predev                # Initialize Convex dev and open dashboard

# Frontend (Vite + React)
npm run dev:frontend          # Start Vite dev server only
```

## Architecture

### Tech Stack
- **Frontend**: React 19, TanStack Router 1.x, Mantine 8.x
- **Backend**: Convex (real-time database and functions)
- **Auth**: Clerk (user management)
- **Styling**: Tailwind CSS 4.x, Mantine components
- **Build**: Vite 6.x, TypeScript 5.7

### Key Directories
```
├── entities/                 # Entity definitions (core concept)
│   └── *.entity.ts          # Schema, permissions, UI config
├── convex/                  # Backend functions and schema
├── src/
│   ├── routes/              # TanStack Router file-based routing
│   ├── components/          # React components
│   └── .generated/          # Auto-generated code (DO NOT EDIT)
└── tools/                   # Kit CLI and generators
```

### Entity-Driven Development
The core concept is entity definitions that drive code generation:

```typescript
// entities/product.entity.ts
export const ProductEntity = {
  name: 'products',           // Convex table name
  schema: {                   // Convex schema with v.* validators
    name: v.string(),
    price: v.number(),
    inStock: v.boolean(),
  },
  permissions: {              # RBAC permissions
    create: ['user', 'admin'],
    read: ['public'],
    update: ['owner', 'admin'],
    delete: ['admin']
  },
  ui: {                       # UI generation configuration
    listFields: ['name', 'price', 'inStock'],
    formFields: ['name', 'price', 'inStock'],
    searchFields: ['name']
  }
};
```

This automatically generates:
- Convex schema updates (`convex/schema.ts`)
- CRUD functions (`convex/[entity].ts`)
- TypeScript types (`src/.generated/types/`)
- React components (`src/.generated/components/`)

### Code Generation System
- **File Watcher**: Monitors `entities/` directory using chokidar
- **Generators**: Modular system for schema, CRUD, types, and components
- **Hot Reload**: Entity changes trigger automatic regeneration
- **Preservation**: Manual code in generated files is preserved with special comments

## Important Development Notes

### Generated Code Rules
- **NEVER** edit files in `src/.generated/` - they are overwritten
- Entity changes automatically trigger regeneration during development
- Generated components use Mantine UI and follow established patterns
- All generated code maintains 100% type safety from database to UI

### Entity Management Workflow
1. Define entities in `entities/[name].entity.ts`
2. Run `npm run dev` (includes entity watcher)
3. Generated code appears in appropriate directories
4. Import and use generated components/functions
5. Customize by creating override components if needed

### File Structure Conventions
- Routes use TanStack Router file-based routing in `src/routes/`
- Components organized by feature in `src/components/`
- Convex functions in `convex/` with generated CRUD operations
- Entity definitions use consistent naming: `[Entity]Entity` exports

### Key Files
- `tools/cli.ts`: Kit CLI for entity management
- `vite.config.ts`: Includes TanStack Router plugin and path aliases
- `convex/auth.config.ts`: Clerk authentication configuration
- Route aliases: `@` → `./src`, `@convex` → `./convex`

### Testing and Validation
- Use `npm run kit entity validate` to check entity definitions
- TypeScript compilation via `npm run lint` catches type errors
- Entity watcher includes verbose logging with `--verbose` flag

## Integration Notes

### Convex Integration
- Real-time subscriptions included by default in generated functions
- Schema generation preserves manual tables and functions
- CRUD operations include permission checks based on entity config

### Clerk Authentication
- User management integrated throughout the application
- Permission-based UI rendering and API access
- Authentication routes: `/sign-in`, `/sign-up`

### TanStack Router
- File-based routing with automatic route generation
- Authenticated routes in `_authenticated/` directory structure
- Route tree generated automatically in `src/routeTree.gen.ts`
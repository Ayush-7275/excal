# ExcaliCollab

A real-time collaborative whiteboard application built with a hybrid HTTP + WebSocket architecture, structured as a monorepo using Turborepo.

> Draw together. In real time. With anyone.

---

## ✨ Features

- 🎨 **Real-time collaboration** — sub-100ms multi-user canvas synchronization
- 🔌 **Hybrid communication layer** — HTTP for session & state, WebSockets for live drawing events
- 🔐 **Authentication** — Secure user sign-up/sign-in with session management
- 🗄️ **Persistent canvas state** — Canvas data survives disconnections and page refreshes
- 📦 **Monorepo architecture** — Modular, scalable structure via Turborepo + pnpm workspaces

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| HTTP Backend | Node.js, Express.js, TypeScript |
| WebSocket Server | Node.js, WebSockets, TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Monorepo | Turborepo, pnpm workspaces |
| Language | TypeScript (throughout) |

---

## 📁 Project Structure

```
excal/
├── apps/
│   ├── web/              # Next.js frontend (canvas UI, auth pages)
│   ├── http-server/      # Express REST API (sessions, canvas persistence)
│   └── ws-server/        # WebSocket server (live drawing broadcast)
│
├── packages/
│   ├── db/               # Prisma schema, migrations, generated client
│   ├── ui/               # Shared UI components (Button, Card, Code)
│   ├── schema/           # Shared Zod/validation schemas
│   ├── tailwind-config/  # Shared Tailwind configuration
│   ├── typescript-config/# Shared tsconfig presets
│   └── eslint-config/    # Shared ESLint rules
│
├── turbo.json            # Turborepo pipeline config
├── pnpm-workspace.yaml   # pnpm workspace definition
└── package.json
```

---

## ⚙️ Architecture

ExcaliCollab uses a **hybrid HTTP + WebSocket communication model**:

```
Client
  │
  ├── HTTP  ──▶  http-server  ──▶  PostgreSQL
  │              (session init, canvas state persistence)
  │
  └── WS    ──▶  ws-server
                 (live drawing event broadcast to all connected clients)
```

- **HTTP layer** handles everything stateful — user auth, session creation, and saving/loading canvas snapshots. This ensures a reconnecting user always restores the correct canvas state.
- **WebSocket layer** is purely real-time — it broadcasts drawing events to all connected clients with minimal latency. No state is stored here.

This separation eliminates race conditions that arise when a single layer tries to handle both real-time sync and persistence.

---

## 🗄️ Database Schema

Managed via **Prisma ORM** with PostgreSQL.

Key models:
- `User` — stores user credentials and identity
- `Room` — represents a collaborative canvas session
- `Chat` — stores messages within a room (if chat feature is enabled)

Migrations are tracked under `packages/db/prisma/migrations/`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- pnpm `>= 8`
- PostgreSQL instance running

### Installation

```bash
# Clone the repo
git clone https://github.com/[YOUR_USERNAME]/excal.git
cd excal

# Install dependencies
pnpm install
```

### Environment Variables

Create `.env` files in the relevant apps:

**`apps/http-server/.env`**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/excaldb
JWT_SECRET=your_jwt_secret
PORT=3001
```

**`apps/ws-server/.env`**
```env
WS_PORT=3002
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_HTTP_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002
```

### Database Setup

```bash
# Run Prisma migrations
cd packages/db
pnpm prisma migrate dev
```

### Running the App

```bash
# From the root — runs all apps in parallel via Turborepo
pnpm dev
```

| App | URL |
|---|---|
| Web (Next.js) | http://localhost:3000 |
| HTTP Server | http://localhost:3001 |
| WebSocket Server | ws://localhost:3002 |

---

## 📜 Scripts

From the root:

```bash
pnpm dev       # Start all apps in development mode
pnpm build     # Build all apps and packages
pnpm lint      # Lint all packages
pnpm typecheck # TypeScript check across the monorepo
```

---

## 🛣️ Roadmap

- [ ] Shape tools (rectangle, circle, arrow)
- [ ] Export canvas as PNG/SVG
- [ ] Room sharing via invite link
- [ ] Cursor presence (see where others are drawing)
- [ ] Undo/redo support

---

## 👤 Author

**Ayushman Rai**
ayushman.23bsa10023@vitbhopal.ac.in

---

## 📄 License

MIT License — feel free to use, fork, and build on this.

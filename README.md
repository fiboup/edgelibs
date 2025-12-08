# EdgeLibs

A collection of lightweight, edge-runtime compatible libraries for modern web frameworks. Built with TypeScript and optimized for edge computing environments like Cloudflare Workers, Vercel Edge Functions, and Deno Deploy.

## 🚀 Packages

### [@fiboup/firebase-auth](./packages/firebase-auth)
Core Firebase Authentication library providing JWT verification, token decoding, and authentication utilities. This is the foundation for other Firebase Auth integrations.

**Features:**
- JWT token verification using Firebase public keys
- Token decoding and validation
- Sign in with password
- Sign up functionality
- Sign in with custom token
- Edge runtime compatible (no Node.js dependencies)

### [@fiboup/google-identify-toolkit](./packages/google-identify)
Google Identity Toolkit services for account management and authentication.

**Features:**
- Account lookup
- Sign in with password
- Sign up

### [@fiboup/h3-firebase-auth](./packages/h3-firebase-auth)
Firebase Authentication middleware for [H3](https://github.com/unjs/h3) framework.

**Features:**
- H3 middleware for JWT verification
- Automatic user context injection
- Customizable user transformation
- Type-safe user context

[📖 Documentation](./packages/h3-firebase-auth/README.md)

### [@fiboup/hono-firebase-auth](./packages/hono-firebase-auth)
Firebase Authentication middleware for [Hono](https://hono.dev/) framework.

**Features:**
- Hono middleware for JWT verification
- Automatic current user context injection
- Customizable user transformation
- Type-safe user context

[📖 Documentation](./packages/hono-firebase-auth/README.md)

## 🛠️ Installation

Each package can be installed independently:

```bash
# Firebase Auth core library
pnpm add @fiboup/firebase-auth

# H3 integration
pnpm add @fiboup/h3-firebase-auth

# Hono integration
pnpm add @fiboup/hono-firebase-auth

# Google Identity Toolkit
pnpm add @fiboup/google-identify-toolkit
```

## 🏗️ Development

This is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces).

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build specific package
pnpm build:firebase-auth
pnpm build:hono-firebase-auth

# Lint and format
pnpm lint.check
pnpm lint.format

# Run tests
pnpm test
```

## 📦 Project Structure

```
edgelibs/
├── packages/
│   ├── firebase-auth/          # Core Firebase Auth library
│   ├── google-identify/        # Google Identity Toolkit
│   ├── h3-firebase-auth/       # H3 framework integration
│   └── hono-firebase-auth/     # Hono framework integration
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

## 🌐 Edge Runtime Compatibility

All packages in this monorepo are designed to run on edge runtimes:

- ✅ **Cloudflare Workers**
- ✅ **Vercel Edge Functions**
- ✅ **Deno Deploy**
- ✅ **Netlify Edge Functions**
- ✅ **Bun**
- ✅ **Node.js** (with ESM support)

These libraries avoid Node.js-specific APIs and use Web Standards APIs, making them compatible with modern edge computing platforms.

## 📝 License

MIT © [Hieu Tran](https://github.com/hieuhani)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- Author: Hieu Tran <hieutran.fu@gmail.com>
- Repository: [https://github.com/hieuhani/edgelibs](https://github.com/hieuhani/edgelibs)


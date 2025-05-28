# Product SPA

Single Page Application (SPA) to manage products via API with full CRUD support, using React, TypeScript, and Redux (vanilla).

---

## Tech Stack

- React
- TypeScript
- Redux (no Toolkit)
- Webpack
- Docker & Docker Compose
- GitHub Actions
- TDD & Trunk Based Development

---

## Getting Started

### Prerequisites

- Docker + Docker Compose
- Node 18 (optional for local dev)

### Run with Docker

```bash
docker-compose up --build
```

### Run locally without Docker

```bash
npm install
npm run start
```

---

## CI/CD - GitHub Actions

This project includes a GitHub Actions workflow for continuous integration.

### What it does

- Triggers on every push or pull request to `main`
- Installs dependencies (`npm install`)
- Builds the application (`npm run build`)
- Runs tests (`npm test`)

---

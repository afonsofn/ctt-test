# CTT Product Management

A lightweight and fully dockerized product management application built with modern web technologies.

## Tech Stack

- **Frontend**: React + TypeScript + Redux + Webpack
- **Backend**: Node.js + Express
- **Testing**: Jest + React Testing Library
- **Caching**: In-memory caching for API responses
- **Containerization**: Docker + Docker Compose
- **CI**: GitHub Actions

## Project Structure

```bash
├── app/                 # Frontend source code (React)
├── server/              # Backend API code (Node.js + Express)
├── webpack/             # Webpack configuration files
├── src/                 # Frontend bootstrap
├── public/              # Html entry file for the frontend
├── Dockerfile           # Docker image setup for running both client and API
├── docker-compose.yml   # Container orchestration for client + API
└── package.json         # Project scripts and dependencies
```

## Getting Started

### Local Development

You can run the project locally **without Docker**, using two terminal windows:

- In the **first terminal**, start the frontend:

```bash
npm install
npm run start # Launches Webpack Dev Server at http://localhost:3000
```

- In the **second terminal**, start API server:

```bash
npm run start:api # Launches the Express API at http://localhost:4000
```

### Run with Docker

If you prefer to run everything inside containers using Docker:

```bash
npm run start:docker # Runs docker-compose up --build to start both client and API
```

The frontend will be available at http://localhost:3000.<br>
The API will be available at http://localhost:4000.

Local volumes are synchronized with the container to support **hot-reloading** during development.

### Running Tests

Run all tests once:

```bash
npm test # Executes the entire test suite using Jest
```

Run tests in watch mode:

```bash
npm run test:watch # Keeps Jest watching for file changes and reruns tests automatically
```

## CI/CD - GitHub Actions

This project includes a pre-configured GitHub Actions workflow for continuous integration:

- Triggers on every `push` or `pull request` to `main`
- Installs dependencies (`npm install`)
- Builds the application (`npm run build`)
- Runs tests (`npm test`)

## Improvements (if this were a real product)

- Add **filters** to the table in order to help users easily narrow down **large product lists** by category, price range, or stock availability, with optional sorting and pagination for better navigation
- Enhance UX by implementing **optimistic updates** (e.g., instantly removing a deleted product from the list before waiting for the API response).
- Improve user feedback with consistent loading indicators **(spinners/skeletons)** and user-friendly error messages across the app, especially on API interactions.
- Replace basic input handling with a robust form library like `react-hook-form`.
- **Persist** relevant Redux state (e.g., filters or UI state) using `redux-persist` or `localStorage` to maintain user context between sessions.
- Ensure components are **accessible** via keyboard navigation, proper ARIA attributes, and screen reader support.
- Adopt a more scalable styling solution like `Tailwind CSS` to improve maintainability and consistency across components.
- Add **smooth UI transitions** for modal openings, toast notifications, and form validation feedback to enhance user experience.

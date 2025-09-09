# TinyScripts

TinyScripts is a desktop application for running small, task-focused automation scripts with a simple UI. It is built with Electron, Vite, and React, and aims to be modular so new scripts can be added and discovered easily.

## What this app does

- Provides a lightweight UI to browse and run scripts.
- Each script has its own detail page with configuration options and a clear Run action.

## Build and run

Prerequisites: Node.js (LTS recommended) and npm.

Install dependencies:

```bash
npm install
```

Run in development (starts Electron + Vite dev server):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the built app locally:

```bash
npm start
```

## Roadmap / Ongoing plans

- Modular script system
	- Clear contract for scripts (metadata, config schema, run handler).
	- Hot registration and lazy loading of scripts.
- Remote scripts repository
	- Discover, download, and update scripts from a remote registry.
- UX improvements
	- Persistent settings and last-used options per script.
- Packaging
	- Cross-platform packaging pipelines and auto-updates.
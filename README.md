# Travel Analytics Hub

A modern travel analytics dashboard built with React, Vite, Bootstrap 5, and Chart.js.

## Features

- Executive dashboard overview
- Folder status analytics with Excel/CSV upload
- Responsive Bootstrap-based UI
- Chart.js visualizations
- Report export tools

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages deployment

1. Push this repository to GitHub.
2. Open the repository Settings → Pages.
3. Set the source to GitHub Actions.
4. The workflow in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) will deploy the app automatically on pushes to the `main` branch.

The app is configured to use the base path `/travel-analytics-hub/` for GitHub Pages.

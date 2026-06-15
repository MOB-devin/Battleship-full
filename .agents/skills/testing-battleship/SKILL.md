---
name: testing-battleship
description: Test the Battleship app locally. Use when verifying UI, style, or asset changes.
---

## Local Dev Setup

1. `npm install`
2. `npx webpack serve --config webpack.dev.js --port 8080`
3. Open `http://localhost:8080` in browser

## Known Build Issues

- `github.svg` and `grid.svg` might be missing from `src/assets/images/`. If the build fails with "Module not found" for these files, create minimal placeholder SVGs:
  ```bash
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" fill="none"/></svg>' > src/assets/images/github.svg
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="none"/></svg>' > src/assets/images/grid.svg
  ```
- These stubs are only needed for local compilation; do not commit them unless fixing the issue permanently.

## Verifying Style/Background Changes

- Use browser console to check computed styles:
  ```js
  window.getComputedStyle(document.body).backgroundImage
  ```
- Background styles are defined in `src/styles/main.scss` (line ~50 for body background)
- Asset files live in `src/assets/images/`

## Project Structure

- Webpack configs: `webpack.dev.js`, `webpack.prod.js`, `webpack.common.js`
- Entry point: `src/modules/main.js`
- Styles: `src/styles/` (SCSS modules)
- No CI configured on this repo
- Tests: `npm test` (Jest)

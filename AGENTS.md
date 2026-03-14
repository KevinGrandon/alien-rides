# AGENTS.md

## Cursor Cloud specific instructions

### Overview
AlienRides is a single-page marketing/landing site for electric vehicles, built with **Fusion.js 1.x** (Uber's universal React framework). It uses server-side rendering (SSR) with Koa, React 16, Styletron for CSS-in-JS, and React Router.

### Node.js version
This project **requires Node.js 10** (v10.24.1). Fusion.js 1.x and its native dependency `iltorb` (Brotli compression) are incompatible with Node 12+ in this environment. Use `nvm use 10` before running any commands.

### Key commands
All scripts are defined in `package.json`:
- `yarn dev` / `npx fusion dev --no-open --port 3000` — start the dev server (SSR + HMR)
- `yarn test` / `npx fusion test` — run tests (note: no test files exist in this repo, so this exits with code 1)
- `yarn build` — production build

### Gotchas
- **Accept header required**: The Fusion.js dev server returns `404 Not Found` for requests without `Accept: text/html`. When testing with `curl`, use `curl -H "Accept: text/html" http://localhost:3000/`. In a browser this works automatically.
- **`--no-open` flag**: Use `--no-open` when starting the dev server in headless/cloud environments to prevent it from trying to open a browser.
- **First build is slow**: The initial webpack compilation (both server and client bundles) can take 30–60 seconds. The server starts responding only after compilation completes.
- **No lint command**: There is no standalone lint script in `package.json`. Flow type checking was used but `.flowconfig` is not present in the repo.
- **Missing static asset**: The file `src/static/cycle.png` may need to be restored from git history (commit `35773cf`) if missing. Without it the animated landscape bike image won't render.
- **`yarn install --ignore-scripts`** will NOT work because the native `iltorb` module must be compiled. Use plain `yarn install` with Node 10.

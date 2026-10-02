# Darkest Companion

A [Darkest Dungeon](https://www.darkestdungeon.com/) curios and provisions helper.

![screenshots](./screenshots.png)

## Development

Requires Node.js 22.12 or newer and pnpm 12.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:5173>.

## Checks and production build

```bash
pnpm test
pnpm build
pnpm preview
```

The static site is written to `dist/` and can be hosted by any static web host. The
build uses relative asset paths so it also works when hosted under a project path,
such as GitHub Pages.

### GitHub Pages

Set the repository's Pages source to **GitHub Actions**, then run the
`Deploy to GitHub Pages` workflow from the Actions tab. Deployment is manual; the
workflow runs the tests and production build before publishing `dist/`.

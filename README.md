# redot-academy

## Local development

### Prerequisites
[Bun](https://bun.sh) or [Node](https://nodejs.org/en)

:::info
We recommend using Bun as it is more moden, easier to install and manage, faster and simpler.

but some people have reported difficulties with running it on their systems, in that case, you can use NodeJS but it is more involved.
:::

### Local Dependencies
In order to run the Redot Academy locally you need to first install the node modules the project relies on.

#### Dependencies
With Bun:
```bash
bun i
```
or
```bash
bun install
```

With Node:
```bash
npm install
```
:::info
With node you may need to explicitly install the dependencies of the vitepress package as well
```bash
cd packages/vitepress
npm install
```
:::

#### Running dev server
With bun:
```bash
bun run index.ts
```

With Node:
```bash
npx vitepress dev packages/vitepress
```

### Build
To redy the project build for manual deployement or other reasons.

With Bun:
```bash
bun docs:build
```

With Node:
```bash
npx vitepress build packages/vitepress
```

---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vite Plugin<br>Readable Classnames"
  text: "Make your scoped CSS module class names clear and readable"
  tagline: This plugin automatically adds the module filename and other useful info to class names for easier development.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Options
      link: /options/

features:
  - icon: ♻️
    title: Framework-agnostic
    details: Tested on projects with vanilla JS/TS, React, and Vue
  - icon: ✨
    title: Universal
    details: Compatible with both CommonJS and ES Modules
  - icon: 🔧
    title: Customizable
    details: Flexible configuration through options object
---

## Getting Started

Add the plugin to your project using your favorite package manager!

::: code-group

```sh [npm]
npm install -D vite-plugin-readable-classnames
```

```sh [yarn]
yarn add -D vite-plugin-readable-classnames
```

```sh [pnpm]
pnpm add -D vite-plugin-readable-classnames
```

```sh [bun]
bun add -d vite-plugin-readable-classnames
```

:::

## Migration from vite-plugin-pretty-module-classnames

`vite-plugin-readable-classnames` is the new identity for `vite-plugin-pretty-module-classnames`. This guide will help you migrate from `vite-plugin-pretty-module-classnames` to `vite-plugin-readable-classnames`.

1. Uninstall the old plugin and install the new one

::: code-group

```sh [npm]
npm uninstall vite-plugin-pretty-module-classnames
npm install -D vite-plugin-readable-classnames
```

```sh [yarn]
yarn remove vite-plugin-pretty-module-classnames
yarn add -D vite-plugin-readable-classnames
```

```sh [pnpm]
pnpm remove vite-plugin-pretty-module-classnames
pnpm add -D vite-plugin-readable-classnames
```

```sh [bun]
bun remove vite-plugin-pretty-module-classnames
bun add -d vite-plugin-readable-classnames
```

:::

2. Update the import and plugin usage in your `vite.config.js` or `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames' // [!code --]
import readableClassnames from 'vite-plugin-readable-classnames' // [!code ++]

export default defineConfig {
  plugins: [prettyModuleClassnames()], // [!code --]
  plugins: [readableClassnames()], // [!code ++]
}
```

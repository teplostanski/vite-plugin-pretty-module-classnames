---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vite Plugin Pretty Module Classnames"
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
  - title: Framework-agnostic
    details: Tested on projects with vanilla JS/TS, React, and Vue
  - title: Universal
    details: Compatible with both CommonJS and ES Modules
  - title: Customizable
    details: Flexible configuration through options object
---

## Getting Started

Add the plugin to your project using your favorite package manager!

::: code-group

```sh [npm]
npm install -D vite-plugin-pretty-module-classnames
```

```sh [yarn]
yarn add -D vite-plugin-pretty-module-classnames
```

```sh [pnpm]
pnpm add -D vite-plugin-pretty-module-classnames
```

```sh [bun]
bun add -d vite-plugin-pretty-module-classnames
```

:::

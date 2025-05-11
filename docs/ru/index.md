---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vite Plugin Pretty Module Classnames"
  text: "Сделайте имена классов CSS-модулей понятными и читаемыми"
  tagline: "Плагин автоматически добавляет имя файла модуля и другую полезную информацию к именам классов для удобной разработки."
  actions:
    - theme: brand
      text: Поехали
      link: /ru/guide/
    - theme: alt
      text: Опции
      link: /ru/options/

features:
  - icon: ♻️
    title: Не зависит от фреймворка
    details: Проверено на проектах с ванильным JS/TS, React и Vue
  - icon: ✨
    title: Универсальный
    details: Совместим с CommonJS и ES Modules
  - icon: 🔧
    title: Настраиваемый
    details: Гибкая настройка через объект параметров
---

## Начало работы

Добавьте плагин в свой проект, используя любимый пакетный менеджер!

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
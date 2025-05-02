Русский | [English](./README.md)

<div align='center'>
<h1>vite-plugin-pretty-module-classnames</h1>

[<img alt="NPM Version" src="https://img.shields.io/npm/v/vite-plugin-pretty-module-classnames?style=flat-square&color=07912E&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="NPM License" src="https://img.shields.io/npm/l/vite-plugin-pretty-module-classnames?style=flat-square&color=D3748F&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/vite-plugin-pretty-module-classnames?style=flat-square&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="NPM Downloads" src="https://img.shields.io/npm/dw/vite-plugin-pretty-module-classnames?style=flat-square&color=7F78D1&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/teplostanski/vite-plugin-pretty-module-classnames?style=flat-square&labelColor=1f2033">](https://github.com/teplostanski/vite-plugin-pretty-module-classnames)
[<img alt="Coverage" src="https://codecov.io/gh/teplostanski/vite-plugin-pretty-module-classnames/graph/badge.svg?token=CQY9WXG41L">](https://codecov.io/gh/teplostanski/vite-plugin-pretty-module-classnames)

</a>

<h3>Сделайте имена классов CSS-модулей понятными и читаемыми — этот плагин автоматически добавляет имя файла модуля и другую полезную информацию к именам классов для удобной разработки.</h3>

<p>
Входит в <a href='https://github.com/vitejs/awesome-vite'>список Awesome Vite.js <img src='https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg' alt='Awesome'></a>
</p>
</div>

## 📦 Установка

[npmjs.com](https://npmjs.com/package/vite-plugin-pretty-module-classnames) • [yarnpkg.com](https://yarnpkg.com/package?q=vite-plugin-pretty-module-classnames&name=vite-plugin-pretty-module-classnames)

```bash
npm install -D vite-plugin-pretty-module-classnames

yarn add -D vite-plugin-pretty-module-classnames

pnpm add -D vite-plugin-pretty-module-classnames

bun add -d vite-plugin-pretty-module-classnames
```

## 🦾 Возможности

- Не зависит от фреймворка:
  - Проверено на проектах с ![VanillaJS](https://img.shields.io/badge/Vanilla_JS/TS-%231f2033.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%231f2033.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vue](https://img.shields.io/badge/vue-%231f2033.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
  - Потенциально работает с любым фреймворком. Если возникнут проблемы — создайте [issue](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/issues)
- Универсальный:
  - Совместим с `CommonJS` и `ES Modules`
  - Совместим с `Vite 2.x`
- Настраиваемый: Гибкая настройка через объект параметров

## 🤔 Какую проблему решает плагин?

В React с CSS-модулями мы привыкли к именам классов вроде `SomeComponent__classname_hash`. По умолчанию Vite генерирует имена в формате `__classname_hash`, опуская имя компонента, что усложняет отладку.

Если попытаться добавить имя компонента через настройку `generateScopedName: '[name]__[local]_[hash:base64:5]'`, в React появится лишний суффикс `-module`, а во Vue такая конфигурация может привести к ошибкам сборки.

Плагин решает эти проблемы и обеспечивает предсказуемое, читаемое именование классов в формате `ComponentName__classname_hash` независимо от фреймворка.

> [!TIP]
> **Что такое сгенерированные имена классов и где они видны?**
>
> Когда вы используете CSS-модули, итоговые имена классов автоматически генерируются сборщиком (например, Vite или Webpack). Эти имена видны:
> - в HTML-коде страницы (через DevTools браузера);
> - в итоговом CSS-файле;
> - при отладке в браузере, когда вы ищете нужный элемент или стиль.
>
> Хорошо читаемые имена классов с именем компонента помогают быстро понять, откуда стиль, и упростить отладку и поддержку проекта.

## ⚙️ Использование

###### Пример

```js
// vite.config.js
// ...
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'

export default defineConfig({
  plugins: [prettyModuleClassnames()],
})
```

## 📚 Документация

Полная документация доступна на [vite-plugin-pretty-module-classnames.teplostanski.dev](https://vite-plugin-pretty-module-classnames.teplostanski.dev/ru/) [ EN | RU ].

## 🤝 Вклад в проект

Хотите помочь проекту? Это здорово! Поставьте звёздочку, расскажите друзьям или создайте [issue на GitHub](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/issues).

Перед тем как вносить изменения, ознакомьтесь с [правилами](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/blob/main/CONTRIBUTING.md).

Спасибо за вашу поддержку! 🙏

<h2> © Лицензия</h2>
<a href="https://github.com/teplostanski/vite-plugin-pretty-module-classnames/blob/main/LICENSE">MIT</a> License © 2024-2025 <a href="https://github.com/teplostanski">teplostanski</a>

<h2> ❤ Поддержать проект</h2>
<a href="https://donate.teplostanski.dev" target="_blank">donate.teplostanski.dev</a> 

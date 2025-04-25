<div align='center'>
<h1>vite-plugin-pretty-module-classnames</h1>

[<img alt="NPM Version" src="https://img.shields.io/npm/v/vite-plugin-pretty-module-classnames?style=flat-square&color=07912E&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="NPM License" src="https://img.shields.io/npm/l/vite-plugin-pretty-module-classnames?style=flat-square&color=D3748F&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/vite-plugin-pretty-module-classnames?style=flat-square&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="NPM Downloads" src="https://img.shields.io/npm/dw/vite-plugin-pretty-module-classnames?style=flat-square&color=7F78D1&labelColor=1f2033">](https://npmjs.com/package/vite-plugin-pretty-module-classnames)
[<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/teplostanski/vite-plugin-pretty-module-classnames?style=flat-square&labelColor=1f2033">](https://github.com/teplostanski/vite-plugin-pretty-module-classnames)
[<img alt="Coverage" src="https://codecov.io/gh/teplostanski/vite-plugin-pretty-module-classnames/graph/badge.svg?token=CQY9WXG41L">](https://codecov.io/gh/teplostanski/vite-plugin-pretty-module-classnames)

</a>

<h3>Adds the filename without the <code>-module</code> suffix to the class names of CSS modules.</h3>

<p>
Included in the <a href='https://github.com/vitejs/awesome-vite'>Awesome Vite.js list <img src='https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg' alt='Awesome'></a>
</p>
</div>

## 📦 Installation

[npmjs.com](https://npmjs.com/package/vite-plugin-pretty-module-classnames) • [yarnpkg.com](https://yarnpkg.com/package?q=vite-plugin-pretty-module-classnames&name=vite-plugin-pretty-module-classnames)

```bash
npm install -D vite-plugin-pretty-module-classnames
```

## 🦾 Features

- Framework-agnostic
  - Tested: ![VanillaJS](https://img.shields.io/badge/Vanilla_JS/TS-%231f2033.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%231f2033.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vue](https://img.shields.io/badge/vue-%231f2033.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) <!--![Astro](https://img.shields.io/badge/Astro-%231f2033.svg?style=for-the-badge&logo=astro&logoColor=%23BC52EE)-->
  - Potentially works with any framework. If you have any problems, write to the [Issue](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/issues)
- Support `CommonJS` and `ES Modules`
- Support `Vite 2.x`
- Configurable: Added support for plugin configuration

## 🤔 Why Use This?

As utilizing CSS modules in React, we're accustomed to seeing class names formatted as `SomeComponent__classname_hash`. However, with Vite, the naming convention for modular class names appears slightly different, resembling `__classname_hash` or `SomeComponent-module__classname_hash` the latter occurring if `generateScopedName: '[name]__[local]_[hash:base64:5]'` is specified in vite.config.js. This addition of `-module` post-component name can be cumbersome to work around.

Fortunately, the `vite-plugin-pretty-module-classnames` provides a solution to this issue!

## ⚙️ Usege

###### Example

```js
// vite.config.js
// ...
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'

export default defineConfig({
  plugins: [prettyModuleClassnames()],
})
```

## 🔧 Configuration

### `separator` Option

The `separator` option allows you to customize the symbols used to join parts of the generated class name.  
You can override any of the following fields (all are optional, defaults are shown):

| Field              | Default | Description                                      |
|--------------------|---------|--------------------------------------------------|
| `beforeHash`       | `'_'`   | Separator before the hash part                   |
| `beforeClassName`  | `'__'`  | Separator between filename and class name        |
| `beforeLineNumber` | `'-'`   | Separator before the line number (if enabled)    |

**Usage example:**
```js
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'

export default defineConfig({
  plugins: [
    prettyModuleClassnames({
      separator: {
        beforeClassName: '--', // Use double dash instead of double underscore
      }
    })
  ]
})
```

This will generate class names like:  
`SomeComponent--classname_abcd1`

> You can provide only the fields you want to override; the rest will use default values.

---

### `lineNumber` Option

The `lineNumber` option is a boolean that, when set to `true`, appends the line number where the CSS class is defined in the source file to the generated class name.

###### Example

```js
// vite.config.js
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'

export default defineConfig({
  plugins: [prettyModuleClassnames({ lineNumber: true })],
})
```

With this configuration, if your CSS file contains:

```css
/* SomeComponent.module.css */
1 .wrapper {
2   /* styles */
3 }
4
5 .container {
6   /* styles */
7 }
```

The generated class names will look like:

`SomeComponent__wrapper_abcd1-1`
`SomeComponent__container_abcd2-5`

<br>

> [!IMPORTANT]
> Please note that the `lineNumber` option mirrors the behavior of Vite's default class name generation when using preprocessors like Sass, Less, or Stylus. The line number is calculated based on the compiled CSS, where empty lines between selectors and comments are typically removed. This can lead to discrepancies between the line numbers in the source files and the compiled output, potentially resulting in inaccurate line numbers in the generated class names.
>
> Additionally, in Vue files, the line count always starts from the `<style module>` tag, regardless of where it is placed within the file. This means that the line numbers in generated class names will be relative to the position of the `<style module>` tag, not the beginning of the file.

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise [issues on GitHub](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/issues).

Before you contribute to the development of the project, read the [rules](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/blob/main/CONTRIBUTING.md).

Thanks again for your support, it is much appreciated! 🙏

<h2> © License</h2>
<a href="https://github.com/teplostanski/vite-plugin-pretty-module-classnames/blob/main/LICENSE">MIT</a> License © 2024-2025 <a href="https://github.com/teplostanski">teplostanski</a>

<h2> ❤ Fund this project</h2>
<a href="https://donate.teplostanski.dev" target="_blank">donate.teplostanski.dev</a>

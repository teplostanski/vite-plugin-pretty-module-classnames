<div align='center'>
<h1>vite-plugin-pretty-module-classnames</h1>

<img alt="NPM Version" src="https://img.shields.io/npm/v/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="NPM License" src="https://img.shields.io/npm/l/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/teplostanski/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/teplostanski/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/teplostanski/vite-plugin-pretty-module-classnames?style=for-the-badge">
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues-pr/teplostanski/vite-plugin-pretty-module-classnames?style=for-the-badge">


<br>
<br>

<h3>Adds the filename without the <code>-module</code> suffix to the class names of CSS modules.</h3>

<p>
Included in the <a href='https://github.com/vitejs/awesome-vite'>Awesome Vite.js list <img src='https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg' alt='Awesome'></a>
</p>
</div>

## Features

- Framework-agnostic
  - Tested: without frameworks, React, Vue
  - Potentially works with any framework. If you have any problems, write to the [Issue](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/issues)
- Support CommonJS and ES Modules
- Support Vite 2.x

## Why Use This?

As utilizing CSS modules in React, we're accustomed to seeing class names formatted as `SomeComponent__classname_hash`. However, with Vite, the naming convention for modular class names appears slightly different, resembling `__classname_hash` or `SomeComponent-module__classname_hash` the latter occurring if `generateScopedName: '[name]__[local]_[hash:base64:5]'` is specified in vite.config.js. This addition of `-module` post-component name can be cumbersome to work around.

Fortunately, the `vite-plugin-pretty-module-classnames` provides a solution to this issue!

## Usege

```js
// vite.config.js
import PrettyModuleClassnames from "vite-plugin-pretty-module-classnames";

export default defineConfig({
  plugins: [PrettyModuleClassnames()],
});
```

## Contributing

Before you contribute to the development of the project, read the [rules](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/blob/main/CONTRIBUTING.md).

## License [MIT](https://github.com/teplostanski/vite-plugin-pretty-module-classnames/blob/main/LICENSE)

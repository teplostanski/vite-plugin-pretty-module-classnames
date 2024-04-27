# vite-plugin-react-pretty-module-classnames

Adds the filename (component) without the `-module` suffix to the class names of React CSS modules.

## Why Use This?

As utilizing CSS modules in React, we're accustomed to seeing class names formatted as `SomeComponent__classname_hash`. However, with Vite, the naming convention for modular class names appears slightly different, resembling `__classname_hash` or `SomeComponent-module__classname_hash` the latter occurring if `generateScopedName: '[name]__[local]_[hash:base64:5]'` is specified in vite.config.js. This addition of `-module` post-component name can be cumbersome to work around.

Fortunately, the `vite-plugin-react-pretty-module-classnames` provides a solution to this issue!

## Usege

```js
// vite.config.js
import react from '@vitejs/plugin-react';
import PrettyModuleClassnames from 'vite-plugin-react-pretty-module-classnames';

export default defineConfig({
  plugins: [react(), PrettyModuleClassnames()],
});
```

## License [MIT](./LICENSE)

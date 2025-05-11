# Options

The plugin supports flexible configuration through an options object.
Currently, the following parameters are available:

- **`lineNumber`** — adds the line number to the class name (see [Line Number](./line-number.md)).
- **`separator`** — allows you to change the separators between parts of the class name (see [Separators](./separator.md)).

Usage example:

```js
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [
    readableClassnames({
      lineNumber: true,
      separator: {
        beforeClassName: '--'
      }
    })
  ]
})
```
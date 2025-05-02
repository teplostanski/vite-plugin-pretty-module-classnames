# separator

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
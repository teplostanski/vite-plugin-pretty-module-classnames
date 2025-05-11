# separator

The `separator` option allows you to customize the characters used to join parts of the generated class name.  
You can override any of the following fields (all are optional, default values are shown below):

| Field               | Default      | Description                                          |
|---------------------|--------------|------------------------------------------------------|
| `beforeHash`        | `'_'`        | Separator before the hash part                       |
| `beforeClassName`   | `'__'`       | Separator between the file name and class name       |
| `beforeLineNumber`  | `'-'`        | Separator before the line number (if enabled)        |

**Usage example:**
```js
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [
    readableClassnames({
      separator: {
        beforeClassName: '--', // Uses double dash instead of double underscore
      }
    })
  ]
})
```

In this case, class names will look like:
`SomeComponent--classname_abcd1`

> [!TIP]
> You can specify only the fields you want to override; the rest will use the default values.

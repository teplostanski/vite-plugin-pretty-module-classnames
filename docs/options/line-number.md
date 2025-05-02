# lineNumber

The `lineNumber` option is a boolean that, when set to `true`, appends the line number where the CSS class is defined in the source file to the generated class name.

## Example

```js [vite.config.js]
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'

export default defineConfig({
  plugins: [prettyModuleClassnames({ lineNumber: true })],
})
```

With this configuration, if your CSS file contains:


```css [SomeComponent.module.css]
1 .wrapper {
2   /* styles */
3 }
4
5 .container {
6   /* styles */
7 }
```


The generated class names will look like:

- `SomeComponent__wrapper_abcd1-1`
- `SomeComponent__container_abcd2-5`

<br>

> [!IMPORTANT]
> Please note that the `lineNumber` option mirrors the behavior of Vite's default class name generation when using preprocessors like Sass, Less, or Stylus. The line number is calculated based on the compiled CSS, where empty lines between selectors and comments are typically removed. This can lead to discrepancies between the line numbers in the source files and the compiled output, potentially resulting in inaccurate line numbers in the generated class names.
>
> Additionally, in Vue files, the line count always starts from the `<style module>` tag, regardless of where it is placed within the file. This means that the line numbers in generated class names will be relative to the position of the `<style module>` tag, not the beginning of the file.
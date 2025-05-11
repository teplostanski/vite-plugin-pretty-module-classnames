# lineNumber

The `lineNumber` option adds the line number where the class is declared in the source file to the class name.

## Example

```js [vite.config.js]
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [readableClassnames({ lineNumber: true })],
})
```

If your CSS file looks like this:

```css [SomeComponent.module.css]
1 .wrapper {
2   /* styles */
3 }
4
5 .container {
6   /* styles */
7 }
```

The resulting class names will be:

- `SomeComponent__wrapper_abcd1-1`
- `SomeComponent__container_abcd2-5`

<br>

> [!IMPORTANT] Please note:
> The `lineNumber` option works the same way as Vite's standard class name generation when using preprocessors (Sass, Less, Stylus). The line number is taken from the generated CSS, where empty lines and comments are usually removed. Therefore, the line numbers in class names may not match the line numbers in the source files.
>
> In `.vue` files, line counting always starts from the `<style module>` tag, regardless of where it is located in the file. So the line number in the class name will be counted from the beginning of the `<style module>` block, not from the beginning of the entire file.

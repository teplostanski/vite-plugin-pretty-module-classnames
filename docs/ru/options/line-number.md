# lineNumber

Опция `lineNumber` добавляет к имени класса номер строки, на которой он объявлен в исходном файле.

## Пример

```js [vite.config.js]
import readableClassnames from 'vite-plugin-readable-classnames'

export default defineConfig({
  plugins: [readableClassnames({ lineNumber: true })],
})
```

Если ваш CSS-файл выглядит так:

```css [SomeComponent.module.css]
1 .wrapper {
2   /* стили */
3 }
4
5 .container {
6   /* стили */
7 }
```

В итоге имена классов будут такими:

- `SomeComponent__wrapper_abcd1-1`
- `SomeComponent__container_abcd2-5`

<br>

> [!IMPORTANT] Обратите внимание:
> Опция `lineNumber` работает так же, как стандартная генерация имён классов в Vite при использовании препроцессоров (Sass, Less, Stylus). Номер строки берётся из сгенерированного CSS, где обычно удаляются пустые строки и комментарии. Поэтому номера строк в именах классов могут не совпадать с номерами строк в исходных файлах.
>
> В файлах `.vue` отсчёт строк всегда начинается с тега `<style module>`, независимо от того, где он находится в файле. Поэтому номер строки в имени класса будет отсчитываться от начала блока `<style module>`, а не от начала всего файла.

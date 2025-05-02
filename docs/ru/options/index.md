# Опции

Плагин поддерживает гибкую настройку через объект параметров.
В настоящее время доступны следующие параметры:

- **`lineNumber`** — добавляет номер строки к имени класса (см. [Номер строки](./line-number.md)).
- **`separator`** — позволяет изменить разделители между частями имени класса (см. [Разделители](./separator.md)).

Пример использования:

```js
import prettyModuleClassnames from 'vite-plugin-pretty-module-classnames'

export default defineConfig({
  plugins: [
    prettyModuleClassnames({
      lineNumber: true,
      separator: {
        beforeClassName: '--'
      }
    })
  ]
})
```

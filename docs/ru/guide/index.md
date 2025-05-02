# Введение

## 🤔 Зачем это нужно?

Когда мы используем CSS-модули в React, мы привыкли видеть имена классов в формате `SomeComponent__classname_hash`. Однако в Vite соглашение об именовании модульных классов немного отличается: обычно это `__classname_hash` или `SomeComponent-module__classname_hash` (последний вариант появляется, если в vite.config.js указать `generateScopedName: '[name]__[local]_[hash:base64:5]'`). Добавление `-module` после имени компонента может быть неудобным и создавать лишние сложности.

К счастью, плагин `vite-plugin-pretty-module-classnames` решает эту проблему!
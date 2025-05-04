import { type DefaultTheme } from "vitepress";

export function sidebarEn(): DefaultTheme.SidebarItem[] {
  return [
    {
      base: '/guide',
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/' },
        { text: 'Installation', link: '/getting-started' }
      ]
    },
    {
      base: '/options',
      text: 'Configs',
      items: [
        { text: 'Options', link: '/' },
        { text: 'Line Number', link: '/line-number' },
        { text: 'Separators', link: '/separator' }
      ]
    },
  ]
}

export function sidebarRu(): DefaultTheme.SidebarItem[] {
  return [
    {
      base: '/ru/guide',
      text: 'Руководство',
      items: [
        { text: 'Введение', link: '/' },
        { text: 'Установка', link: '/getting-started' }
      ]
    },
    {
      base: '/ru/options',
      text: 'Конфигурация',
      items: [
        { text: 'Опции', link: '/' },
        { text: 'Номер строки', link: '/line-number' },
        { text: 'Разделители', link: '/separator' }
      ]
    },
  ]
}
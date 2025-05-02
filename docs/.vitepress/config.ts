import { defineConfig, useRoute } from 'vitepress'
import pkg from '../../package.json'

const versionNav = [
  { text: `v${pkg.version}`, link: `https://github.com/teplostanski/vite-plugin-pretty-module-classnames/releases/tag/v${pkg.version}` }
];

const enNav = [
  { text: 'Home', link: '/' },
  { text: 'Get Started', link: '/guide/' },
  { text: 'Options', link: '/options/line-number' },
  ...versionNav
];

const ruNav = [
  { text: 'Главная', link: '/ru/' },
  { text: 'Начало', link: '/ru/guide/' },
  { text: 'Опции', link: '/ru/options/line-number' },
  ...versionNav
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  title: "Pretty Module Classnames",
  description: "Make your scoped CSS module class names clear and readable — this plugin automatically adds the module filename and other useful info to class names for easier development.",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    // другие элементы head
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: enNav,
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/guide/' },
              { text: 'Getting Started', link: '/guide/getting-started' }
            ]
          },
          {
            text: 'Options',
            items: [
              { text: 'Line Number', link: '/options/line-number' },
              { text: 'Separator', link: '/options/separator' }
            ]
          },
        ],
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2024-present, Igor Teplostanski',
        },
      }
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: ruNav,
        sidebar: [
          {
            text: 'Руководство',
            items: [
              { text: 'Введение', link: '/ru/guide/' },
              { text: 'Начало', link: '/ru/guide/getting-started' }
            ]
          },
          {
            text: 'Опции',
            items: [
              { text: 'Номер строки', link: '/ru/options/line-number' },
              { text: 'Разделитель', link: '/ru/options/separator' }
            ]
          },
        ],
        outline: {
          label: 'Навигация по странице',
          level: 'deep',
        },
        lastUpdatedText: 'Последнее обновление',
        darkModeSwitchLabel: 'Тема',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Наверх',
        langMenuLabel: 'Выбрать язык',
        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следующая страница',
        },
        footer: {
          message: 'Опубликовано под лицензией MIT.',
          copyright: '© 2024 – настоящее время, Игорь Теплостанский',
        },
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/teplostanski/vite-plugin-pretty-module-classnames' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vite-plugin-pretty-module-classnames' }
    ],
  }
})



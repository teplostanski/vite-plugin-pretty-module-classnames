import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { qrcode } from 'vite-plugin-qrcode';
import { nav, enNav, ruNav } from './theme/configs/nav';
import { sidebarEn, sidebarRu } from './theme/configs/sidebar';
import {translate} from './i18n'

const en = translate('en')
const ru = translate('ru')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  title: "Pretty Module Classnames",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
  locales: {
    root: {
      description: en('description'),
      label: en('label'),
      lang: 'en',
      themeConfig: {
        nav: nav(enNav),
        sidebar: sidebarEn(),
        footer: {
          message: en('footer.message'),
          copyright: en('footer.copyright'),
        },
      }
    },
    ru: {
      description: ru('description'),
      label: ru('label'),
      lang: ru('lang'),
      link: '/ru/',
      themeConfig: {
        nav: nav(ruNav),
        sidebar: sidebarRu(),
        outline: {
          label: ru('outline.label'),
          level: 'deep',
        },
        lastUpdatedText: ru('lastUpdatedText'),
        darkModeSwitchLabel: ru('darkModeSwitchLabel'),
        sidebarMenuLabel: ru('sidebarMenuLabel'),
        returnToTopLabel: ru('returnToTopLabel'),
        langMenuLabel: ru('langMenuLabel'),
        docFooter: {
          prev: ru('docFooter.prev'),
          next: ru('docFooter.next'),
        },
        footer: {
          message: ru('footer.message'),
          copyright: ru('footer.copyright'),
        },
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/teplostanski/vite-plugin-pretty-module-classnames' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vite-plugin-pretty-module-classnames' },
      { icon: 'awesomelists', link: 'https://github.com/vitejs/awesome-vite' }
    ],
  },
  
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin(),
      qrcode()
    ],
  }
})



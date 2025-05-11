import { type DefaultTheme } from "vitepress";
import {translate} from '../../i18n'

const en = translate('en')
const ru = translate('ru')

export function sidebarEn(): DefaultTheme.SidebarItem[] {
  return [
    {
      base: '/guide',
      text: en('sidebar.titles.guide'),
      items: [
        { text: en('sidebar.items.intro'), link: '/' },
        { text: en('sidebar.items.install'), link: '/getting-started' }
      ]
    },
    {
      base: '/options',
      text: en('sidebar.titles.configs'),
      items: [
        { text: en('sidebar.items.options'), link: '/' },
        { text: en('sidebar.items.lineNumber'), link: '/line-number' },
        { text: en('sidebar.items.separator'), link: '/separator' }
      ]
    },
  ]
}

export function sidebarRu(): DefaultTheme.SidebarItem[] {
  return [
    {
      base: '/ru/guide',
      text: ru('sidebar.titles.guide'),
      items: [
        { text: ru('sidebar.items.intro'), link: '/' },
        { text: ru('sidebar.items.install'), link: '/getting-started' }
      ]
    },
    {
      base: '/ru/options',
      text: ru('sidebar.titles.configs'),
      items: [
        { text: ru('sidebar.items.options'), link: '/' },
        { text: ru('sidebar.items.lineNumber'), link: '/line-number' },
        { text: ru('sidebar.items.separator'), link: '/separator' }
      ]
    },
  ]
}
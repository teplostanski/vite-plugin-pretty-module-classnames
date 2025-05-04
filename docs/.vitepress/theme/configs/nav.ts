import { type DefaultTheme } from 'vitepress'
import pkg from '../../../../package.json'

const navVersion = [
  {
    text: `v${pkg.version}`,
    link: `https://github.com/teplostanski/vite-plugin-pretty-module-classnames/releases/tag/v${pkg.version}`,
  },
]

export const enNav = [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
  { text: 'Options', link: '/options/', activeMatch: '/options/' },
]

export const ruNav = [
  { text: 'Главная', link: '/ru/' },
  { text: 'Руководство', link: '/ru/guide/', activeMatch: '/ru/guide/' },
  { text: 'Опции', link: '/ru/options/', activeMatch: '/ru/options/' },
]

export function nav(
  translateMap: {
    text: string
    link: string
  }[],
): DefaultTheme.Config['nav'] {
  return [
    ...translateMap,
    ...navVersion,
  ]
}

import { type DefaultTheme } from 'vitepress'
import pkg from '../../../../package.json'
import {translate} from '../../i18n'

const en = translate('en')
const ru = translate('ru')

const navVersion = [
  {
    text: `v${pkg.version}`,
    link: `https://github.com/teplostanski/vite-plugin-pretty-module-classnames/releases/tag/v${pkg.version}`,
  },
]

export const enNav = [
  { text: en('nav.home'), link: '/' },
  { text: en('nav.guide'), link: '/guide/', activeMatch: '/guide/' },
  { text: en('nav.options'), link: '/options/', activeMatch: '/options/' },
]

export const ruNav = [
  { text: ru('nav.home'), link: '/ru/' },
  { text: ru('nav.guide'), link: '/ru/guide/', activeMatch: '/ru/guide/' },
  { text: ru('nav.options'), link: '/ru/options/', activeMatch: '/ru/options/' },
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

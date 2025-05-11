export function createTranslate(messages: any) {
  return function translate(lang: string) {
    return function(key: string): string {
      const keys = key.split('.')
      return keys.reduce((map, item) => map && map[item], messages[lang])
    }
  }
}


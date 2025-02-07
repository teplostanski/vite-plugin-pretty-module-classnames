import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sanitizeModuleClassname } from './index.js'
import PrettyModuleClassnames from './index.js'
import type { UserConfig } from 'vite'

describe('sanitizeModuleClassname', () => {
  it('должен генерировать корректное имя класса с номером строки', () => {
    const result = sanitizeModuleClassname('button', 'src/components/Button.vue', 42)
    expect(result).toMatch(/^Button__button_[a-z0-9]+_42$/)
  })

  it('должен генерировать корректное имя класса без номера строки', () => {
    const result = sanitizeModuleClassname('header', 'src/components/Header.vue')
    expect(result).toMatch(/^Header__header_[a-z0-9]+$/)
  })

  it('должен корректно обрабатывать файлы с расширением .module', () => {
    const result = sanitizeModuleClassname('container', 'src/styles/Layout.module.css')
    expect(result).toMatch(/^Layout__container_[a-z0-9]+$/)
  })

  it('должен выбрасывать ошибку при undefined filename', () => {
    expect(() => {
      sanitizeModuleClassname('test', undefined)
    }).toThrow('The filename must be string and cannot be undefined.')
  })

  it('должен выбрасывать ошибку при некорректном пути файла', () => {
    expect(() => {
      sanitizeModuleClassname('test', '/')
    }).toThrow('Filename must include a valid file name.')
  })

  it('должен генерировать одинаковый хеш для одинаковых входных данных', () => {
    const result1 = sanitizeModuleClassname('button', 'src/components/Button.vue')
    const result2 = sanitizeModuleClassname('button', 'src/components/Button.vue')
    expect(result1).toBe(result2)
  })

  it('должен генерировать разные хеши для разных путей', () => {
    const result1 = sanitizeModuleClassname('button', 'src/components/Button.vue')
    const result2 = sanitizeModuleClassname('button', 'src/elements/Button.vue')
    expect(result1).not.toBe(result2)
  })
})

describe('PrettyModuleClassnames', () => {
  let consoleSpy: any
  let originalVitest: string | undefined
  
  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    originalVitest = process.env.VITEST
    delete process.env.VITEST
  })

  afterEach(() => {
    process.env.VITEST = originalVitest
    consoleSpy.mockRestore()
    vi.clearAllMocks()
  })

  function callPluginConfig(plugin: any, config: UserConfig) {
    return plugin.config(config, { command: 'serve', mode: 'development' })
  }

  it('должен создать плагин с корректным именем', () => {
    const plugin = PrettyModuleClassnames()
    expect(plugin.name).toBe('vite-plugin-pretty-module-classnames')
  })

  it('должен вернуть пустой конфиг при запуске в vitest', () => {
    process.env.VITEST = 'true'
    const plugin = PrettyModuleClassnames()
    const result = callPluginConfig(plugin, {})
    expect(result).toEqual({})
  })

  it('должен предупреждать если generateScopedName уже установлен', () => {
    const plugin = PrettyModuleClassnames()
    const config: UserConfig = {
      css: {
        modules: {
          generateScopedName: (name: string) => `test_${name}`
        }
      }
    }
    
    callPluginConfig(plugin, config)
    expect(consoleSpy).toHaveBeenCalledWith(
      '[vite-plugin-pretty-module-classnames]:: The \'generateScopedName\' configuration has already been set. Your vite.config configuration or other plugins might be attempting to override this setting, which could affect the proper functioning of vite-plugin-pretty-module-classnames.'
    )
  })

  it('должен корректно настраивать generateScopedName без lineNumber', () => {
    const plugin = PrettyModuleClassnames()
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName
    
    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')
    
    if (generateScopedName) {
      const name = generateScopedName('button', 'src/Button.vue', '.button { color: red; }')
      expect(name).toMatch(/^Button__button_[a-z0-9]+$/)
    }
  })

  it('должен добавлять номер строки когда включена опция lineNumber', () => {
    const plugin = PrettyModuleClassnames({ lineNumber: true })
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName
    
    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')
    
    if (generateScopedName) {
      const css = `
        .other { color: blue; }
        .button { color: red; }
        .more { color: green; }
      `
      const name = generateScopedName('button', 'src/Button.vue', css)
      expect(name).toMatch(/^Button__button_[a-z0-9]+_3$/)
    }
  })

  it('должен сохранять существующие настройки css', () => {
    const plugin = PrettyModuleClassnames()
    const existingConfig: UserConfig = {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "./vars.scss";'
          }
        }
      }
    }
    
    const result = callPluginConfig(plugin, existingConfig)
    expect(result.css?.preprocessorOptions?.scss?.additionalData)
      .toBe('@import "./vars.scss";')
  })

  it('должен корректно обрабатывать отсутствие css.modules в конфиге', () => {
    const plugin = PrettyModuleClassnames()
    const result = callPluginConfig(plugin, { css: {} })
    const generateScopedName = result.css?.modules?.generateScopedName
    
    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')
  })
}) 
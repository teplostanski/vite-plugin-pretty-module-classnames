import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import readableClassnames from '../src/index.js'
import type { UserConfig } from 'vite'
import { WARNING_MSG_GENERATE_SCOPED_NAME } from '../src/constants.js'

describe('readableClassnames', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function callPluginConfig(plugin: any, config: UserConfig) {
    return plugin.config(config, { command: 'serve', mode: 'development' })
  }

  it('should create plugin with correct name', () => {
    const plugin = readableClassnames()
    expect(plugin.name).toBe('vite-plugin-readable-classnames')
  })

  it('should return empty config when running in vitest', () => {
    process.env.VITEST = 'true'
    const plugin = readableClassnames()
    const result = callPluginConfig(plugin, {})
    expect(result).toEqual({})
  })

  it('should warn when generateScopedName is already set', () => {
    const plugin = readableClassnames()
    const config: UserConfig = {
      css: {
        modules: {
          generateScopedName: (name: string) => `test_${name}`,
        },
      },
    }

    callPluginConfig(plugin, config)
    expect(consoleSpy).toHaveBeenCalledWith(WARNING_MSG_GENERATE_SCOPED_NAME)
  })

  it('should configure generateScopedName correctly without lineNumber', () => {
    const plugin = readableClassnames()
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')

    if (generateScopedName) {
      const name = generateScopedName(
        'button',
        'src/Button.vue',
        '.button { color: red; }',
      )
      expect(name).toMatch(/^Button__button_[a-z0-9]+$/)
    }
  })

  it('should use custom beforeClassName separator', () => {
    const separator = { beforeClassName: '--' }
    const plugin = readableClassnames({ separator })
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')

    if (generateScopedName) {
      const name = generateScopedName(
        'button',
        'src/Button.vue',
        '.button { color: red; }',
      )
      expect(name).toMatch(/^Button--button_[a-z0-9]+$/)
    }
  })

  it('should use custom beforeHash separator', () => {
    const separator = { beforeHash: '--' }
    const plugin = readableClassnames({ separator })
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')

    if (generateScopedName) {
      const name = generateScopedName(
        'button',
        'src/Button.vue',
        '.button { color: red; }',
      )
      expect(name).toMatch(/^Button__button--[a-z0-9]+$/)
    }
  })

  it('should use custom beforeLineNumber separator', () => {
    const separator = { beforeLineNumber: '--' }
    const plugin = readableClassnames({ separator, lineNumber: true })
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')

    if (generateScopedName) {
      const name = generateScopedName(
        'button',
        'src/Button.vue',
        '.button { color: red; }',
      )
      expect(name).toMatch(/^Button__button_[a-z0-9]+--1$/)
    }
  })

  it('should add line number when lineNumber option is enabled', () => {
    const plugin = readableClassnames({ lineNumber: true })
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
      expect(name).toMatch(/^Button__button_[a-z0-9]+-3$/)
    }
  })

  it('should preserve existing css settings', () => {
    const plugin = readableClassnames()
    const existingConfig: UserConfig = {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "./vars.scss";',
          },
        },
      },
    }

    const result = callPluginConfig(plugin, existingConfig)
    expect(result.css?.preprocessorOptions?.scss?.additionalData).toBe(
      '@import "./vars.scss";',
    )
  })

  it('should handle missing css.modules in config', () => {
    const plugin = readableClassnames()
    const result = callPluginConfig(plugin, { css: {} })
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')
  })
})

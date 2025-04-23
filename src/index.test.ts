import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PrettyModuleClassnames from './index.js'
import type { UserConfig } from 'vite'
import { GENERATE_SCOPED_NAME_WARNING } from './constants.js'
import { sanitizeModuleClassname } from './utils.js'

describe('sanitizeModuleClassname', () => {
  it('should generate correct class name with line number', () => {
    const result = sanitizeModuleClassname('button', 'src/components/Button.vue', 42)
    expect(result).toMatch(/^Button__button_[a-z0-9]+_42$/)
  })

  it('should generate correct class name without line number', () => {
    const result = sanitizeModuleClassname('header', 'src/components/Header.vue')
    expect(result).toMatch(/^Header__header_[a-z0-9]+$/)
  })

  it('should handle files with .module extension correctly', () => {
    const result = sanitizeModuleClassname('container', 'src/styles/Layout.module.css')
    expect(result).toMatch(/^Layout__container_[a-z0-9]+$/)
  })

  it('should throw error when filename is undefined', () => {
    expect(() => {
      sanitizeModuleClassname('test', undefined)
    }).toThrow('The filename must be string and cannot be undefined.')
  })

  it('should throw error for invalid file path', () => {
    expect(() => {
      sanitizeModuleClassname('test', '/')
    }).toThrow('Filename must include a valid file name.')
  })

  it('should generate same hash for same input', () => {
    const result1 = sanitizeModuleClassname('button', 'src/components/Button.vue')
    const result2 = sanitizeModuleClassname('button', 'src/components/Button.vue')
    expect(result1).toBe(result2)
  })

  it('should generate different hashes for different paths', () => {
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

  it('should create plugin with correct name', () => {
    const plugin = PrettyModuleClassnames()
    expect(plugin.name).toBe('vite-plugin-pretty-module-classnames')
  })

  it('should return empty config when running in vitest', () => {
    process.env.VITEST = 'true'
    const plugin = PrettyModuleClassnames()
    const result = callPluginConfig(plugin, {})
    expect(result).toEqual({})
  })

  it('should warn when generateScopedName is already set', () => {
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
      GENERATE_SCOPED_NAME_WARNING
    )
  })

  it('should configure generateScopedName correctly without lineNumber', () => {
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

  it('should add line number when lineNumber option is enabled', () => {
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

  it('should preserve existing css settings', () => {
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

  it('should handle missing css.modules in config', () => {
    const plugin = PrettyModuleClassnames()
    const result = callPluginConfig(plugin, { css: {} })
    const generateScopedName = result.css?.modules?.generateScopedName
    
    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')
  })
}) 
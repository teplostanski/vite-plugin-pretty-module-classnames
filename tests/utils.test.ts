import { describe, it, expect } from 'vitest'
import { defaultOptions } from '../src/constants.js'
import { sanitizeModuleClassname } from '../src/utils.js'

describe('sanitizeModuleClassname', () => {
  it('should generate correct class name with line number', () => {
    const result = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
      42,
    )
    expect(result).toMatch(/^Button__button_[a-z0-9]+-42$/)
  })

  it('should generate correct class name without line number', () => {
    const result = sanitizeModuleClassname(
      'header',
      'src/components/Header.vue',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^Header__header_[a-z0-9]+$/)
  })

  it('should handle files with .module extension correctly', () => {
    const result = sanitizeModuleClassname(
      'container',
      'src/styles/Layout.module.css',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^Layout__container_[a-z0-9]+$/)
  })

  it('should throw error when filename is undefined', () => {
    expect(() => {
      sanitizeModuleClassname('test', undefined, {
        ...defaultOptions.separator,
      })
    }).toThrow('The filename must be string and cannot be undefined.')
  })

  it('should throw error for invalid file path', () => {
    expect(() => {
      sanitizeModuleClassname('test', '/', { ...defaultOptions.separator })
    }).toThrow('Filename must include a valid file name.')
  })

  it('should generate same hash for same input', () => {
    const result1 = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
    )
    const result2 = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
    )
    expect(result1).toBe(result2)
  })

  it('should generate different hashes for different paths', () => {
    const result1 = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
    )
    const result2 = sanitizeModuleClassname(
      'button',
      'src/elements/Button.vue',
      { ...defaultOptions.separator },
    )
    expect(result1).not.toBe(result2)
  })
})

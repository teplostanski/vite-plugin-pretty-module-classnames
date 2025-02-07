import { describe, it, expect } from 'vitest'
import { sanitizeModuleClassname } from './index.js'

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
import { createHash } from 'crypto'
import type { DeepPartial } from './types'

function getHash(input: string): string {
  return createHash('sha256').update(input).digest('hex').slice(0, 5)
}

export function getLineNumber(cssData: string, className: string): number {
  const lines = cssData.split('\n')
  const match = new RegExp(`\\.${className}\\b`)
  return lines.findIndex((line) => match.test(line)) + 1
}

export function deepMerge<T>(
  defaultOptions: T,
  userOptions: DeepPartial<T>,
): T {
  const result = { ...defaultOptions }

  for (const key in userOptions) {
    const value = userOptions[key]

    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = deepMerge(defaultOptions[key], value) as T[typeof key]
    } else if (value !== undefined) {
      result[key] = value as T[typeof key]
    }
  }

  return result
}

/**
 * Generates a unique class name for CSS modules based on the file name and the specified class name.
 * The file name is processed to remove specific parts such as ".module" and file extensions.
 * If `lineNumber` is provided, it's added to the generated class name.
 *
 * @param name - The name of the CSS class that will be part of the generated unique name.
 * @param filename is the full path to the style file, which can be undefined. If the parameter is undefined, the function throws an exception.
 * @param lineNumber is the line number where the CSS class is defined, optional.
 * @returns A string with a unique class name, including a sanitized file name, the original class name, a randomly generated hash, and optionally the line number.
 * @throws Error if `filename` is not provided or is not a string.
 */
export function sanitizeModuleClassname(
  name: string,
  filename: string | undefined,
  separator: {
    beforeHash: string
    beforeClassName: string
    beforeLineNumber: string
  },
  lineNumber?: number,
): string {
  if (typeof filename !== 'string') {
    throw new Error('The filename must be string and cannot be undefined.')
  }

  const parts = filename.split('?')[0].split('/')
  const lastSegment = parts.pop()

  if (!lastSegment) {
    throw new Error('Filename must include a valid file name.')
  }

  const baseFilename = lastSegment.replace(/(\.vue|\.module)?(\.\w+)$/, '')

  const pathHash = getHash(parts.join('/'))
  const classname = `${baseFilename}${separator.beforeClassName}${name}`
  const hash = `${separator.beforeHash}${getHash(`${pathHash}-${classname}`)}`
  const lineInfo =
    lineNumber !== undefined ? `${separator.beforeLineNumber}${lineNumber}` : ''

  return `${classname}${hash}${lineInfo}`
}

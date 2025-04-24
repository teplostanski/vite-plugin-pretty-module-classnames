import { createHash } from 'crypto'

function getHash(input: string): string {
  return createHash('sha256').update(input).digest('hex').slice(0, 5)
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
  const classname = `${baseFilename}__${name}`
  const hash = getHash(`${pathHash}-${classname}`)
  const lineInfo = lineNumber !== undefined ? `_${lineNumber}` : ''

  return `${classname}_${hash}${lineInfo}`
}

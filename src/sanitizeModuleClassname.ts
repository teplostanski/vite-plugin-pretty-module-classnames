import { getHash } from "./getHash";

/**
 * Generates a unique class name for CSS modules based on the file name and the specified class name.
 * The file name is processed to remove specific parts such as ".module" and file extensions.
 *
 * @param name - The name of the CSS class that will be part of the generated unique name.
 * @param filename is the full path to the style file, which can be undefined. If the parameter is undefined, the function throws an exception.
 * @returns A string with a unique class name, including a sanitized file name, the original class name, and a randomly generated hash.
 * @throws Error if `filename` is not provided or is not a string.
 */
export function sanitizeModuleClassname(
  name: string,
  filename: string | undefined
): string {
  if (typeof filename !== 'string') {
    throw new Error('The filename must be string and cannot be undefined.');
  }

  const sanitizedName =
    filename
      .split('/')
      .pop()
      ?.replace(/\b.module\b/, '')
      ?.replace(/\.\w+$/, '') ?? '';

  const classname = `${sanitizedName}__${name}`;
  const hash = getHash(`${classname}`);

  return `${classname}_${hash}`;
}

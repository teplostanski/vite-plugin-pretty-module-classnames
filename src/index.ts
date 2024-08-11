import type { Plugin, UserConfig } from "vite";
import { createHash } from "crypto";
import { ERROR_FILENAME_UNDEFINED, ERROR_FILENAME_INVALID, ERROR_GENERATE_SCOPED_NAME_CONFLICT } from "./constats.js";

interface PrettyModuleClassnamesOptions {
  lineNumber?: boolean;
  hashLength?: number;
}

function getHash(input: string, length: number): string {
  return createHash("sha256").update(input).digest("hex").slice(0, length);
}

/**
 * Computes the line number where the CSS class is defined.
 *
 * @param name - The name of the CSS class.
 * @param css - The CSS code as a string.
 * @returns The line number where the CSS class is found, or undefined if not found.
 */
function computeLineNumber(name: string, css: string): number | undefined {
  const lines = css.split("\n");
  const match = new RegExp(`\\.${name}\\b`);
  const lineNumber = lines.findIndex((line) => match.test(line));
  return lineNumber !== -1 ? lineNumber + 1 : undefined;
}

/**
 * Generates a unique class name for CSS modules based on the file name and the specified class name.
 * The file name is processed to remove specific parts such as ".module" and file extensions.
 * If `lineNumber` is provided, it's added to the generated class name.
 *
 * @param name - The name of the CSS class that will be part of the generated unique name.
 * @param filename - The full path to the style file, which can be undefined. If the parameter is undefined, the function throws an exception.
 * @param lineNumber - The line number where the CSS class is defined, optional.
 * @param hashLength - The length of the hash to be generated, default is 5.
 * @returns A string with a unique class name, including a sanitized file name, the original class name, a randomly generated hash, and optionally the line number.
 * @throws Error if `filename` is not provided or is not a string.
 */
function sanitizeModuleClassname(
  name: string,
  filename: string | undefined,
  lineNumber?: number,
  hashLength: number = 5
): string {
  if (typeof filename !== "string") {
    throw new Error(ERROR_FILENAME_UNDEFINED);
  }

  const sanitizedFilename = filename.split("?")[0].split("/").pop();
  if (!sanitizedFilename) {
    throw new Error(ERROR_FILENAME_INVALID);
  }

  const baseFilename = sanitizedFilename.replace(
    /(\.vue|\.module)?(\.\w+)$/,
    ""
  );
  const classname = `${baseFilename}__${name}`;
  const hash = getHash(classname, hashLength);
  const lineInfo = lineNumber !== undefined ? `-${lineNumber}` : "";

  return `${classname}_${hash}${lineInfo}`;
}

/**
 * Adds the filename without the `-module` suffix to the class names of CSS modules.
 * It customizes the generateScopedName function to use a sanitized version of the filename, class name, and a hash.
 *
 * @prop {Object} `options` - Plugin options.
 * @prop {boolean} `options.lineNumber` - Whether to include the line number in the generated class name. @default false
 * @prop {number} `options.hashLength` - Length of the hash to be included in the generated class name. The minimum value is 5. @default 5
 * @returns {Plugin} A Vite plugin object with a custom configuration for CSS modules.
 */

export default function PrettyModuleClassnames(
  options: PrettyModuleClassnamesOptions = {}
): Plugin {
  const { lineNumber = false, hashLength = 5 } = options;
  const finalHashLength = Math.max(hashLength, 5);

  return {
    name: "vite-plugin-pretty-module-classnames",
    /**
     * Modifies the Vite configuration object to include custom settings for CSS module class name generation.
     * It checks if generateScopedName is already set by the user and throws an error if so.
     * If not set, it applies a custom generateScopedName function.
     *
     * @param {UserConfig} config - The original Vite configuration provided by the user.
     * @returns {UserConfig} A modified Vite configuration object with custom settings for CSS module class name generation.
     * @throws {Error} Throws an error if generateScopedName is already defined in the user's configuration.
     */
    config(config: UserConfig): UserConfig {
      const cssModulesOptions = config.css?.modules;

      if (
        typeof cssModulesOptions === "object" &&
        cssModulesOptions.generateScopedName
      ) {
        throw new Error(ERROR_GENERATE_SCOPED_NAME_CONFLICT);
      }

      // If generateScopedName is not set, apply the plugin's configuration
      const newCssConfig = {
        ...config.css,
        modules: {
          ...cssModulesOptions,
          generateScopedName: (name: string, filename: string, css: string) => {
            const computedLineNumber = lineNumber
              ? computeLineNumber(name, css)
              : undefined;
            return sanitizeModuleClassname(
              name,
              filename,
              computedLineNumber,
              finalHashLength
            );
          },
        },
      };

      return {
        ...config,
        css: newCssConfig,
      };
    },
  };
}

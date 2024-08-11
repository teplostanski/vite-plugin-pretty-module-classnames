import type { Plugin, UserConfig } from "vite";
import { createHash } from "crypto";

function getHash(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 5);
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
function sanitizeModuleClassname(
  name: string,
  filename: string | undefined,
  lineNumber?: number
): string {
  if (typeof filename !== "string") {
    throw new Error("The filename must be string and cannot be undefined.");
  }

  const parts = filename.split("?")[0].split("/");
  const lastSegment = parts.pop();

  if (!lastSegment) {
    throw new Error("Filename must include a valid file name.");
  }

  const baseFilename = lastSegment.replace(/(\.vue|\.module)?(\.\w+)$/, "");

  const classname = `${baseFilename}__${name}`;
  const hash = getHash(`${classname}`);
  const lineInfo = lineNumber !== undefined ? `-${lineNumber}` : "";

  return `${classname}_${hash}${lineInfo}`;
}

/**
 * Adds the filename without the `-module` suffix to the class names of CSS modules.
 * It customizes the generateScopedName function to use a sanitized version of the filename, class name, and a hash.
 * If the `lineNumber` option is set to true, the line number is added to the generated class name.
 *
 * @prop {Object} `options` - Plugin options.
 * @prop {boolean} `options.lineNumber` - Whether to include the line number in the generated class name. @default false
 * @returns {Plugin} A Vite plugin object with a custom configuration for CSS modules.
 */
export default function PrettyModuleClassnames(options: { lineNumber?: boolean } = {}): Plugin {
  return {
    name: "vite-plugin-pretty-module-classnames",
    /**
     * Modifies the Vite configuration object to include custom settings for CSS module class name generation.
     * It checks if generateScopedName is already set by the user and throws an error if so.
     * If not set, it applies a custom generateScopedName function.
     *
     * @param {UserConfig} config - The original Vite configuration provided by the user.
     * @throws {Error} Throws an error if generateScopedName is already defined in the user's configuration.
     * @returns {UserConfig} A modified Vite configuration object with custom settings for CSS module class name generation.
     */
    config(config: UserConfig): UserConfig {
      if (
        typeof config.css?.modules === "object" &&
        config.css.modules.generateScopedName
      ) {
        throw new Error(
          "Custom settings for generateScopedName are already set. The vite-plugin-pretty-module-classnames plugin cannot be used with other generateScopedName settings."
        );
      }

      // If generateScopedName is not set, apply the plugin's configuration
      const newCssConfig = {
        ...config.css,
        modules: {
          ...config.css?.modules,
          generateScopedName: (name: string, filename: string, css: string) => {
            let lineNumber: number | undefined;
            if (options.lineNumber) {
              const lines = css.split('\n');
              const match = new RegExp(`\\.${name}\\b`);
              lineNumber = lines.findIndex(line => match.test(line)) + 1;
            }
            return sanitizeModuleClassname(name, filename, lineNumber);
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

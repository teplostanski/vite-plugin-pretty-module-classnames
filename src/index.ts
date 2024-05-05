import type { Plugin, UserConfig } from "vite";
import { createHash } from "crypto";

function getHash(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 5);
}

/**
 * Generates a unique class name for CSS modules based on the file name and the specified class name.
 * The file name is processed to remove specific parts such as ".module" and file extensions.
 *
 * @param name - The name of the CSS class that will be part of the generated unique name.
 * @param filename is the full path to the style file, which can be undefined. If the parameter is undefined, the function throws an exception.
 * @returns A string with a unique class name, including a sanitized file name, the original class name, and a randomly generated hash.
 * @throws Error if `filename` is not provided or is not a string.
 */
function sanitizeModuleClassname(
  name: string,
  filename: string | undefined
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

  return `${classname}_${hash}`;
}

/**
 * Adds the filename without the -module suffix to the class names of CSS modules.
 * It customizes the generateScopedName function to use a sanitized version of the filename, class name, and a hash.
 *
 * @returns {Plugin} A Vite plugin object with a custom configuration for CSS modules.
 */
export default function PrettyModuleClassnames(): Plugin {
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
    config(config: UserConfig, {}) {
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
          generateScopedName: sanitizeModuleClassname,
        },
      };

      return {
        ...config,
        css: newCssConfig,
      };
    },
  };
}

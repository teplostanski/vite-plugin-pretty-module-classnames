import type { Plugin, UserConfig } from 'vite';
import { sanitizeModuleClassname } from './sanitizeModuleClassname';

/**
 * Adds the filename (component) without the -module suffix to the class names of React CSS modules.
 * It customizes the generateScopedName function to use a sanitized version of the filename, class name, and a hash.
 *
 * @returns {Plugin} A Vite plugin object with a custom configuration for CSS modules.
 */
export function PrettyModuleClassnames(): Plugin {
  return {
    name: 'vite-plugin-react-pretty-module-classnames',
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
        typeof config.css?.modules === 'object' &&
        config.css.modules.generateScopedName
      ) {
        throw new Error(
          'Custom settings for generateScopedName are already set. The vite-plugin-react-pretty-module-classnames plugin cannot be used with other generateScopedName settings.',
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

export default PrettyModuleClassnames;


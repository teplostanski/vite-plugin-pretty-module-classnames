import type { Plugin, UserConfig } from 'vite'
import { defaultOptions, WARNING_MSG_GENERATE_SCOPED_NAME } from './constants'
import { deepMerge, getLineNumber, sanitizeModuleClassname } from './utils'
import type { DeepPartial, Options } from './types'

/**
 * Adds the filename without the `-module` suffix to the class names of CSS modules.
 * It customizes the generateScopedName function to use a sanitized version of the filename, class name, and a hash.
 * If the `lineNumber` option is set to true, the line number is added to the generated class name.
 *
 * @prop {Object} `options` - Plugin options.
 * @prop {boolean} `options.lineNumber` - Whether to include the line number in the generated class name. @default false
 * @prop {string} `options.separator.beforeHash` - @default '_'
 * @prop {string} `options.separator.beforeClassName` - @default '__'
 * @prop {string} `options.separator.beforeLineNumber` - @default '-'
 * @returns {Plugin} A Vite plugin object with a custom configuration for CSS modules.
 */
export default function readableClassnames(
  userOptions: DeepPartial<Options> = {},
): Plugin {
  return {
    name: 'vite-plugin-readable-classnames',
    config(config: UserConfig): UserConfig {
      const options = deepMerge(defaultOptions, userOptions)
      const cssModules = config.css?.modules

      // Abort plugin execution when running vitest to avoid errors and warnings.
      // See issue: https://github.com/teplostanski/vite-plugin-readable-classnames/issues/57.
      if (process.env.VITEST) {
        return {} as UserConfig
      }

      if (
        cssModules &&
        'generateScopedName' in cssModules &&
        cssModules.generateScopedName
      ) {
        console.warn(WARNING_MSG_GENERATE_SCOPED_NAME)
      }

      const newCssConfig = {
        ...config.css,
        modules: {
          ...cssModules,
          generateScopedName: (name: string, filename: string, css: string) => {
            const lineNumber = options.lineNumber
              ? getLineNumber(css, name)
              : undefined
            return sanitizeModuleClassname(
              name,
              filename,
              options.separator,
              lineNumber,
            )
          },
        },
      }

      return {
        ...config,
        css: newCssConfig,
      }
    },
  }
}

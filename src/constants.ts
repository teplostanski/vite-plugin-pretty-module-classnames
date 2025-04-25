import type { Options } from './types'

export const GENERATE_SCOPED_NAME_WARNING =
  "[vite-plugin-pretty-module-classnames]:: The 'generateScopedName' configuration has already been set. Your vite.config configuration or other plugins might be attempting to override this setting, which could affect the proper functioning of vite-plugin-pretty-module-classnames."

export const defaultOptions: Options = {
  lineNumber: false,
  separator: {
    beforeHash: '_',
    beforeClassName: '__',
    beforeLineNumber: '-',
  },
}

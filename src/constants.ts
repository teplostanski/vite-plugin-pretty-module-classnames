import type { Options } from './types'

export const WARNING_MSG_GENERATE_SCOPED_NAME =
  "[vite-plugin-readable-classnames]:: The 'generateScopedName' configuration has already been set. Your vite.config configuration or other plugins might be attempting to override this setting, which could affect the proper functioning of vite-plugin-readable-classnames."

export const ERROR_MSG_INVALID_TYPE =
  'The filename must be string and cannot be undefined.'
export const ERROR_MSG_INVALID_NAME = 'Filename must include a valid file name.'

export const defaultOptions: Options = {
  lineNumber: false,
  separator: {
    beforeHash: '_',
    beforeClassName: '__',
    beforeLineNumber: '-',
  },
}

import { homedir } from 'node:os'
import { join } from 'node:path'
import { cwd } from '../utils'

export const DEFAULT_HOME_PATH = homedir()

export const DEFAULT_ASSETS_PATH = join(cwd, './src/assets')

export const DEFAULT_PUBLIC_PATH = join(cwd, './public')

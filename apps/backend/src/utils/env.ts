import cluster from 'node:cluster'
import { config } from 'dotenv'
import dotenvExpand from 'dotenv-expand'

export const isMainCluster =
  process.env.NODE_APP_INSTANCE &&
  Number.parseInt(process.env.NODE_APP_INSTANCE) === 0 // pm2 env: NODE_APP_INSTANCE

export const isMainProcess = cluster.isPrimary || isMainCluster

export const isDev = process.env.NODE_ENV === 'development'

export const isTest = !!process.env.TEST

export const cwd = process.cwd() // /nest-zero-to-hero/apps/backend

export const envFilePath = `.env${
  process.env.NODE_ENV === 'development' ? '' : `.${process.env.NODE_ENV}`
}`

export function loadEnvFile(path: string) {
  return dotenvExpand.expand(config({ path }))
}

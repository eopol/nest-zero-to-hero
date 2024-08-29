import cluster from 'node:cluster'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { fastifyApp } from './framework/adapters'
import { AppModule } from './app.module'
import { name } from '../package.json'
import { isMainProcess } from './utils'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true,
      snapshot: true,
    },
  )

  await app.listen(3000, '0.0.0.0', async () => {
    const url = await app.getUrl()
    const pid = process.pid
    const prefix = cluster.isPrimary ? 'P' : 'W'

    if (!isMainProcess) return

    const logger = new Logger(`🚀 ${name} 🚀`)
    logger.log(`[${prefix + pid}] Server running on ${url}`)

    // logger.log(`[${prefix + pid}] Trpc: ${url}/api/trpc-playground`);
    // if (isDev) logger.log(`[${prefix + pid}] OpenAPI: ${url}/api-docs`);
  })
}
bootstrap()

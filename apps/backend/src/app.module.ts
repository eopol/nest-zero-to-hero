/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Recordable } from '@nest-zero-to-hero/utils'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envFilePath, loadEnvFile } from './utils'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configSchema } from './configs'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => loadEnvFile(envFilePath)],
      validate: (config: Recordable) => {
        const result = configSchema.parse(config)
        console.log('🚀 ~ result:', result)
        return result
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

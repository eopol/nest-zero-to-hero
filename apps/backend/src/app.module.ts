/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envFilePath, loadEnvFile } from './utils'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigSchema, configSchema } from './configs'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => loadEnvFile(envFilePath)],
      validate: (config: ConfigSchema) => configSchema.parse(config),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

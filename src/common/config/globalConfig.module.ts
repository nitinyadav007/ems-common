import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        SECRET: Joi.string(),
        DATABASE_URL: Joi.string(),
      }),
      isGlobal: true,
    }),
  ],
})
export class GlobalConfigModule {}

import * as bodyParser from 'body-parser';
import { ValidationError } from 'class-validator';
import 'reflect-metadata';

import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './context/shared/infrastructure/modules/app.module';
import { ResponseInterceptor } from './app/interceptors/response.interceptor';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        const result = errors.map(
          ({ constraints }) => constraints![Object.keys(constraints!)[0]],
        );
        throw new HttpException('Invalid data', 400, { cause: result });
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  const kafkaServiceOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: (process.env.KAFKA_BROKERS as string).split(','),
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'ms-group-neg',
      },
    },
  };

  app.connectMicroservice(kafkaServiceOptions);

  app.use(bodyParser.json({ limit: '250mb' }));
  app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));
  app.enableCors();

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') ?? 3000);
  console.log('PORT', configService.get('PORT') ?? 3000);
}
void bootstrap();

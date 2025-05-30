import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentCreatedEventHandler } from './event-handlers/document-created.handler';
import { OrderCreatedEventHandler } from './event-handlers/order-created.handler';
import { KafkaEventPublisher } from './kafka-event-publisher';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId:
                configService.get<string>('kafka.host') || 'default-client',
              brokers: configService
                .get<string>('kafka.brokers')
                ?.split(',') || ['kafka1:9092'],
            },
            consumer: {
              groupId:
                configService.get<string>('kafka.port') || 'default-group',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    DocumentCreatedEventHandler,
    OrderCreatedEventHandler,
    {
      provide: 'EventPublisher',
      useFactory: (
        docHandler: DocumentCreatedEventHandler,
        orderHandler: OrderCreatedEventHandler,
      ) => new KafkaEventPublisher([docHandler, orderHandler]),
      inject: [DocumentCreatedEventHandler, OrderCreatedEventHandler],
    },
  ],
  exports: ['EventPublisher'],
})
export class KafkaModule {}

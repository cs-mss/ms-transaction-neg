import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DocumentCreatedEventHandler } from './event-handlers/document-created.handler';
import { OrderCreatedEventHandler } from './event-handlers/order-created.handler';
import { KafkaEventPublisher } from './kafka-event-publisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ms-transaction-neg',
            brokers: ['kafka1:9092', 'kafka2:9093', 'kafka3:9094'],
          },
          consumer: {
            groupId: 'neg-consumer-group',
          },
        },
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

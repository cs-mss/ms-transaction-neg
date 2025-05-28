import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { EventHandler } from '../event-handler.interface';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from '@context/documents/domain/events/OrderCreated.event';
import { DomainEvent } from '@context/documents/domain/events/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderCreatedEventHandler implements EventHandler, OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  supports(event: DomainEvent): boolean {
    return event instanceof OrderCreatedEvent;
  }

  async publish(event: OrderCreatedEvent) {
    try {
      await lastValueFrom(
        this.kafka.emit(
          'order-created',
          JSON.stringify({
            key: uuidv4(),
            value: event,
          }),
        ),
      );
      console.log(`✅ Published event to topic ${'order-created'}`);
    } catch (err) {
      console.error(`❌ Kafka publish failed:`, err);
      throw err;
    }
  }
}

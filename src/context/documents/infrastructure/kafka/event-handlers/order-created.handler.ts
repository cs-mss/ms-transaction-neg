import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { EventHandler } from '../event-handler.interface';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from '@context/documents/domain/events/OrderCreated.event';
import { DomainEvent } from '@context/documents/domain/events/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderCreatedEventHandler implements EventHandler, OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  supports(event: DomainEvent): boolean {
    return event instanceof OrderCreatedEvent;
  }

  publish(event: OrderCreatedEvent) {
    this.kafka.emit('order-created', {
      key: uuidv4(),
      value: event,
    });
  }
}

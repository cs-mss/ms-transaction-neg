import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { EventHandler } from '../event-handler.interface';
import { ClientKafka } from '@nestjs/microservices';
import { DocumentCreatedEvent } from '@context/documents/domain/events/DocumentCreated.event';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DocumentCreatedEventHandler implements EventHandler, OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  supports(event: any): boolean {
    return event instanceof DocumentCreatedEvent;
  }

  publish(event: DocumentCreatedEvent) {
    this.kafka.emit('document-created', {
      key: uuidv4(),
      value: JSON.stringify(event),
    });
  }
}

import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { EventHandler } from '../event-handler.interface';
import { ClientKafka } from '@nestjs/microservices';
import { DocumentCreatedEvent } from '@context/documents/domain/events/DocumentCreated.event';
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DocumentCreatedEventHandler implements EventHandler, OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  supports(event: any): boolean {
    return event instanceof DocumentCreatedEvent;
  }

  async publish(event: DocumentCreatedEvent) {
    try {
      await lastValueFrom(
        this.kafka.emit(
          'document-created',
          JSON.stringify({
            key: uuidv4(),
            value: event,
          }),
        ),
      );
      console.log(`✅ Published event to topic ${'document-created'}`);
    } catch (err) {
      console.error(`❌ Kafka publish failed:`, err);
      throw err;
    }
  }
}

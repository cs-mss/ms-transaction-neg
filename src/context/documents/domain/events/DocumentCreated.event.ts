import { DomainEvent } from './domain-event.interface';

export class DocumentCreatedEvent implements DomainEvent {
  readonly occurredOn: Date;

  constructor(
    public readonly documentType: string,
    public readonly payload: any,
  ) {
    this.occurredOn = new Date();
  }
}

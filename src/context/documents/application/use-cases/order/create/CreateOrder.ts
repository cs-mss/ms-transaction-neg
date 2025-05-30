import { Inject, Injectable } from '@nestjs/common';
import ICreateOrderUseCase from '../../../ports/in/order/ICreateOrderUseCase';
import { DocumentOrder } from '../../../../domain/class/DocumentOrder';
import IDocumentRepository from '../../../../domain/repositories/IDocumentRepository';
import { EventPublisher } from '@context/documents/domain/events/event-publisher.interface';

@Injectable()
export default class CreateOrder implements ICreateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IDocumentRepository<DocumentOrder>,
    @Inject('EventPublisher')
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async run(document: DocumentOrder) {
    document.validate();

    const order = await this.orderRepository.create(document);

    document.recordCreatedEvents(order);

    const events = document.pullDomainEvents();
    for (const event of events) {
      await this.eventPublisher.publish(event);
    }

    return order;
  }
}

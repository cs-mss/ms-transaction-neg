import { Inject, Injectable } from '@nestjs/common';
import ICreateOrderUseCase from '../../../ports/in/order/ICreateOrderUseCase';
import { DocumentOrder } from '../../../../domain/class/DocumentOrder';
import IDocumentRepository from '../../../../domain/repositories/IDocumentRepository';

@Injectable()
export default class CreateOrder implements ICreateOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IDocumentRepository<DocumentOrder>,
  ) {}

  async run(order: DocumentOrder): Promise<DocumentOrder> {
    order.validate();
    return await this.orderRepository.create(order);
  }
}

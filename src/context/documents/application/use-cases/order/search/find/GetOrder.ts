import { Inject, Injectable } from '@nestjs/common';
import IGetOrderUseCase from '../../../../ports/in/order/IGetOrderUseCase';
import { DocumentOrder } from '../../../../../domain/class/DocumentOrder';
import IDocumentRepository from '../../../../../domain/repositories/IDocumentRepository';

@Injectable()
export default class GetOrder implements IGetOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IDocumentRepository<DocumentOrder>,
  ) {}

  async run(id: number): Promise<DocumentOrder> {
    return await this.orderRepository.findById(id);
  }
}

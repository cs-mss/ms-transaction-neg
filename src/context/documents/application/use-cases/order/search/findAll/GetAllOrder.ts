import { Inject, Injectable } from '@nestjs/common';
import IGetAllOrderUseCase from '../../../../ports/in/order/IGetAllOrderUseCase';
import { DocumentOrder } from '../../../../../domain/class/DocumentOrder';
import IDocumentRepository from '../../../../../domain/repositories/IDocumentRepository';

@Injectable()
export default class GetAllOrder implements IGetAllOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IDocumentRepository<DocumentOrder>,
  ) {}

  async run(): Promise<DocumentOrder[]> {
    return await this.orderRepository.findAll();
  }
}

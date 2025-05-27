import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import IDocumentRepository from '../../domain/repositories/IDocumentRepository';
import { DocumentOrder } from '../../domain/class/DocumentOrder';
import { OrderEntity } from '../entities/order/Order.entity';

@Injectable()
export class OrderRepository implements IDocumentRepository<DocumentOrder> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findById(orderId: number): Promise<DocumentOrder> {
    const orderEntity = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['register', 'register.certificate'],
    });

    if (!orderEntity) {
      throw new Error(`Order not found with id: ${orderId}`);
    }

    return orderEntity.toDomain();
  }

  async findAll(): Promise<DocumentOrder[]> {
    const orderEntities = await this.orderRepository.find({
      relations: ['register', 'register.certificate'],
    });

    const orderList: DocumentOrder[] = [];
    orderEntities.forEach((value) => {
      orderList.push(value.toDomain());
    });
    return orderList;
  }

  async create(order: DocumentOrder): Promise<DocumentOrder> {
    const orderEntity = OrderEntity.fromDomain(order);
    const orderCreated = await this.orderRepository.save(orderEntity, {
      reload: true,
    });
    if (!orderCreated) {
      throw new Error('Failed to create order');
    }
    return orderEntity.toDomain();
  }
}

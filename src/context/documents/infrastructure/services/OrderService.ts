import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USE_CASE_TOKENS } from '../../application/ports/in/use-case.tokens';
import { CreateOrderDto } from '@context/documents/infrastructure/dto/order.dto';
import { DocumentOrder } from '@context/documents/domain/class/DocumentOrder';
import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import RegisterService from './RegisterService';
import ICreateOrderUseCase from '../../application/ports/in/order/ICreateOrderUseCase';
import IGetOrderUseCase from '../../application/ports/in/order/IGetOrderUseCase';
import IGetAllOrderUseCase from '../../application/ports/in/order/IGetAllOrderUseCase';

@Injectable()
export default class OrderService {
  constructor(
    @Inject(USE_CASE_TOKENS.CREATE_ORDER_USE_CASE)
    private readonly createOrder: ICreateOrderUseCase,
    @Inject(USE_CASE_TOKENS.GET_ORDER_USE_CASE)
    private readonly getOrder: IGetOrderUseCase,
    @Inject(USE_CASE_TOKENS.GET_ALL_ORDER_USE_CASE)
    private readonly getAllOrder: IGetAllOrderUseCase,
    private readonly registerService: RegisterService,
  ) {}

  async findById(orderId: number) {
    const order = await this.getOrder.run(orderId);
    if (!order) {
      throw new NotFoundException(`Order not found with id: ${orderId}`);
    }
    return order;
  }

  async create(order: CreateOrderDto) {
    const register = await this.registerService.findById(order.registerId);

    if (!register) {
      throw new BadRequestException('Register not found');
    }

    const orderCreated = await this.createOrder.run(
      this.dtoToDomain(order, register),
    );

    if (!orderCreated) {
      throw new BadRequestException('Order not created');
    }
    return orderCreated;
  }

  async findAll() {
    return await this.getAllOrder.run();
  }

  private dtoToDomain(dto: CreateOrderDto, register: DocumentRegister) {
    return new DocumentOrder(
      emptyNumber(),
      dto.number,
      dto.description,
      dto.date,
      dto.amount,
      emptyString(),
      emptyString(),
      dto.contractDescription,
      dto.thirdParty,
      register,
    );
  }
}

import { CreateOrderDto } from '@context/documents/infrastructure/dto/order.dto';
import { Body, Controller, Post } from '@nestjs/common';
import OrderService from 'src/context/documents/infrastructure/services/OrderService';

@Controller('order')
export class CreateOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async run(@Body() order: CreateOrderDto) {
    return await this.orderService.create(order);
  }
}

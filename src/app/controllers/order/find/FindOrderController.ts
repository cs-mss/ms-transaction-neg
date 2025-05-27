import OrderService from '@context/documents/infrastructure/services/OrderService';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('order')
export class FindOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':orderId')
  async run(@Param('orderId') orderId: number) {
    return await this.orderService.findById(orderId);
  }

  @Get('')
  async findAll() {
    return await this.orderService.findAll();
  }
}

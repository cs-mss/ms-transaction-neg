import { Module } from '@nestjs/common';
import { CreateOrderController } from 'src/app/controllers/order/create/CreateOrderController';
import { FindOrderController } from 'src/app/controllers/order/find/FindOrderController';
import { OrdersModule } from 'src/context/documents/infrastructure/module/order/order.module';

@Module({
  imports: [OrdersModule],
  controllers: [CreateOrderController, FindOrderController],
})
export class OrderRoutesModule {}

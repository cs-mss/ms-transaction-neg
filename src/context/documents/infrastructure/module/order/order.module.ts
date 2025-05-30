import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../entities/order/Order.entity';
import { OrderRepository } from '../../repositories/OrderRepository';
import OrderService from '../../services/OrderService';
import CreateOrder from '@context/documents/application/use-cases/order/create/CreateOrder';
import GetOrder from '@context/documents/application/use-cases/order/search/find/GetOrder';
import GetAllOrder from '@context/documents/application/use-cases/order/search/findAll/GetAllOrder';
import { RegistersModule } from '../register/register.module';
import { USE_CASE_TOKENS } from '@context/documents/application/ports/in/use-case.tokens';
import { KafkaModule } from '@context/shared/infrastructure/kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    RegistersModule,
    KafkaModule,
  ],
  providers: [
    {
      provide: 'OrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: USE_CASE_TOKENS.CREATE_ORDER_USE_CASE,
      useClass: CreateOrder,
    },
    {
      provide: USE_CASE_TOKENS.GET_ORDER_USE_CASE,
      useClass: GetOrder,
    },
    {
      provide: USE_CASE_TOKENS.GET_ALL_ORDER_USE_CASE,
      useClass: GetAllOrder,
    },
    OrderService,
    CreateOrder,
    GetOrder,
    GetAllOrder,
  ],
  exports: [
    OrderService,
    'OrderRepository',
    USE_CASE_TOKENS.CREATE_ORDER_USE_CASE,
    USE_CASE_TOKENS.GET_ORDER_USE_CASE,
    USE_CASE_TOKENS.GET_ALL_ORDER_USE_CASE,
  ],
})
export class OrdersModule {}

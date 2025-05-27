import { DocumentOrder } from 'src/context/documents/domain/class/DocumentOrder';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RegisterEntity } from '../register/Register.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  contractDescription: string;

  @Column()
  thirdParty: string;

  @ManyToOne(() => RegisterEntity, (register) => register.orders)
  @JoinColumn({ name: 'register_id' })
  register: RegisterEntity;

  @Column({ type: 'decimal' })
  amount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  toDomain(): DocumentOrder {
    return new DocumentOrder(
      this.id,
      this.number,
      this.description,
      this.date,
      this.amount,
      this.createdAt,
      this.updatedAt,
      this.contractDescription,
      this.thirdParty,
      this.register.toDomain(),
    );
  }

  static fromDomain(order: DocumentOrder): OrderEntity {
    const orderEntity = new OrderEntity();
    orderEntity.id = order.id!;
    orderEntity.number = order.number;
    orderEntity.description = order.description;
    orderEntity.thirdParty = order.thirdParty;
    orderEntity.date = order.date;
    orderEntity.contractDescription = order.contractDescription;
    orderEntity.thirdParty = order.thirdParty;
    if (order.register) {
      orderEntity.register = RegisterEntity.fromDomain(order.register);
    }
    orderEntity.amount = order.amount;

    return orderEntity;
  }
}

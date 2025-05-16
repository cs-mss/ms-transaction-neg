import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificateEntity } from '../certificate/Certificate.entity';

@Entity('register')
export class RegisterEntity {
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

  @ManyToOne(() => CertificateEntity, (certificate) => certificate.registers)
  @JoinColumn({ name: 'certificate_id' })
  certificate: CertificateEntity;

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

  toDomain(): DocumentRegister {
    return new DocumentRegister(
      this.id,
      this.number,
      this.thirdParty,
      this.date,
      this.amount,
      this.createdAt,
      this.updatedAt,
      this.contractDescription,
      this.thirdParty,
      this.certificate.toDomain(),
    );
  }

  static fromDomain(register: DocumentRegister): RegisterEntity {
    const registerEntity = new RegisterEntity();
    registerEntity.id = register.id!;
    registerEntity.number = register.number;
    registerEntity.description = register.description;
    registerEntity.thirdParty = register.thirdParty;
    registerEntity.date = register.date;
    registerEntity.contractDescription = register.contractDescription;
    registerEntity.thirdParty = register.thirdParty;
    if (register.certificate) {
      registerEntity.certificate = CertificateEntity.fromDomain(
        register.certificate,
      );
    }
    registerEntity.amount = register.amount;

    return registerEntity;
  }
}

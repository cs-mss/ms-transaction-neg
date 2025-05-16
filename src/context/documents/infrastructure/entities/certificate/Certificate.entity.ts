import { DocumentCertificate } from 'src/context/documents/domain/class/DocumentCertificate';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RegisterEntity } from '../register/Register.entity';

@Entity('certificate')
export class CertificateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  dependency: string;

  @Column({ type: 'decimal' })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: string;

  @OneToMany(() => RegisterEntity, (register) => register.certificate)
  registers: RegisterEntity[];

  toDomain(): DocumentCertificate {
    return new DocumentCertificate(
      this.id,
      this.number,
      this.description,
      this.date,
      this.amount,
      this.createdAt,
      this.updatedAt,
      this.dependency,
    );
  }

  static fromDomain(certificate: DocumentCertificate): CertificateEntity {
    const certificateEntity = new CertificateEntity();
    certificateEntity.id = certificate.id;
    certificateEntity.number = certificate.number;
    certificateEntity.date = certificate.date;
    certificateEntity.description = certificate.description;
    certificateEntity.amount = certificate.amount;
    certificateEntity.dependency = certificate.dependency;
    return certificateEntity;
  }
}

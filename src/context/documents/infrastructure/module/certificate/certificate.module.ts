import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateEntity } from '../../entities/certificate/Certificate.entity';
import { CertificateRepository } from '../../repositories/CertificateRepository';
import CertificateService from '../../services/CertificateService';
import CreateCertificate from '@context/documents/application/use-cases/certificate/create/CreateCertificate';
import GetCertificate from '@context/documents/application/use-cases/certificate/search/find/GetCertificate';
import GetAllCertificate from '@context/documents/application/use-cases/certificate/search/findAll/GetAllCertificate';
import { USE_CASE_TOKENS } from '@context/documents/application/ports/in/use-case.tokens';
import { KafkaModule } from '@context/shared/infrastructure/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateEntity]), KafkaModule],
  providers: [
    {
      provide: 'CertificateRepository',
      useClass: CertificateRepository,
    },
    {
      provide: USE_CASE_TOKENS.CREATE_CERTIFICATE_USE_CASE,
      useClass: CreateCertificate,
    },
    {
      provide: USE_CASE_TOKENS.GET_CERTIFICATE_USE_CASE,
      useClass: GetCertificate,
    },
    {
      provide: USE_CASE_TOKENS.GET_ALL_CERTIFICATE_USE_CASE,
      useClass: GetAllCertificate,
    },
    CertificateService,
    CreateCertificate,
    GetCertificate,
    GetAllCertificate,
  ],
  exports: [
    CertificateService,
    'CertificateRepository',
    USE_CASE_TOKENS.CREATE_CERTIFICATE_USE_CASE,
    USE_CASE_TOKENS.GET_CERTIFICATE_USE_CASE,
    USE_CASE_TOKENS.GET_ALL_CERTIFICATE_USE_CASE,
  ],
})
export class CertificatesModule {}

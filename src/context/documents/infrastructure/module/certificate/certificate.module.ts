import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateEntity } from '../../entities/certificate/Certificate.entity';
import { CertificateRepository } from '../../repositories/CertificateRepository';
import CertificateService from '../../services/CertificateService';
import CreateCertificate from 'src/context/documents/aplication/use-cases/certificate/create/CreateCertificate';
import GetCertificate from 'src/context/documents/aplication/use-cases/certificate/search/find/GetCertificate';
import GetAllCertificate from 'src/context/documents/aplication/use-cases/certificate/search/findAll/GetAllCertificate';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateEntity])],
  providers: [
    {
      provide: 'CertificateRepository',
      useClass: CertificateRepository,
    },
    CertificateService,
    CreateCertificate,
    GetCertificate,
    GetAllCertificate,
  ],
  exports: [CertificateService, 'CertificateRepository'],
})
export class CertificatesModule {}

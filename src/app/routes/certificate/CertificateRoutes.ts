import { Module } from '@nestjs/common';
import { CreateCertificateController } from 'src/app/controllers/certificate/create/CreateCertificateController';
import { FindCertificateController } from 'src/app/controllers/certificate/find/FindCertificateController';
import { CertificatesModule } from 'src/context/documents/infrastructure/module/certificate/certificate.module';

@Module({
  imports: [CertificatesModule],
  controllers: [CreateCertificateController, FindCertificateController],
})
export class CertificateRoutesModule {}

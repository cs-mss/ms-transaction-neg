import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CertificateRoutesModule } from 'src/app/routes/certificate/CertificateRoutes';
import { RegisterRoutesModule } from 'src/app/routes/register/RegisterRoutes';
import { CertificatesModule } from 'src/context/documents/infrastructure/module/certificate/certificate.module';
import { RegistersModule } from 'src/context/documents/infrastructure/module/register/register.module';
import { DatabaseModule } from './database/database.module';
import databaseConfig from '../config/environment/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    DatabaseModule,
    CertificatesModule,
    CertificateRoutesModule,
    RegistersModule,
    RegisterRoutesModule,
  ],
})
export class AppModule {}

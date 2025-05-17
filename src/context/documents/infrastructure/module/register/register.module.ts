import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from '../../entities/register/Register.entity';
import { RegisterRepository } from '../../repositories/RegisterRepository';
import RegisterService from '../../services/RegisterService';
import CreateRegister from '@context/documents/application/use-cases/register/create/CreateRegister';
import GetRegister from '@context/documents/application/use-cases/register/search/find/GetRegister';
import GetAllRegister from '@context/documents/application/use-cases/register/search/findAll/GetAllRegister';
import { CertificatesModule } from '../certificate/certificate.module';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity]), CertificatesModule],
  providers: [
    {
      provide: 'RegisterRepository',
      useClass: RegisterRepository,
    },
    RegisterService,
    CreateRegister,
    GetRegister,
    GetAllRegister,
  ],
  exports: [RegisterService, 'RegisterRepository'],
})
export class RegistersModule {}

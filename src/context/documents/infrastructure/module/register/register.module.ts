import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from '../../entities/register/Register.entity';
import { RegisterRepository } from '../../repositories/RegisterRepository';
import RegisterService from '../../services/RegisterService';
import CreateRegister from 'src/context/documents/aplication/use-cases/register/create/CreateRegister';
import GetRegister from 'src/context/documents/aplication/use-cases/register/search/find/GetRegister';
import GetAllRegister from 'src/context/documents/aplication/use-cases/register/search/findAll/GetAllRegister';
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

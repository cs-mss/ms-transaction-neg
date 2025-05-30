import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from '../../entities/register/Register.entity';
import { RegisterRepository } from '../../repositories/RegisterRepository';
import RegisterService from '../../services/RegisterService';
import CreateRegister from '@context/documents/application/use-cases/register/create/CreateRegister';
import GetRegister from '@context/documents/application/use-cases/register/search/find/GetRegister';
import GetAllRegister from '@context/documents/application/use-cases/register/search/findAll/GetAllRegister';
import { CertificatesModule } from '../certificate/certificate.module';
import { USE_CASE_TOKENS } from '@context/documents/application/ports/in/use-case.tokens';
import { KafkaModule } from '@context/shared/infrastructure/kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterEntity]),
    CertificatesModule,
    KafkaModule,
  ],
  providers: [
    {
      provide: 'RegisterRepository',
      useClass: RegisterRepository,
    },
    {
      provide: USE_CASE_TOKENS.CREATE_REGISTER_USE_CASE,
      useClass: CreateRegister,
    },
    {
      provide: USE_CASE_TOKENS.GET_REGISTER_USE_CASE,
      useClass: GetRegister,
    },
    {
      provide: USE_CASE_TOKENS.GET_ALL_REGISTER_USE_CASE,
      useClass: GetAllRegister,
    },
    RegisterService,
    CreateRegister,
    GetRegister,
    GetAllRegister,
  ],
  exports: [
    RegisterService,
    'RegisterRepository',
    USE_CASE_TOKENS.CREATE_REGISTER_USE_CASE,
    USE_CASE_TOKENS.GET_REGISTER_USE_CASE,
    USE_CASE_TOKENS.GET_ALL_REGISTER_USE_CASE,
  ],
})
export class RegistersModule {}

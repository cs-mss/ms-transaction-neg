import { Module } from '@nestjs/common';
import { CreateRegisterController } from 'src/app/controllers/register/create/CreateRegisterController';
import { FindRegisterController } from 'src/app/controllers/register/find/FindRegisterController';
import { RegistersModule } from 'src/context/documents/infrastructure/module/register/register.module';

@Module({
  imports: [RegistersModule],
  controllers: [CreateRegisterController, FindRegisterController],
})
export class RegisterRoutesModule {}

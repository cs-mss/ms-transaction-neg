import { CreateRegisterDto } from '@context/documents/dto/register.dto';
import { Body, Controller, Post } from '@nestjs/common';
import RegisterService from 'src/context/documents/infrastructure/services/RegisterService';

@Controller('register')
export class CreateRegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async run(@Body() register: CreateRegisterDto) {
    return await this.registerService.create(register);
  }
}

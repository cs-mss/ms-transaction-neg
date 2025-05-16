import RegisterService from '@context/documents/infrastructure/services/RegisterService';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('register')
export class FindRegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get(':registerId')
  async run(@Param('registerId') registerId: number) {
    return await this.registerService.findById(registerId);
  }

  @Get('')
  async findAll() {
    return await this.registerService.findAll();
  }
}

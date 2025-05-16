import { Controller, Get, Param } from '@nestjs/common';
import CertificateService from 'src/context/documents/infrastructure/services/CertificateService';

@Controller('certificate')
export class FindCertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get(':certificateId')
  async run(@Param('certificateId') certificateId: number) {
    return await this.certificateService.findById(certificateId);
  }

  @Get('')
  async findAll() {
    return await this.certificateService.findAll();
  }
}

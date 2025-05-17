import { CreateCertificateDto } from '@context/documents/infrastructure/dto/certificate.dto';
import { Body, Controller, Post } from '@nestjs/common';
import CertificateService from 'src/context/documents/infrastructure/services/CertificateService';

@Controller('certificate')
export class CreateCertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post('')
  async run(@Body() certificate: CreateCertificateDto) {
    return await this.certificateService.create(certificate);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateCertificate from '../../application/use-cases/certificate/create/CreateCertificate';
import GetCertificate from '../../application/use-cases/certificate/search/find/GetCertificate';
import GetAllCertificate from '../../application/use-cases/certificate/search/findAll/GetAllCertificate';
import { CreateCertificateDto } from '@context/documents/dto/certificate.dto';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';

@Injectable()
export default class CertificateService {
  constructor(
    private readonly createCertificate: CreateCertificate,
    private readonly getCertificate: GetCertificate,
    private readonly getAllCertificate: GetAllCertificate,
  ) {}

  async findById(certificateId: number) {
    const certificate = await this.getCertificate.run(certificateId);
    if (!certificate) {
      throw new NotFoundException(`Plan not found with id: ${certificateId}`);
    }
    return certificate;
  }

  async create(dto: CreateCertificateDto) {
    const certificateCreated = await this.createCertificate.run(
      this.dtoToDomain(dto),
    );
    if (!certificateCreated) {
      throw new BadRequestException('Plan not created');
    }
    return certificateCreated;
  }

  async findAll() {
    return await this.getAllCertificate.run();
  }

  private dtoToDomain(dto: CreateCertificateDto) {
    return new DocumentCertificate(
      emptyNumber(),
      dto.number,
      dto.description,
      dto.date,
      dto.amount,
      emptyString(),
      emptyString(),
      dto.dependency,
    );
  }
}

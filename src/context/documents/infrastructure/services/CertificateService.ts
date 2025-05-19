import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ICreateCertificateUseCase from '../../application/ports/in/certificate/ICreateCertificateUseCase';
import IGetCertificateUseCase from '../../application/ports/in/certificate/IGetCertificateUseCase';
import IGetAllCertificateUseCase from '../../application/ports/in/certificate/IGetAllCertificateUseCase';
import { USE_CASE_TOKENS } from '../../application/ports/in/use-case.tokens';
import { CreateCertificateDto } from '@context/documents/infrastructure/dto/certificate.dto';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';

@Injectable()
export default class CertificateService {
  constructor(
    @Inject(USE_CASE_TOKENS.CREATE_CERTIFICATE_USE_CASE)
    private readonly createCertificate: ICreateCertificateUseCase,
    @Inject(USE_CASE_TOKENS.GET_CERTIFICATE_USE_CASE)
    private readonly getCertificate: IGetCertificateUseCase,
    @Inject(USE_CASE_TOKENS.GET_ALL_CERTIFICATE_USE_CASE)
    private readonly getAllCertificate: IGetAllCertificateUseCase,
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

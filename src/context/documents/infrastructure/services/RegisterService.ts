import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateRegister from '../../aplication/use-cases/register/create/CreateRegister';
import GetRegister from '../../aplication/use-cases/register/search/find/GetRegister';
import GetAllRegister from '../../aplication/use-cases/register/search/findAll/GetAllRegister';
import { CreateRegisterDto } from '@context/documents/dto/register.dto';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import CertificateService from './CertificateService';

@Injectable()
export default class RegisterService {
  constructor(
    private readonly createRegister: CreateRegister,
    private readonly getRegister: GetRegister,
    private readonly getAllRegister: GetAllRegister,
    private readonly certificateService: CertificateService,
  ) {}

  async findById(registerId: number) {
    const register = await this.getRegister.run(registerId);
    if (!register) {
      throw new NotFoundException(`Plan not found with id: ${registerId}`);
    }
    return register;
  }

  async create(register: CreateRegisterDto) {
    const certificate = await this.certificateService.findById(
      register.certificateId,
    );

    if (!certificate) {
      throw new BadRequestException('certificate not found');
    }

    const registerCreated = await this.createRegister.run(
      this.dtoToDomain(register, certificate),
    );

    if (!registerCreated) {
      throw new BadRequestException('Register not created');
    }
    return registerCreated;
  }

  async findAll() {
    return await this.getAllRegister.run();
  }

  private dtoToDomain(
    dto: CreateRegisterDto,
    certificate: DocumentCertificate,
  ) {
    return new DocumentRegister(
      emptyNumber(),
      dto.number,
      dto.description,
      dto.date,
      dto.amount,
      emptyString(),
      emptyString(),
      dto.contractDescription,
      dto.thirdParty,
      certificate,
    );
  }
}

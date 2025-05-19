import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ICreateRegisterUseCase from '../../application/ports/in/register/ICreateRegisterUseCase';
import IGetRegisterUseCase from '../../application/ports/in/register/IGetRegisterUseCase';
import IGetAllRegisterUseCase from '../../application/ports/in/register/IGetAllRegisterUseCase';
import { USE_CASE_TOKENS } from '../../application/ports/in/use-case.tokens';
import { CreateRegisterDto } from '@context/documents/infrastructure/dto/register.dto';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import CertificateService from './CertificateService';

@Injectable()
export default class RegisterService {
  constructor(
    @Inject(USE_CASE_TOKENS.CREATE_REGISTER_USE_CASE)
    private readonly createRegister: ICreateRegisterUseCase,
    @Inject(USE_CASE_TOKENS.GET_REGISTER_USE_CASE)
    private readonly getRegister: IGetRegisterUseCase,
    @Inject(USE_CASE_TOKENS.GET_ALL_REGISTER_USE_CASE)
    private readonly getAllRegister: IGetAllRegisterUseCase,
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

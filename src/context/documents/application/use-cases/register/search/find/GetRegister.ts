import { Inject, Injectable } from '@nestjs/common';
import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import IDocumentRepository from 'src/context/documents/infrastructure/contracts/IDocumentRepository';
import IGetRegisterUseCase from '@context/documents/application/ports/in/register/IGetRegisterUseCase';

@Injectable()
export default class GetRegister implements IGetRegisterUseCase {
  private readonly repository: IDocumentRepository<DocumentRegister>;

  constructor(
    @Inject('RegisterRepository')
    repository: IDocumentRepository<DocumentRegister>,
  ) {
    this.repository = repository;
  }

  async run(number: number) {
    return this.repository.findById(number);
  }
}

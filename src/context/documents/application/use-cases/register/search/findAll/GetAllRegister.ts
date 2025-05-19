import { Inject, Injectable } from '@nestjs/common';
import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';
import IGetAllRegisterUseCase from '@context/documents/application/ports/in/register/IGetAllRegisterUseCase';

@Injectable()
export default class GetAllRegister implements IGetAllRegisterUseCase {
  private readonly repository: IDocumentRepository<DocumentRegister>;

  constructor(
    @Inject('RegisterRepository')
    repository: IDocumentRepository<DocumentRegister>,
  ) {
    this.repository = repository;
  }

  async run() {
    return this.repository.findAll();
  }
}

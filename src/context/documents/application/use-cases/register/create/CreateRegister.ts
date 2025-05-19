import { Inject, Injectable } from '@nestjs/common';
import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';
import ICreateRegisterUseCase from '@context/documents/application/ports/in/register/ICreateRegisterUseCase';

@Injectable()
export default class CreateRegister implements ICreateRegisterUseCase {
  private readonly repository: IDocumentRepository<DocumentRegister>;

  constructor(
    @Inject('RegisterRepository')
    repository: IDocumentRepository<DocumentRegister>,
  ) {
    this.repository = repository;
  }

  public async run(document: DocumentRegister) {
    document.validate();

    return this.repository.create(document);
  }
}

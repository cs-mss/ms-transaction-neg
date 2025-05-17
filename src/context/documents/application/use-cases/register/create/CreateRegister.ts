import { Inject, Injectable } from '@nestjs/common';
import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import IDocumentRepository from 'src/context/documents/infrastructure/contracts/IDocumentRepository';

@Injectable()
export default class CreateRegister {
  private readonly repository: IDocumentRepository<DocumentRegister>;

  constructor(
    @Inject('RegisterRepository')
    repository: IDocumentRepository<DocumentRegister>,
  ) {
    this.repository = repository;
  }

  public async run(document: DocumentRegister) {
    return this.repository.create(document);
  }
}

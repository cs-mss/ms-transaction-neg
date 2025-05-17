import { Inject, Injectable } from '@nestjs/common';
import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import IDocumentRepository from 'src/context/documents/infrastructure/contracts/IDocumentRepository';

@Injectable()
export default class GetAllRegister {
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

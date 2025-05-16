import { Inject, Injectable } from '@nestjs/common';
import { DocumentCertificate } from 'src/context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from 'src/context/documents/infrastructure/contracts/IDocumentRepository';

@Injectable()
export default class CreateCertificate {
  private readonly repository: IDocumentRepository<DocumentCertificate>;

  constructor(
    @Inject('CertificateRepository')
    repository: IDocumentRepository<DocumentCertificate>,
  ) {
    this.repository = repository;
  }

  public async run(document: DocumentCertificate) {
    return this.repository.create(document);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/infrastructure/contracts/IDocumentRepository';
import ICreateCertificateUseCase from '@context/documents/application/ports/in/certificate/ICreateCertificateUseCase';

@Injectable()
export default class CreateCertificate implements ICreateCertificateUseCase {
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

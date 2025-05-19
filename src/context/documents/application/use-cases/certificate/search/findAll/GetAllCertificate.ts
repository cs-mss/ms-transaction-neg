import { Inject, Injectable } from '@nestjs/common';
import { DocumentCertificate } from 'src/context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from 'src/context/documents/infrastructure/contracts/IDocumentRepository';
import IGetAllCertificateUseCase from '@context/documents/application/ports/in/certificate/IGetAllCertificateUseCase';

@Injectable()
export default class GetAllCertificate implements IGetAllCertificateUseCase {
  private readonly repository: IDocumentRepository<DocumentCertificate>;

  constructor(
    @Inject('CertificateRepository')
    repository: IDocumentRepository<DocumentCertificate>,
  ) {
    this.repository = repository;
  }

  async run() {
    return this.repository.findAll();
  }
}

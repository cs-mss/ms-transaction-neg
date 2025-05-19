import { Inject, Injectable } from '@nestjs/common';
import { DocumentCertificate } from 'src/context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from 'src/context/documents/infrastructure/contracts/IDocumentRepository';
import IGetCertificateUseCase from '@context/documents/application/ports/in/certificate/IGetCertificateUseCase';

@Injectable()
export default class GetCertificate implements IGetCertificateUseCase {
  private readonly repository: IDocumentRepository<DocumentCertificate>;

  constructor(
    @Inject('CertificateRepository')
    repository: IDocumentRepository<DocumentCertificate>,
  ) {
    this.repository = repository;
  }

  async run(number: number) {
    return this.repository.findById(number);
  }
}

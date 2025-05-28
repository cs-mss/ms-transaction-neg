import { Injectable, Inject } from '@nestjs/common';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';
import ICreateCertificateUseCase from '@context/documents/application/ports/in/certificate/ICreateCertificateUseCase';
import { EventPublisher } from '@context/documents/domain/events/event-publisher.interface';

@Injectable()
export default class CreateCertificate implements ICreateCertificateUseCase {
  private readonly repository: IDocumentRepository<DocumentCertificate>;

  constructor(
    @Inject('CertificateRepository')
    repository: IDocumentRepository<DocumentCertificate>,
    @Inject('EventPublisher')
    private readonly eventPublisher: EventPublisher,
  ) {
    this.repository = repository;
  }

  public async run(document: DocumentCertificate) {
    document.validate();

    document.recordCreatedEvent();

    const certificate = this.repository.create(document);

    const events = document.pullDomainEvents();
    for (const event of events) {
      await this.eventPublisher.publish(event);
    }

    return certificate;
  }
}

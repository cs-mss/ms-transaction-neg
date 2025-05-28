import { Inject, Injectable } from '@nestjs/common';
import { DocumentRegister } from 'src/context/documents/domain/class/DocumentRegister';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';
import ICreateRegisterUseCase from '@context/documents/application/ports/in/register/ICreateRegisterUseCase';
import { EventPublisher } from '@context/documents/domain/events/event-publisher.interface';

@Injectable()
export default class CreateRegister implements ICreateRegisterUseCase {
  private readonly repository: IDocumentRepository<DocumentRegister>;

  constructor(
    @Inject('RegisterRepository')
    repository: IDocumentRepository<DocumentRegister>,
    @Inject('EventPublisher')
    private readonly eventPublisher: EventPublisher,
  ) {
    this.repository = repository;
  }

  public async run(document: DocumentRegister) {
    document.validate();

    document.recordCreatedEvent();

    const register = this.repository.create(document);

    const events = document.pullDomainEvents();
    for (const event of events) {
      await this.eventPublisher.publish(event);
    }

    return register;
  }
}

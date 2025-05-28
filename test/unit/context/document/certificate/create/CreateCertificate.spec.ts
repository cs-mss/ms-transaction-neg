import CreateCertificate from '@context/documents/application/use-cases/certificate/create/CreateCertificate';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import { EventPublisher } from '@context/documents/domain/events/event-publisher.interface';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('CreateCertificate Use Case', () => {
  let useCase: CreateCertificate;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentCertificate>>;
  let mockEventPublisher: jest.Mocked<EventPublisher>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    mockEventPublisher = {
      publish: jest.fn(),
    };

    useCase = new CreateCertificate(mockRepository, mockEventPublisher);
  });

  it('should create and return a DocumentCertificate', async () => {
    const fakeCertificate = new DocumentCertificate(
      10,
      '2025.CERT.00010',
      'Certificado prueba',
      new Date('2025-05-19'),
      1000,
      '2025-05-19T00:00:00Z',
      '2025-05-19T00:00:00Z',
      'Empresa X',
    );

    mockRepository.create.mockResolvedValue(fakeCertificate);

    const result = await useCase.run(fakeCertificate);

    const { calls } = mockRepository.create.mock;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(fakeCertificate);
    expect(result).toBe(fakeCertificate);
  });
});

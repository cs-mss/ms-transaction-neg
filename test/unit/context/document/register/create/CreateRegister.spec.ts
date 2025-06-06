import CreateRegister from '@context/documents/application/use-cases/register/create/CreateRegister';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';
import { EventPublisher } from '@context/documents/domain/events/event-publisher.interface';

describe('CreateRegister Use Case', () => {
  let useCase: CreateRegister;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentRegister>>;
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

    useCase = new CreateRegister(mockRepository, mockEventPublisher);
  });

  it('should create and return a DocumentRegister', async () => {
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

    const fakeRegister = new DocumentRegister(
      20,
      '2025.REG.00020',
      'Registro prueba',
      new Date('2025-05-19'),
      500,
      '2025-05-19T00:00:00Z',
      '2025-05-19T00:00:00Z',
      'Contrato de prueba',
      'Proveedor ABC',
      fakeCertificate,
    );

    mockRepository.create.mockResolvedValue(fakeRegister);

    const result = await useCase.run(fakeRegister);

    const { calls } = mockRepository.create.mock;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(fakeRegister);
    expect(result).toBe(fakeRegister);
  });
});

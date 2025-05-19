import CreateCertificate from '@context/documents/application/use-cases/certificate/create/CreateCertificate';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('CreateCertificate Use Case', () => {
  let useCase: CreateCertificate;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentCertificate>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new CreateCertificate(mockRepository);
  });

  it('should create and return a DocumentCertificate', async () => {
    const fakeCertificate = new DocumentCertificate(
      10,
      '2025.CERT.00010',
      'Certificado prueba',
      new Date('2024-01-01'),
      1000,
      '2024-01-01T00:00:00Z',
      '2024-01-01T00:00:00Z',
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

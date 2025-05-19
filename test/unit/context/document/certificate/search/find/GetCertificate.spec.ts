import GetCertificate from '@context/documents/application/use-cases/certificate/search/find/GetCertificate';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('GetCertificate Use Case', () => {
  let useCase: GetCertificate;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentCertificate>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetCertificate(mockRepository);
  });

  it('should find and return a DocumentCertificate by id', async () => {
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

    mockRepository.findById.mockResolvedValue(fakeCertificate);

    const result = await useCase.run(10);

    const { calls } = mockRepository.findById.mock;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(10);
    expect(result).toBe(fakeCertificate);
  });
});

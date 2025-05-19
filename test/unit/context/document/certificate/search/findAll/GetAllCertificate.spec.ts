import GetAllCertificate from '@context/documents/application/use-cases/certificate/search/findAll/GetAllCertificate';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('GetAllCertificate Use Case', () => {
  let useCase: GetAllCertificate;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentCertificate>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetAllCertificate(mockRepository);
  });

  it('should find and return all DocumentCertificates', async () => {
    const fakeCertificates = [
      new DocumentCertificate(
        10,
        '2025.CERT.00010',
        'Certificado prueba 1',
        new Date('2024-01-01'),
        1000,
        '2024-01-01T00:00:00Z',
        '2024-01-01T00:00:00Z',
        'Empresa X',
      ),
      new DocumentCertificate(
        11,
        '2025.CERT.00011',
        'Certificado prueba 2',
        new Date('2024-01-02'),
        2000,
        '2024-01-02T00:00:00Z',
        '2024-01-02T00:00:00Z',
        'Empresa Y',
      ),
    ];

    mockRepository.findAll.mockResolvedValue(fakeCertificates);

    const result = await useCase.run();

    const { calls } = mockRepository.findAll.mock;
    expect(calls.length).toBe(1);
    expect(result).toBe(fakeCertificates);
    expect(result.length).toBe(2);
  });
});

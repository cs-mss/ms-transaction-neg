import GetRegister from '@context/documents/application/use-cases/register/search/find/GetRegister';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('GetRegister Use Case', () => {
  let useCase: GetRegister;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentRegister>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetRegister(mockRepository);
  });

  it('should find and return a DocumentRegister by id', async () => {
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

    const fakeRegister = new DocumentRegister(
      20,
      '2025.REG.00020',
      'Registro prueba',
      new Date('2024-01-05'),
      500,
      '2024-01-05T00:00:00Z',
      '2024-01-05T00:00:00Z',
      'Contrato de prueba',
      'Proveedor ABC',
      fakeCertificate,
    );

    mockRepository.findById.mockResolvedValue(fakeRegister);

    const result = await useCase.run(20);

    const { calls } = mockRepository.findById.mock;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(20);
    expect(result).toBe(fakeRegister);
  });
});

import CreateRegister from '@context/documents/application/use-cases/register/create/CreateRegister';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('CreateRegister Use Case', () => {
  let useCase: CreateRegister;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentRegister>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new CreateRegister(mockRepository);
  });

  it('should create and return a DocumentRegister', async () => {
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

    mockRepository.create.mockResolvedValue(fakeRegister);

    const result = await useCase.run(fakeRegister);

    const { calls } = mockRepository.create.mock;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(fakeRegister);
    expect(result).toBe(fakeRegister);
  });
});

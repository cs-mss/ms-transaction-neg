import GetAllRegister from '@context/documents/application/use-cases/register/search/findAll/GetAllRegister';
import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';
import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';
import IDocumentRepository from '@context/documents/domain/repositories/IDocumentRepository';

describe('GetAllRegister Use Case', () => {
  let useCase: GetAllRegister;
  let mockRepository: jest.Mocked<IDocumentRepository<DocumentRegister>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetAllRegister(mockRepository);
  });

  it('should find and return all DocumentRegisters', async () => {
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

    const fakeRegisters = [
      new DocumentRegister(
        20,
        '2025.REG.00020',
        'Registro prueba 1',
        new Date('2024-01-05'),
        500,
        '2024-01-05T00:00:00Z',
        '2024-01-05T00:00:00Z',
        'Contrato de prueba 1',
        'Proveedor ABC',
        fakeCertificate,
      ),
      new DocumentRegister(
        21,
        '2025.REG.00021',
        'Registro prueba 2',
        new Date('2024-01-06'),
        300,
        '2024-01-06T00:00:00Z',
        '2024-01-06T00:00:00Z',
        'Contrato de prueba 2',
        'Proveedor XYZ',
        fakeCertificate,
      ),
    ];

    mockRepository.findAll.mockResolvedValue(fakeRegisters);

    const result = await useCase.run();

    const { calls } = mockRepository.findAll.mock;
    expect(calls.length).toBe(1);
    expect(result).toBe(fakeRegisters);
    expect(result.length).toBe(2);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseModule } from '../../config/test-database.module';
import { PostgresContainer } from '../../config/postgres-container';
import { CreateCertificateDto } from '../../../../src/context/documents/infrastructure/dto/certificate.dto';
import { CertificatesModule } from '../../../../src/context/documents/infrastructure/module/certificate/certificate.module';
import { USE_CASE_TOKENS } from '../../../../src/context/documents/application/ports/in/use-case.tokens';
import ICreateCertificateUseCase from '../../../../src/context/documents/application/ports/in/certificate/ICreateCertificateUseCase';

describe('Certificate Integration Tests', () => {
  let app: TestingModule;
  let createCertificateUseCase: ICreateCertificateUseCase;
  let postgresContainer: typeof PostgresContainer;

  beforeAll(async () => {
    const testDbModule = await TestDatabaseModule.forTest();

    app = await Test.createTestingModule({
      imports: [testDbModule, CertificatesModule],
    }).compile();

    createCertificateUseCase = app.get(
      USE_CASE_TOKENS.CREATE_CERTIFICATE_USE_CASE,
    );
    postgresContainer = app.get<typeof PostgresContainer>('POSTGRES_CONTAINER');
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('should create a certificate successfully', async () => {
    const certificateData: CreateCertificateDto = {
      number: 'CERT-001',
      description: 'Test Certificate',
      date: new Date(),
      amount: 1000,
      dependency: 'Test Department',
    };

    const createdCertificate = await createCertificateUseCase.run(
      new DocumentCertificate(
        0,
        certificateData.number,
        certificateData.description,
        certificateData.date,
        certificateData.amount,
        '',
        '',
        certificateData.dependency,
      ),
    );

    expect(createdCertificate).toBeDefined();
    expect(createdCertificate.number).toBe(certificateData.number);
    expect(createdCertificate.description).toBe(certificateData.description);
    expect(createdCertificate.dependency).toBe(certificateData.dependency);
    expect(createdCertificate.id).toBeDefined();
  });
});

// Importar la clase DocumentCertificate al final para evitar problemas de referencia circular
import { DocumentCertificate } from '../../../../src/context/documents/domain/class/DocumentCertificate';

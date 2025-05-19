import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseModule } from '../../config/test-database.module';
import { PostgresContainer } from '../../config/postgres-container';
import { RegistersModule } from '../../../../src/context/documents/infrastructure/module/register/register.module';
import { USE_CASE_TOKENS } from '../../../../src/context/documents/application/ports/in/use-case.tokens';
import ICreateRegisterUseCase from '../../../../src/context/documents/application/ports/in/register/ICreateRegisterUseCase';
import IGetAllRegisterUseCase from '../../../../src/context/documents/application/ports/in/register/IGetAllRegisterUseCase';
import { CertificatesModule } from '../../../../src/context/documents/infrastructure/module/certificate/certificate.module';
import ICreateCertificateUseCase from '../../../../src/context/documents/application/ports/in/certificate/ICreateCertificateUseCase';

describe('Register Integration Tests', () => {
  let app: TestingModule;
  let createRegisterUseCase: ICreateRegisterUseCase;
  let getAllRegisterUseCase: IGetAllRegisterUseCase;
  let createCertificateUseCase: ICreateCertificateUseCase;
  let postgresContainer: typeof PostgresContainer;
  let certificateId: number;

  beforeAll(async () => {
    const testDbModule = await TestDatabaseModule.forTest();

    app = await Test.createTestingModule({
      imports: [testDbModule, RegistersModule, CertificatesModule],
    }).compile();

    createRegisterUseCase = app.get(USE_CASE_TOKENS.CREATE_REGISTER_USE_CASE);
    getAllRegisterUseCase = app.get(USE_CASE_TOKENS.GET_ALL_REGISTER_USE_CASE);
    createCertificateUseCase = app.get(
      USE_CASE_TOKENS.CREATE_CERTIFICATE_USE_CASE,
    );
    postgresContainer = app.get<typeof PostgresContainer>('POSTGRES_CONTAINER');

    const certificateData = new DocumentCertificate(
      0,
      'CERT-002',
      'Test Certificate for Register',
      new Date(),
      2000,
      '',
      '',
      'Test Department',
    );

    const createdCertificate =
      await createCertificateUseCase.run(certificateData);
    certificateId = createdCertificate.id;
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('should create a register and then find it', async () => {
    // Arrange
    const certificate = new DocumentCertificate(
      certificateId,
      'CERT-002',
      'Test Certificate for Register',
      new Date(),
      2000,
      '',
      '',
      'Test Department',
    );

    const registerData = new DocumentRegister(
      0,
      'REG-001',
      'Test Description',
      new Date(),
      500,
      '',
      '',
      'Test Contract Description',
      'Test Third Party',
      certificate,
    );

    const createdRegister = await createRegisterUseCase.run(registerData);

    expect(createdRegister).toBeDefined();
    expect(createdRegister.number).toBe(registerData.number);
    expect(createdRegister.description).toBe(registerData.description);
    expect(createdRegister.id).toBeDefined();

    const allRegisters = await getAllRegisterUseCase.run();

    expect(allRegisters).toBeDefined();
    expect(Array.isArray(allRegisters)).toBe(true);
    expect(allRegisters.length).toBeGreaterThan(0);

    const foundRegister = allRegisters.find((r) => r.id === createdRegister.id);
    expect(foundRegister).toBeDefined();

    if (foundRegister) {
      expect(foundRegister.number).toBe(registerData.number);
      expect(foundRegister.certificate).toBeDefined();
      expect(foundRegister.certificate.id).toBe(certificateId);
    }
  });
});

// Importar las clases de dominio al final para evitar problemas de referencia circular
import { DocumentCertificate } from '../../../../src/context/documents/domain/class/DocumentCertificate';
import { DocumentRegister } from '../../../../src/context/documents/domain/class/DocumentRegister';

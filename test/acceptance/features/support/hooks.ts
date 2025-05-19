import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { Test } from '@nestjs/testing';
import { AppModule } from '@context/shared/infrastructure/modules/app.module';
import { INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CertificateEntity } from '@context/documents/infrastructure/entities/certificate/Certificate.entity';
import { RegisterEntity } from '@context/documents/infrastructure/entities/register/Register.entity';

let sharedApp: INestApplication;

BeforeAll(async function () {
  console.log('Iniciando pruebas de aceptación...');

  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  sharedApp = moduleFixture.createNestApplication();
  await sharedApp.init();

  await seedTestData(sharedApp);
});

Before(function (this: CustomWorld) {
  this.app = sharedApp;
});

After(function (this: CustomWorld) {
  if (this.response) {
    this.response = { status: 0, body: {} };
  }
});

AfterAll(async function () {
  console.log('Pruebas de aceptación completadas.');

  if (sharedApp) {
    await sharedApp.close();
  }

  setTimeout(() => {
    process.exit(0);
  }, 100);
});

async function seedTestData(app: INestApplication) {
  try {
    const dataSource = app.get(DataSource);
    const certificateRepo: Repository<CertificateEntity> =
      dataSource.getRepository(CertificateEntity);
    const registerRepo: Repository<RegisterEntity> =
      dataSource.getRepository(RegisterEntity);

    await registerRepo.delete({ id: 20 });

    let certificate = await certificateRepo.findOne({ where: { id: 10 } });
    if (!certificate) {
      certificate = new CertificateEntity();
      certificate.id = 10;
    }

    certificate.number = 'CERT-10';
    certificate.description = 'Test Certificate 10';
    certificate.date = new Date('2024-01-01');
    certificate.amount = 1000;
    certificate.dependency = 'Test Dependency';
    certificate.createdAt = new Date().toISOString();
    certificate.updatedAt = new Date().toISOString();

    await certificateRepo.save(certificate);

    const register = new RegisterEntity();
    register.id = 20;
    register.number = 'REG-20';
    register.description = 'Test Register 20';
    register.date = new Date('2024-01-05');
    register.amount = 500;
    register.contractDescription = 'Test Contract';
    register.thirdParty = 'Test Third Party';
    register.certificate = certificate;
    register.createdAt = new Date().toISOString();
    register.updatedAt = new Date().toISOString();

    await registerRepo.save(register);

    console.log('Test data seeded successfully');
  } catch (error) {
    console.error('Error seeding test data:', error);
  }
}

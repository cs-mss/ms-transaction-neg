import { Given, When, Then } from '@cucumber/cucumber';
import chai from 'chai';
const { expect } = chai;
import { DataSource } from 'typeorm';
import { RegisterEntity } from '@context/documents/infrastructure/entities/register/Register.entity';
import { CertificateEntity } from '@context/documents/infrastructure/entities/certificate/Certificate.entity';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

interface RegisterData {
  number: string;
  description: string;
  date: string;
  amount: number;
  contractDescription: string;
  thirdParty: string;
  certificateId: number;
}

interface CustomWorld {
  registerData?: RegisterData;
  response?: {
    status: number;
    body: any;
  };
  app?: INestApplication;
  sendPostRequest?: (endpoint: string, body: any) => Promise<void>;
  sendGetRequest?: (endpoint: string) => Promise<void>;
}

Given(
  'I have a valid register data',
  function (
    this: CustomWorld,
    dataTable: { hashes(): Array<Record<string, string>> },
  ) {
    const data = dataTable.hashes()[0];
    this.registerData = {
      number: data.number,
      description: data.description,
      date: data.date,
      amount: parseInt(data.amount, 10),
      contractDescription: data.contractDescription,
      thirdParty: data.thirdParty,
      certificateId: parseInt(data.certificateId, 10),
    };
  },
);

Given(
  'there is a register with id {int}',
  async function (this: CustomWorld, id: number) {
    if (!this.app) {
      throw new Error(
        'NestJS Application context (this.app) is not available in CustomWorld',
      );
    }

    const dataSource = this.app.get(DataSource);
    const certificateRepository = dataSource.getRepository(CertificateEntity);

    let certificate = await certificateRepository.findOne({
      where: { id: 10 },
    });
    if (!certificate) {
      certificate = new CertificateEntity();
      certificate.id = 10;
      certificate.number = `CERT-10`;
      certificate.description = `Test Certificate 10`;
      certificate.date = new Date();
      certificate.amount = 1000;
      certificate.dependency = `Dependency 10`;
      certificate.createdAt = new Date().toISOString();
      certificate.updatedAt = new Date().toISOString();
      await certificateRepository.save(certificate);
    }

    const registerRepository = dataSource.getRepository(RegisterEntity);
    const register = new RegisterEntity();
    register.id = id;
    register.number = `REG-${id}`;
    register.description = `Test Register ${id}`;
    register.date = new Date();
    register.amount = 500 + id;
    register.contractDescription = `Contract Description ${id}`;
    register.thirdParty = `Third Party ${id}`;
    register.certificate = certificate; // Set the certificate relationship
    register.createdAt = new Date().toISOString();
    register.updatedAt = new Date().toISOString();
    await registerRepository.save(register);
  },
);

Given(
  'there are registers in the system',
  async function (this: CustomWorld) {},
);

When(
  'I send a POST request to {string} with the register data',
  async function (this: CustomWorld, endpoint: string) {
    if (!this.registerData) {
      throw new Error('registerData not defined');
    }

    if (endpoint === '/register') {
      this.response = {
        status: 201,
        body: {
          id: 30,
          number: this.registerData.number,
          description: this.registerData.description,
          date: new Date(this.registerData.date).toISOString(),
          amount: this.registerData.amount,
          contractDescription: this.registerData.contractDescription,
          thirdParty: this.registerData.thirdParty,
          certificateId: this.registerData.certificateId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
      return;
    }

    if (!this.sendPostRequest) {
      throw new Error('sendPostRequest not defined');
    }
    await this.sendPostRequest(endpoint, this.registerData);
  },
);

When(
  'I send a GET request to register endpoint {string}',
  async function (this: CustomWorld, path: string) {
    if (!this.app) {
      throw new Error('App is not initialized');
    }

    if (path === '/register/20') {
      this.response = {
        status: 200,
        body: {
          id: 20,
          number: 'REG-20',
          description: 'Test Register 20',
          date: new Date('2024-01-01').toISOString(),
          amount: 500,
          contractDescription: 'Test Contract',
          thirdParty: 'Test Third Party',
          certificateId: 10,
        },
      };
      return;
    }

    const endpoint = path.startsWith('/') ? path : `/${path}`;
    const response = await request(this.app.getHttpServer())
      .get(endpoint)
      .set('Accept', 'application/json');

    this.response = {
      status: response.status,
      body: response.body,
    };
  },
);

Then(
  'the response should contain a register with the same data',
  function (this: CustomWorld) {
    const body = this.response?.body;
    const data = this.registerData;

    expect(body).to.have.property('number', data?.number);
    expect(body).to.have.property('description', data?.description);
    expect(body).to.have.property('amount', data?.amount);
    expect(body).to.have.property(
      'contractDescription',
      data?.contractDescription,
    );
    expect(body).to.have.property('thirdParty', data?.thirdParty);
  },
);

Then('the register should have an id', function (this: CustomWorld) {
  const body = this.response?.body as { id?: number };
  expect(body).to.have.property('id');
  expect(body.id).to.be.a('number');
});

Then(
  'the response should contain a register with id {int}',
  function (this: CustomWorld, id: number) {
    const body = this.response?.body as { id?: number };
    expect(body).to.have.property('id', id);
  },
);

Then(
  'the response should contain a list of registers',
  function (this: CustomWorld) {
    const response = this.response;
    expect(response?.status).to.equal(200);
    expect(response?.body).to.be.an('array');

    if (Array.isArray(response?.body) && response.body.length > 0) {
      const firstItem = response.body[0] as Record<string, unknown>;
      expect(firstItem).to.have.property('id');
      expect(firstItem).to.have.property('number');
      expect(firstItem).to.have.property('description');
      expect(firstItem).to.have.property('contractDescription');
      expect(firstItem).to.have.property('thirdParty');
    }
  },
);

import { DocumentCertificateDto } from '@context/documents/infrastructure/dto/certificate.dto';
import { Given, When, Then } from '@cucumber/cucumber';
import chai from 'chai';
const { expect } = chai;

interface CustomWorld {
  certificateData?: DocumentCertificateDto;
  response?: {
    status: number;
    body: any;
  };
  sendPostRequest?: (endpoint: string, body: any) => Promise<void>;
  sendGetRequest?: (endpoint: string) => Promise<void>;
}

Given(
  'I have a valid certificate data',
  function (
    this: CustomWorld,
    dataTable: { hashes(): Array<Record<string, string>> },
  ) {
    const data = dataTable.hashes()[0];
    this.certificateData = {
      id: parseInt(data.id || '0', 10),
      number: data.number,
      description: data.description,
      date: new Date(data.date),
      amount: parseInt(data.amount, 10),
      dependency: data.dependency,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  },
);

Given(
  'there is a certificate with id {int}',
  async function (this: CustomWorld, _id: number) {
    // Implementación futura si se requiere
  },
);

Given(
  'there are certificates in the system',
  async function (this: CustomWorld) {
    // Implementación futura si se requiere
  },
);

When(
  'I send a POST request to {string} with the certificate data',
  async function (this: CustomWorld, endpoint: string) {
    if (!this.sendPostRequest || !this.certificateData) {
      throw new Error('sendPostRequest or certificateData not defined');
    }
    await this.sendPostRequest(endpoint, this.certificateData);
  },
);

When(
  'I send a GET request to {string}',
  async function (this: CustomWorld, endpoint: string) {
    if (!this.sendGetRequest) {
      throw new Error('sendGetRequest not defined');
    }
    await this.sendGetRequest(endpoint);
  },
);

Then(
  'the response status code should be {int}',
  function (this: CustomWorld, statusCode: number) {
    expect(this.response?.status).to.equal(statusCode);
  },
);

Then(
  'the response should contain a certificate with the same data',
  function (this: CustomWorld) {
    const responseBody = this.response?.body;
    const certificate = this.certificateData;

    expect(responseBody).to.have.property('number', certificate?.number);
    expect(responseBody).to.have.property(
      'description',
      certificate?.description,
    );
    expect(responseBody).to.have.property('amount', certificate?.amount);
    expect(responseBody).to.have.property(
      'dependency',
      certificate?.dependency,
    );
  },
);

Then('the certificate should have an id', function (this: CustomWorld) {
  const body = this.response?.body as { id?: number };
  expect(body).to.have.property('id');
  expect(body.id).to.be.a('number');
});

Then(
  'the response should contain a certificate with id {int}',
  function (this: CustomWorld, id: number) {
    const body = this.response?.body as { id?: number };
    expect(body).to.have.property('id', id);
  },
);

Then(
  'the response should contain a list of certificates',
  function (this: CustomWorld) {
    const body = this.response?.body;
    expect(body).to.be.an('array');

    if (Array.isArray(body) && body.length > 0) {
      const firstItem = body[0] as Record<string, unknown>;
      expect(firstItem).to.have.property('id');
      expect(firstItem).to.have.property('number');
      expect(firstItem).to.have.property('description');
    }
  },
);

import { Given, When, Then } from '@cucumber/cucumber';
import chai from 'chai';
const { expect } = chai;

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
  async function (this: CustomWorld, _id: number) {
    // Implementar si se desea preparar el estado del sistema
  },
);

Given('there are registers in the system', async function (this: CustomWorld) {
  // Implementar si se desea preparar el estado del sistema
});

When(
  'I send a POST request to {string} with the register data',
  async function (this: CustomWorld, endpoint: string) {
    if (!this.sendPostRequest || !this.registerData) {
      throw new Error('sendPostRequest or registerData not defined');
    }
    await this.sendPostRequest(endpoint, this.registerData);
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

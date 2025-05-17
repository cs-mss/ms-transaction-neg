import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../src/context/shared/infrastructure/modules/app.module';
import request from 'supertest';

export class CertificateData {
  number: string;
  description: string;
  date: string;
  amount: number;
  dependency: string;
}

export class RegisterData {
  number: string;
  description: string;
  date: string;
  amount: number;
  contractDescription: string;
  thirdParty: string;
  certificateId: number;
}

export class CertificateResponse {
  id?: number;
  number: string;
  description: string;
  date: string;
  amount: number;
  dependency: string;
}

export class RegisterResponse {
  id?: number;
  number: string;
  description: string;
  date: string;
  amount: number;
  contractDescription: string;
  thirdParty: string;
  certificateId: number;
}

export class ApiResponse {
  status: number;
  body:
    | CertificateResponse
    | RegisterResponse
    | CertificateResponse[]
    | RegisterResponse[]
    | Record<string, unknown>;
}

export class CustomWorld {
  app: INestApplication;
  response: ApiResponse;
  certificateData: CertificateData;
  registerData: RegisterData;
  attach: any;
  log: any;
  parameters: any;
  link: any;

  constructor(options: IWorldOptions) {
    Object.assign(this, options);
  }

  async setupApp(): Promise<void> {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleFixture.createNestApplication();
    await this.app.init();
  }

  async sendGetRequest(endpoint: string): Promise<void> {
    if (!this.app) {
      await this.setupApp();
    }
    const httpServer = this.app.getHttpServer();
    const response = await request(httpServer)
      .get(endpoint)
      .set('Accept', 'application/json');

    this.response = {
      status: response.status,
      body: response.body,
    };
  }

  async sendPostRequest(
    endpoint: string,
    data: CertificateData | RegisterData,
  ): Promise<void> {
    if (!this.app) {
      await this.setupApp();
    }
    const httpServer = this.app.getHttpServer();
    const response = await request(httpServer)
      .post(endpoint)
      .send(data)
      .set('Accept', 'application/json');

    this.response = {
      status: response.status,
      body: response.body,
    };
  }
}

setWorldConstructor(CustomWorld);

import { setWorldConstructor, IWorldOptions, World } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@context/shared/infrastructure/modules/app.module';
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

export class CustomWorld extends World {
  app: INestApplication;
  response: ApiResponse;
  certificateData: CertificateData;
  registerData: RegisterData;

  constructor(options: IWorldOptions) {
    super(options);
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
    const response = await request(this.app.getHttpServer())
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
    const response = await request(this.app.getHttpServer())
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

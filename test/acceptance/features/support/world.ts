import { setWorldConstructor, IWorldOptions, World } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
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

  async sendGetRequest(endpoint: string): Promise<void> {
    if (!this.app) {
      throw new Error('App is not initialized');
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
      throw new Error('App is not initialized');
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

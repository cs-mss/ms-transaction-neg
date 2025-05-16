import { Document } from './Document';
import { DocumentCertificate } from './DocumentCertificate';

export class DocumentRegister extends Document {
  constructor(
    id: number,
    number: string,
    description: string,
    date: Date,
    amount: number,
    createdAt: string,
    updatedAt: string,
    readonly contractDescription: string,
    readonly thirdParty: string,
    readonly certificate: DocumentCertificate,
  ) {
    super(id, number, description, date, amount, createdAt, updatedAt);
  }
}

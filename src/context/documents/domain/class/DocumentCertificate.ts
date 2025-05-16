import { Document } from './Document';

export class DocumentCertificate extends Document {
  constructor(
    id: number,
    number: string,
    description: string,
    date: Date,
    amount: number,
    createdAt: string,
    updatedAt: string,
    readonly dependency: string,
  ) {
    super(id, number, description, date, amount, createdAt, updatedAt);
  }

  isValidAmount() {
    //validar monto total de los registros presupuestales
  }
}

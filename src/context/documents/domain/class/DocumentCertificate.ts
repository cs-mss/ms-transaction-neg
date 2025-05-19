import { Document } from './Document';
import { DocumentValidationError } from '../errors/DocumentValidationError';

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

  public validateDateNotInFuture(): void {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const certificateDate = new Date(this.date);
    certificateDate.setHours(0, 0, 0, 0);

    if (certificateDate > currentDate) {
      throw new DocumentValidationError(
        'La fecha del certificado no puede ser posterior a la fecha actual',
      );
    }
  }

  public validatePositiveAmount(): void {
    if (this.amount <= 0) {
      throw new DocumentValidationError(
        'El monto del certificado debe ser mayor que cero',
      );
    }
  }

  public validate(): void {
    this.validateDateNotInFuture();
    this.validatePositiveAmount();
  }
}

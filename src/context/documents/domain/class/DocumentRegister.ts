import { Document } from './Document';
import { DocumentCertificate } from './DocumentCertificate';
import { DocumentValidationError } from '../errors/DocumentValidationError';

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

  public validateDateNotBeforeCertificate(): void {
    const registerDate = new Date(this.date);
    registerDate.setHours(0, 0, 0, 0);

    const certificateDate = new Date(this.certificate.date);
    certificateDate.setHours(0, 0, 0, 0);

    if (registerDate < certificateDate) {
      throw new DocumentValidationError(
        'La fecha del registro no puede ser anterior a la fecha del certificado asociado',
      );
    }
  }

  public validateDateNotInFuture(): void {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const registerDate = new Date(this.date);
    registerDate.setHours(0, 0, 0, 0);

    if (registerDate > currentDate) {
      throw new DocumentValidationError(
        'La fecha del registro no puede ser posterior a la fecha actual',
      );
    }
  }

  public validatePositiveAmount(): void {
    if (this.amount <= 0) {
      throw new DocumentValidationError(
        'El monto del registro debe ser mayor que cero',
      );
    }
  }

  public validateAmountNotExceedCertificate(): void {
    if (this.amount > this.certificate.amount) {
      throw new DocumentValidationError(
        'El monto del registro no puede exceder el monto del certificado asociado',
      );
    }
  }

  public validate(): void {
    this.validateDateNotBeforeCertificate();
    this.validateDateNotInFuture();
    this.validatePositiveAmount();
    this.validateAmountNotExceedCertificate();
  }
}

import { Document } from './Document';
import { DocumentValidationError } from '../errors/DocumentValidationError';
import { DocumentRegister } from './DocumentRegister';

export class DocumentOrder extends Document {
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
    readonly register: DocumentRegister,
  ) {
    super(id, number, description, date, amount, createdAt, updatedAt);
  }

  public validateDateNotBeforeregister(): void {
    const orderDate = new Date(this.date);
    orderDate.setHours(0, 0, 0, 0);

    const registerDate = new Date(this.register.date);
    registerDate.setHours(0, 0, 0, 0);

    if (orderDate < registerDate) {
      throw new DocumentValidationError(
        'La fecha del orden no puede ser anterior a la fecha del registro asociado',
      );
    }
  }

  public validateDateNotInFuture(): void {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const OrderDate = new Date(this.date);
    OrderDate.setHours(0, 0, 0, 0);

    if (OrderDate > currentDate) {
      throw new DocumentValidationError(
        'La fecha del orden no puede ser posterior a la fecha actual',
      );
    }
  }

  public validatePositiveAmount(): void {
    if (this.amount <= 0) {
      throw new DocumentValidationError(
        'El monto del orden debe ser mayor que cero',
      );
    }
  }

  public validateAmountNotExceedregister(): void {
    if (this.amount > this.register.amount) {
      throw new DocumentValidationError(
        'El monto del orden no puede exceder el monto del registrp asociado',
      );
    }
  }

  public validate(): void {
    this.validateDateNotBeforeregister();
    this.validateDateNotInFuture();
    this.validatePositiveAmount();
    this.validateAmountNotExceedregister();
  }
}

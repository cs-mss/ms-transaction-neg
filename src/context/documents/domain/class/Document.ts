export class Document {
  constructor(
    readonly id: number,
    readonly number: string,
    readonly description: string,
    readonly date: Date,
    readonly amount: number,
    readonly createdAt: string,
    readonly updatedAt: string,
  ) {}
}

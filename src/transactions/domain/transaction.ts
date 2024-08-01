export class Transaction {
  constructor(
    readonly id: string,
    readonly total: number,
    readonly productId: string,
    readonly quantity: string,
    readonly status: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}

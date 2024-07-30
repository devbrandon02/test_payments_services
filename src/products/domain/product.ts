export class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly image: string,
    readonly description: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}

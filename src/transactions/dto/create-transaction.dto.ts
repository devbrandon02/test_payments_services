import { StatusTransaccionEnum } from 'src/utils/enum/transaction/statusTransaccionEnum';
import { Transaction } from '../domain/transaction';
export class CreateTransactionDto {
  date: Date;
  total: number;
  product_id: string;
  product_price: number;
  card_number: string;
  card_holder: string;
  card_exp_month: string;
  card_exp_year: string;
  product_quantity: number;
  installments: number;
  card_cvv: string;
  delivery_fee: number;
  customer_email: string;
  acceptance_token: string;
  status: StatusTransaccionEnum;
}

export class CreatetransactionDtoResponse {
  payment: Transaction;
  msg: string;
  version: string;
}

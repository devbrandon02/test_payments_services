import {
  CreateTransactionDto,
  CreatetransactionDtoResponse,
} from './../dto/create-transaction.dto';
import { GetAcceptanceTokenDto } from '../dto/get-acceptance-token.dto';

export interface ITransactionRepository {
  createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<CreatetransactionDtoResponse>;
  getAcceptanceToken(pub_key: string): Promise<GetAcceptanceTokenDto>;
  // acceptanceToken(): Promise;
}

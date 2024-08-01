import { Injectable, Inject } from '@nestjs/common';
import { GetAcceptanceTokenDto } from '../dto/get-acceptance-token.dto';
import { ITransactionRepository } from '../domain/transaction-repository';
import {
  CreateTransactionDto,
  CreatetransactionDtoResponse,
} from '../dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly TransactionRepository: ITransactionRepository,
  ) {}

  async createPayment(
    createPaymentDto: CreateTransactionDto,
  ): Promise<CreatetransactionDtoResponse> {
    return this.TransactionRepository.createTransaction(createPaymentDto);
  }

  async getAcceptanceToken(pub_key: string): Promise<GetAcceptanceTokenDto> {
    return this.TransactionRepository.getAcceptanceToken(pub_key);
  }
}

import { CreateTransactionDto } from '../../../../dto/create-transaction.dto';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TransactionService } from 'src/transactions/application/transaction.service';
import { V1_PAYMENT } from 'src/transactions/infrastructure/route.version';

@Controller(`${V1_PAYMENT}/create`)
export class createPaymentController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreateTransactionDto,
    @Res() res: Response,
  ) {
    try {
      const transactionResponse =
        await this.transactionService.createPayment(createPaymentDto);

      res.json(transactionResponse);
    } catch (error) {
      res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      res.json({
        payment_error: error,
      });
    }
  }
}

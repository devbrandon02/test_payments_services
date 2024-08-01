import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from 'src/transactions/application/transaction.service';
import { GetAcceptanceTokenDto } from 'src/transactions/dto/get-acceptance-token.dto';

@Controller(`v1/acceptance-token/:pub_key`)
export class AcceptanceTokenController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAcceptanceToken(
    @Param() params: any,
  ): Promise<GetAcceptanceTokenDto> {
    const acceptanceToken = await this.transactionService.getAcceptanceToken(
      params.pub_key,
    );

    return acceptanceToken;
  }
}

import prisma from 'prisma/client/prisma-client';
import { ITransactionRepository } from '../domain/transaction-repository';
import {
  CreateTransactionDto,
  CreatetransactionDtoResponse,
} from '../dto/create-transaction.dto';
import { GetAcceptanceTokenDto } from '../dto/get-acceptance-token.dto';
import { TokenCardDto } from '../dto/token-card-dto';
import { CreatePaymentResourceDto } from '../dto/create-payment-resource.dto';
import { paymentReference } from 'src/utils/hash/payment_reference';
import { encryptIntegritySign } from 'src/utils/hash/integrity';
import { StatusTransaccionEnum } from 'src/utils/enum/transaction/statusTransaccionEnum';
import { CreateTransactionDetailDto } from '../dto/create-detail-transaction.dto';
import { ProductService } from 'src/products/application/product.service';

export class TransactionRepository implements ITransactionRepository {
  constructor(
    private _WOMPI_API_URL: string = process.env.WOMPI_API_URL,
    private _WOMPI_PUB_KEY: string = process.env.WOMPI_PUB_KEY,
    private _WOMPI_PRV_KEY: string = process.env.WOMPI_PRV_KEY,
    private _WOMPI_INTEGRITY: string = process.env.WOMPI_INTEGRITY,
    private _productService: ProductService,
  ) {}

  private async createTransactionDetails(
    createTransactionDetailDto: CreateTransactionDetailDto,
  ) {
    try {
      const transactional_detail = prisma.transactionDetail.create({
        data: {
          unitPrice: createTransactionDetailDto.unitPrice,
          quantity: createTransactionDetailDto.quantity,
          transactionId: createTransactionDetailDto.transactionId,
          productId: createTransactionDetailDto.productId,
        },
      });

      return transactional_detail;
    } catch (error) {
      throw new Error('Error creating transaction details');
    }
  }

  private async getTransactionStatus(transaction_id: string) {
    try {
      const get_transaction_status = await fetch(
        `${this._WOMPI_API_URL}/transactions/${transaction_id}`,
        {
          method: 'GET',
        },
      );

      const get_transaction_status_json = await get_transaction_status.json();

      return get_transaction_status_json;
    } catch (error) {
      throw new Error('Error getting transaction status');
    }
  }

  private async createTransactionProvider({
    amount_in_cents,
    currency,
    signature,
    payment_method,
    customer_email,
    payment_source_id,
    reference,
    payment_description,
  }) {
    try {

      const create_transaction_provider = await fetch(
        `${this._WOMPI_API_URL}/transactions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this._WOMPI_PRV_KEY}`,
          },
          body: JSON.stringify({
            amount_in_cents,
            currency,
            payment_method,
            signature,
            customer_email,
            payment_source_id,
            reference,
            payment_description,
          }),
        },
      );

      const create_transaction_provider_json =
        await create_transaction_provider.json();

      console.log(
        'create_transaction_provider_json',
        JSON.stringify(create_transaction_provider_json),
      );

      return create_transaction_provider_json;
    } catch (error) {
      console.log('error', error);

      throw new Error('Error creating transaction provider');
    }
  }

  private async createPaymentResource(
    createPaymentResourceDto: CreatePaymentResourceDto,
  ) {
    try {
      const create_payment_resource = await fetch(
        `${this._WOMPI_API_URL}/payment_sources`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this._WOMPI_PRV_KEY}`,
          },
          body: JSON.stringify({
            token: createPaymentResourceDto.token,
            type: 'CARD',
            customer_email: createPaymentResourceDto.customer_email,
            acceptance_token: createPaymentResourceDto.acceptance_token,
          }),
        },
      );

      const create_payment_resource_json = await create_payment_resource.json();

      return create_payment_resource_json;
    } catch (error) {
      console.log('error', error);

      throw new Error('Error creating payment resource');
    }
  }

  private async token_card(tokenCardDto: TokenCardDto) {
    try {
      console.log('tokenCardDto', tokenCardDto);
      const token_card = await fetch(`${this._WOMPI_API_URL}/tokens/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._WOMPI_PUB_KEY}`,
        },

        body: JSON.stringify({
          number: tokenCardDto.card_number,
          card_holder: tokenCardDto.card_holder,
          exp_month: tokenCardDto.card_exp_month,
          exp_year: tokenCardDto.card_exp_year,
          cvc: tokenCardDto.card_cvv,
        }),
      });

      const token_card_json = await token_card.json();

      console.log('data', token_card_json);
      return token_card_json;
    } catch (error) {
      console.log('error', error);

      throw new Error('Error creating token card');
    }
  }

  acceptanceToken() {
    throw new Error('Method not implemented.');
  }

  async getAcceptanceToken(): Promise<GetAcceptanceTokenDto> {
    try {
      const acceptance_token = await fetch(
        `${this._WOMPI_API_URL}/merchants/${this._WOMPI_PUB_KEY}`,
      );

      const { data } = await acceptance_token.json();

      return {
        acceptance_token: data.presigned_acceptance.acceptance_token,
        permalink: data.presigned_acceptance.permalink,
        type: data.presigned_acceptance.type,
      };
    } catch (error) {
      throw new Error('Error getting acceptance token');
    }
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<CreatetransactionDtoResponse> {
    try {
      const transactionCreate = await prisma.transaction.create({
        data: {
          total: createTransactionDto.total,
          productId: createTransactionDto.product_id,
          quantity: createTransactionDto.product_quantity,
          baseFee: 1000,
          deliveryFee: 5000,
          status: createTransactionDto.status,
          createdAt: new Date(),
        },
      });

      if (!transactionCreate) {
        throw new Error('Error creating transaction');
      }

      const tokenCard = await this.token_card({
        card_number: createTransactionDto.card_number,
        card_holder: createTransactionDto.card_holder,
        card_exp_month: createTransactionDto.card_exp_month,
        card_exp_year: createTransactionDto.card_exp_year,
        card_cvv: createTransactionDto.card_cvv,
      });

      console.log('tokenCard', tokenCard);

      if (tokenCard.status !== 'CREATED') {
        throw new Error('Error creating token card');
      }

      if (!createTransactionDto.acceptance_token) {
        throw new Error('Error getting acceptance token');
      }

      console.log('acceptanceToken', createTransactionDto.acceptance_token);

      const paymentResource = await this.createPaymentResource({
        customer_email: createTransactionDto.customer_email,
        type: 'CARD',
        token: tokenCard.data.id,
        acceptance_token: createTransactionDto.acceptance_token,
      });

      if (
        !paymentResource ||
        paymentResource.type === 'INPUT_VALIDATION_ERROR'
      ) {
        throw new Error('Error creating payment resource');
      }

      console.log('paymentResource', JSON.stringify(paymentResource));

      const paymentRefence = paymentReference(
        createTransactionDto.customer_email,
        Date.now(),
      );

      console.log('paymentRefence', paymentRefence);

      const signature = encryptIntegritySign(
        paymentRefence,
        createTransactionDto.total * 100,
        'COP',
        this._WOMPI_INTEGRITY,
      );

      console.log('signature', signature, createTransactionDto);

      const transactionProvider = await this.createTransactionProvider({
        amount_in_cents: createTransactionDto.total * 100,
        currency: 'COP',
        payment_method: {
          type: 'CARD',
          token: tokenCard.data.id,
          installments: createTransactionDto.installments,
        },
        signature,
        customer_email: createTransactionDto.customer_email,
        payment_source_id: paymentResource.id,
        reference: paymentRefence,
        payment_description: 'Payment description',
      });

      if (
        !transactionProvider ||
        transactionProvider.type === 'INPUT_VALIDATION_ERROR'
      ) {
        throw new Error('Error creating transaction provider');
      }

      const transactionStatus = await this.getTransactionStatus(
        transactionProvider.id,
      );

      if (transactionStatus.status === 'APPROVED') {
        const transactionUpdate = await prisma.transaction.update({
          where: {
            id: transactionCreate.id,
          },
          data: {
            status: StatusTransaccionEnum.APPROVED,
          },
        });

        if (!transactionUpdate) {
          throw new Error('Error updating transaction');
        }

        const transactionDetail = await this.createTransactionDetails({
          unitPrice: createTransactionDto.total,
          quantity: createTransactionDto.product_quantity,
          transactionId: transactionUpdate.id,
          productId: createTransactionDto.product_id,
        });

        if (!transactionDetail) {
          throw new Error('Error creating transaction details');
        }

        const product = await this._productService.getProductById(
          transactionDetail.productId,
        );

        if (!product) {
          throw new Error('Error getting product');
        }

        await prisma.product.update({
          where: {
            id: product.product.id,
          },
          data: {
            stock: product.product.stock - transactionDetail.quantity,
          },
        });

        return {
          version: '1',
          msg: 'Payment created',
          payment: {
            id: transactionUpdate.id,
            total: transactionUpdate.total,
            productId: transactionUpdate.productId,
            status: transactionUpdate.status,
            createdAt: transactionUpdate.createdAt,
            updatedAt: transactionUpdate.updatedAt,
            quantity: String(transactionUpdate.quantity),
          },
        };
      }
    } catch (error) {
      console.log('error', error);

      throw new Error('Error creating transaction');
    }
  }
}

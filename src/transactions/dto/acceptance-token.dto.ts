enum PaymentMethods {
  NEQUI = 'NEQUI',
  CARD = 'CARD',
}

export class AcceptanceTokenDto {
  acceptance_token: string;
  amount_in_cents: number;
  currency: string;
  signature: string;
  customer_email: string;
  reference: string;
  payment_method: {
    type: PaymentMethods;
    phone_number: string;
  };
}

export class AcceptanceTokenDtoResponse {
  acceptance_token: string;
  permalink: string;
  type: string;
}

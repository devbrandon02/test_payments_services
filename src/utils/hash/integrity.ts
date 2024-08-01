import * as crypto from 'crypto';

export function encryptIntegritySign(
  reference: string,
  amount: number,
  currency: string,
  integritySecret: string,
  expirationTime?: string,
): string {
  let stringHash = `${reference}${amount}${currency}`;
  if (expirationTime) {
    stringHash += expirationTime;
  }
  stringHash += integritySecret;

  const hash = crypto.createHash('sha256').update(stringHash).digest('hex');
  return hash;
}

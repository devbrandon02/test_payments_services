import * as crypto from 'crypto';

export function paymentReference(email: string, date: number): string {
  const stringHash = `${email}${date}`;
  const hash = crypto.createHash('sha256').update(stringHash).digest('hex');
  return hash;
}

import Cryptr from 'cryptr';

/**
 * This function is used to decrypt the given value using the ENCRYPTION_KEY in .env.
 */
export async function decrypt(value: string, secret: string): Promise<string> {
  const cryptr = new Cryptr(secret);
  return cryptr.decrypt(value);
}

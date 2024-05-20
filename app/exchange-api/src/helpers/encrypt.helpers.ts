import Cryptr from 'cryptr';

/**
 * This function is used the encrypt the given value using the ENCRYPTION_KEY in .env.
 */
export async function encrypt(value: string, secret: string): Promise<string> {
  const cryptr = new Cryptr(secret, { pbkdf2Iterations: 10000, saltLength: 10 });
  return cryptr.encrypt(value);
}

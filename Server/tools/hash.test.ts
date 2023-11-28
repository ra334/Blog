import { describe, it, expect } from 'vitest';
import * as bcrypt from 'bcrypt';
import hashPassword from './hash';

describe('hashPassword function', () => {
  it('should hash the password correctly', () => {
    const password = 'testPassword'
    const hashedPassword = hashPassword(password)

    expect(hashedPassword).not.equal(hashPassword, password)
    expect(bcrypt.compare(password, hashedPassword)).toBeTruthy()
  });

  it('should generate different hashes for different passwords', () => {
    const password1 = 'password1';
    const password2 = 'password2';

    const hashedPassword1 = hashPassword(password1);
    const hashedPassword2 = hashPassword(password2);

    expect(hashedPassword1).not.equal(hashedPassword2)
  });
});

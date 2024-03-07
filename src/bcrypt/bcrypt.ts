import bcrypt from 'bcrypt'

const saltRounds = 10;

export function hashPassword(plainPassword: string): string {
  return bcrypt.hashSync(plainPassword, saltRounds)
}

export function comparePassword(plainPassword: string, hash: string): boolean {
  return bcrypt.compareSync(plainPassword, hash)
}

export function isPasswordSafe(password: string): boolean {
  if (password.length < 8) {
    return false;
  }
  
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;

  if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !digitRegex.test(password)) {
    return false;
  }

  const commonPasswords = ['password', '123456', 'qwerty', 'asd123'];
  if (commonPasswords.includes(password.toLowerCase())) {
    return false;
  }

  return true;
}
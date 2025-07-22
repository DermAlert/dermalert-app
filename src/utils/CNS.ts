export function isValidCNS(cns: string): boolean {
  const digits = cns.replace(/\D/g, '');

  if (digits.length !== 15) return false;

  const firstDigit = digits[0];
  const weights = Array.from({ length: 15 }, (_, i) => 15 - i);

  const sum = digits
    .split('')
    .map((digit, i) => Number(digit) * weights[i])
    .reduce((acc, curr) => acc + curr, 0);

  const remainder = sum % 11;
  const dv = remainder === 0 ? 0 : 11 - remainder;

  // Verifica se o último dígito (dígito verificador) está correto
  const expectedDV = Number(digits[14]);
  return dv === expectedDV;
}

export function formatCNS(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 15); // Limita a 15 dígitos

  return digits
    .replace(/^(\d{3})(\d)/, '$1 $2')
    .replace(/^(\d{3}) (\d{4})(\d)/, '$1 $2 $3')
    .replace(/^(\d{3}) (\d{4}) (\d{4})(\d)/, '$1 $2 $3 $4');
}
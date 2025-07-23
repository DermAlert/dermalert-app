export function isValidCNS(cns: string): boolean {
  const digits = cns.replace(/\D/g, '');

  if (digits.length !== 15) return false;

  const firstDigit = digits[0];

  // CNS válidos começando com 1 ou 2 (gerados a partir do PIS/PASEP)
  if (firstDigit === '1' || firstDigit === '2') {
    const pis = digits.substring(0, 11);
    let sum = 0;

    const weights = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5];
    for (let i = 0; i < 11; i++) {
      sum += parseInt(pis[i], 10) * weights[i];
    }

    let remainder = sum % 11;
    let dv = 11 - remainder;

    let resultado: string;
    if (dv === 11) dv = 0;

    if (dv === 10) {
      sum += 2;
      remainder = sum % 11;
      dv = 11 - remainder;
      resultado = pis + '001' + dv.toString();
    } else {
      resultado = pis + '000' + dv.toString();
    }

    return digits === resultado;
  }

  // CNS provisórios começando com 7, 8 ou 9
  if (['7', '8', '9'].includes(firstDigit)) {
    const weights = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let sum = 0;

    for (let i = 0; i < 15; i++) {
      sum += parseInt(digits[i], 10) * weights[i];
    }

    return sum % 11 === 0;
  }

  // Qualquer outro início é inválido
  return false;
}


export function formatCNS(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 15); // Limita a 15 dígitos

  return digits
    .replace(/^(\d{3})(\d)/, '$1 $2')
    .replace(/^(\d{3}) (\d{4})(\d)/, '$1 $2 $3')
    .replace(/^(\d{3}) (\d{4}) (\d{4})(\d)/, '$1 $2 $3 $4');
}
// export const formatCPF = (value: string) => {
//   return value
//     .replace(/\D/g, '') // Remove tudo que não for número
//     .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto depois dos 3 primeiros dígitos
//     .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto depois dos 6 primeiros dígitos
//     .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca traço antes dos últimos 2 dígitos
// };



export function formatCPF(value: string) {
  const numericValue = value.replace(/\D/g, '');

  if (numericValue.length <= 3)
    return numericValue;
  if (numericValue.length <= 6)
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
  if (numericValue.length <= 9)
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
  return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
}

// utils/isValidCPF.ts
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let check1 = (sum * 10) % 11;
  if (check1 === 10 || check1 === 11) check1 = 0;
  if (check1 !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let check2 = (sum * 10) % 11;
  if (check2 === 10 || check2 === 11) check2 = 0;

  return check2 === parseInt(cpf.charAt(10));
}


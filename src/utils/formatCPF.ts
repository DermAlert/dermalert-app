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

export const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto depois dos 3 primeiros dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto depois dos 6 primeiros dígitos
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca traço antes dos últimos 2 dígitos
};
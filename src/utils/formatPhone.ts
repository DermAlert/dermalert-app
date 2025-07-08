export const formatPhone = (phone: string) => {
  // Remove tudo que não for número
  const cleaned = phone.replace(/\D/g, '');

  // Se for celular com DDD (11 dígitos): (XX) 9XXXX-XXXX
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  // Se for fixo com DDD (10 dígitos): (XX) XXXX-XXXX
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  // Se não bater com os padrões, retorna apenas os números
  return cleaned;
};

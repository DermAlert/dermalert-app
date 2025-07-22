// export const formatPhone = (phone: string) => {
//   const cleaned = phone.replace(/\D/g, '');

//   if (cleaned.length === 11) {
//     return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
//   }

//   if (cleaned.length === 10) {
//     return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
//   }

//   return cleaned;
// };



export const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 0) return '';

  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  }

  if (cleaned.length <= 3) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }

  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}`;
  }

  if (cleaned.length <= 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, cleaned.length - 4)}-${cleaned.slice(-4)}`;
  }

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

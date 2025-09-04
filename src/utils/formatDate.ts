// export const formatDate = (date: string) => {
//   const day = date.split("/")[0];
//   const month = date.split("/")[1];
//   const year = date.split("/")[2];

//   const newDateFormatted = new Date(
//     ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year
//   );

//   return newDateFormatted.toISOString().split("T")[0];
// };

export const formatDate = (date: string) => {
  const [dia, mes, ano] = date.split('/');
  return `${ano}-${mes}-${dia}`;
}

export function formatDateToBr(date: string): string {
  if (!date) return '';
  
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return '';

  return `${day}/${month}/${year}`;
}

export function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

export function formatDateFromApi(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Janeiro = 0
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

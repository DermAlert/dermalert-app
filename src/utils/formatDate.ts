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

export function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

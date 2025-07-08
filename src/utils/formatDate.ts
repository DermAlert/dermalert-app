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
  // dataBR no formato "dd/mm/aaaa"
  const [dia, mes, ano] = date.split('/');
  return `${ano}-${mes}-${dia}`;
}
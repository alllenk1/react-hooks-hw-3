export const getEndDate = () => {
  const date = new Date();
  const [day, month, year] = date.toLocaleDateString().split('.');

  return `${year}-${month}-${day}`;
}

export const getStartDate = (period: number) => {
  let date = new Date();
  date.setDate(date.getDate() - period);
  const [day, month, year] = date.toLocaleDateString().split('.');

  return `${year}-${month}-${day}`;
}
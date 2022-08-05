export const formatDate = (date: Date, separator: string) => {
  const year = date.getFullYear();
  const month = `00${date.getMonth() + 1}`.slice(-2);
  const day = `00${date.getDate()}`.slice(-2);
  return `${year}${separator}${month}${separator}${day}`;
};

export const getAge = (birthday: Date, today?: Date) => {
  const t = today ?? new Date(Date.now());
  const todayYear = t.getFullYear();
  const thisYearsBirthday = new Date(todayYear, birthday.getMonth(), birthday.getDate());

  let age = todayYear - birthday.getFullYear();
  if (t < thisYearsBirthday) age--;
  return age;
};

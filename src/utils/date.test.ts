import { formatDate, getAge } from './date';

test('formatDate', () => {
  const date = new Date(2021, 0, 1, 11, 22, 33, 44);
  expect(formatDate(date, '/')).toBe('2021/01/01');
  expect(formatDate(date, '-')).toBe('2021-01-01');
});

test('getAge', () => {
  const birthday = new Date('2000/02/29');
  expect(getAge(birthday, new Date('2020/02/28'))).toBe(19);
  expect(getAge(birthday, new Date('2020/02/29'))).toBe(20);
  expect(getAge(birthday, new Date('2021/02/28'))).toBe(20);
  expect(getAge(birthday, new Date('2021/03/01'))).toBe(21);
});

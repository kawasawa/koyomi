import { ERAS, getEraYear, getJpMonth, getJpWeek, JP_MONTHS, JP_WEEKS } from './JaDatePicker';

const createDate = (year: number, month: number, day: number) => new Date(year, month - 1, day);

describe('JaDatePicker', () => {
  test('元号の取得', () => {
    expect(() => getEraYear(createDate(1865, 4, 7))).toThrow(RangeError);
    expect(getEraYear(createDate(1865, 4, 8))).toBe(`${ERAS[0].name}元`);
    expect(getEraYear(createDate(1868, 9, 7))).toBe(`${ERAS[0].name}4`);
    expect(getEraYear(createDate(1868, 9, 8))).toBe(`${ERAS[1].name}元`);
    expect(getEraYear(createDate(1912, 7, 29))).toBe(`${ERAS[1].name}45`);
    expect(getEraYear(createDate(1912, 7, 30))).toBe(`${ERAS[2].name}元`);
    expect(getEraYear(createDate(1926, 12, 24))).toBe(`${ERAS[2].name}15`);
    expect(getEraYear(createDate(1926, 12, 25))).toBe(`${ERAS[3].name}元`);
    expect(getEraYear(createDate(1989, 1, 7))).toBe(`${ERAS[3].name}64`);
    expect(getEraYear(createDate(1989, 1, 8))).toBe(`${ERAS[4].name}元`);
    expect(getEraYear(createDate(2019, 4, 30))).toBe(`${ERAS[4].name}31`);
    expect(getEraYear(createDate(2019, 5, 1))).toBe(`${ERAS[5].name}元`);
    expect(getEraYear(createDate(2099, 12, 31))).toBe(`${ERAS[5].name}81`);
  });

  test('和風月名の取得', () => {
    expect(getJpMonth(createDate(2021, 1, 1))).toBe(JP_MONTHS[0]);
    expect(getJpMonth(createDate(2021, 2, 1))).toBe(JP_MONTHS[1]);
    expect(getJpMonth(createDate(2021, 3, 1))).toBe(JP_MONTHS[2]);
    expect(getJpMonth(createDate(2021, 4, 1))).toBe(JP_MONTHS[3]);
    expect(getJpMonth(createDate(2021, 5, 1))).toBe(JP_MONTHS[4]);
    expect(getJpMonth(createDate(2021, 6, 1))).toBe(JP_MONTHS[5]);
    expect(getJpMonth(createDate(2021, 7, 1))).toBe(JP_MONTHS[6]);
    expect(getJpMonth(createDate(2021, 8, 1))).toBe(JP_MONTHS[7]);
    expect(getJpMonth(createDate(2021, 9, 1))).toBe(JP_MONTHS[8]);
    expect(getJpMonth(createDate(2021, 10, 1))).toBe(JP_MONTHS[9]);
    expect(getJpMonth(createDate(2021, 11, 1))).toBe(JP_MONTHS[10]);
    expect(getJpMonth(createDate(2021, 12, 1))).toBe(JP_MONTHS[11]);
  });

  test('曜日の取得', () => {
    expect(getJpWeek(createDate(2021, 1, 1))).toBe(JP_WEEKS[5]);
    expect(getJpWeek(createDate(2021, 1, 2))).toBe(JP_WEEKS[6]);
    expect(getJpWeek(createDate(2021, 1, 3))).toBe(JP_WEEKS[0]);
    expect(getJpWeek(createDate(2021, 1, 4))).toBe(JP_WEEKS[1]);
    expect(getJpWeek(createDate(2021, 1, 5))).toBe(JP_WEEKS[2]);
    expect(getJpWeek(createDate(2021, 1, 6))).toBe(JP_WEEKS[3]);
    expect(getJpWeek(createDate(2021, 1, 7))).toBe(JP_WEEKS[4]);
  });
});

import JapaneseLunisolarCalendar from './JapaneseLunisolarCalendar';
import {
  createCalendarInfo,
  getRokuyo,
  getZodiacYear,
  getZodiacMonth,
  getZodiacDay,
  getSeason,
  getSign,
  getLunaPhase,
  getTidePhase,
  JIKKAN,
  JUNISHI,
  ROKUYO,
  SEASON4,
  SEASON24,
  SEASON72,
  SIGN12,
  SIGN13,
  LUNA_PHASES,
  TIDE_PHASES,
  getNijuhashuku,
  ASTROLOGY28,
  getJunichoku,
  JUNICHOKU,
  getSetsuMonth,
  getJulianDayRevise,
  getLilianDay,
} from './CalendarInfo';

const createDate = (year: number, month: number, day: number) => new Date(year, month - 1, day);

const createLuna = (year: number, month: number, day: number) =>
  new JapaneseLunisolarCalendar(createDate(year, month, day));

test('暦注の生成', () => {
  expect(createCalendarInfo(new JapaneseLunisolarCalendar(new Date('2021/01/99')))).toBeUndefined();
  expect(createCalendarInfo(new JapaneseLunisolarCalendar(new Date('2021/01/01')))).toBeDefined();
});

test('節月の取得', () => {
  expect(getSetsuMonth({ value: '立春', startAt: 1 })).toBe(12);
  expect(getSetsuMonth({ value: '立春', startAt: 0 })).toBe(1);
  expect(getSetsuMonth({ value: '啓蟄', startAt: 1 })).toBe(1);
  expect(getSetsuMonth({ value: '啓蟄', startAt: 0 })).toBe(2);
  expect(getSetsuMonth({ value: '清明', startAt: 1 })).toBe(2);
  expect(getSetsuMonth({ value: '清明', startAt: 0 })).toBe(3);
  expect(getSetsuMonth({ value: '立夏', startAt: 1 })).toBe(3);
  expect(getSetsuMonth({ value: '立夏', startAt: 0 })).toBe(4);
  expect(getSetsuMonth({ value: '芒種', startAt: 1 })).toBe(4);
  expect(getSetsuMonth({ value: '芒種', startAt: 0 })).toBe(5);
  expect(getSetsuMonth({ value: '小暑', startAt: 1 })).toBe(5);
  expect(getSetsuMonth({ value: '小暑', startAt: 0 })).toBe(6);
  expect(getSetsuMonth({ value: '立秋', startAt: 1 })).toBe(6);
  expect(getSetsuMonth({ value: '立秋', startAt: 0 })).toBe(7);
  expect(getSetsuMonth({ value: '白露', startAt: 1 })).toBe(7);
  expect(getSetsuMonth({ value: '白露', startAt: 0 })).toBe(8);
  expect(getSetsuMonth({ value: '寒露', startAt: 1 })).toBe(8);
  expect(getSetsuMonth({ value: '寒露', startAt: 0 })).toBe(9);
  expect(getSetsuMonth({ value: '立冬', startAt: 1 })).toBe(9);
  expect(getSetsuMonth({ value: '立冬', startAt: 0 })).toBe(10);
  expect(getSetsuMonth({ value: '大雪', startAt: 1 })).toBe(10);
  expect(getSetsuMonth({ value: '大雪', startAt: 0 })).toBe(11);
  expect(getSetsuMonth({ value: '小寒', startAt: 1 })).toBe(11);
  expect(getSetsuMonth({ value: '小寒', startAt: 0 })).toBe(12);
});

test('六曜の取得', () => {
  expect(getRokuyo(createLuna(2021, 1, 1))).toBe(ROKUYO[3]);
  expect(getRokuyo(createLuna(2021, 1, 2))).toBe(ROKUYO[4]);
  expect(getRokuyo(createLuna(2021, 1, 3))).toBe(ROKUYO[5]);
  expect(getRokuyo(createLuna(2021, 1, 4))).toBe(ROKUYO[0]);
  expect(getRokuyo(createLuna(2021, 1, 5))).toBe(ROKUYO[1]);
  expect(getRokuyo(createLuna(2021, 1, 6))).toBe(ROKUYO[2]);
});

test('十二直の取得', () => {
  expect(getJunichoku(createDate(2021, 2, 1).getJulianDay(), 12)).toBe(JUNICHOKU[3]);
  expect(getJunichoku(createDate(2021, 2, 2).getJulianDay(), 12)).toBe(JUNICHOKU[4]);
  expect(getJunichoku(createDate(2021, 2, 3).getJulianDay(), 1)).toBe(JUNICHOKU[4]);
  expect(getJunichoku(createDate(2021, 2, 4).getJulianDay(), 1)).toBe(JUNICHOKU[5]);
  expect(getJunichoku(createDate(2021, 2, 5).getJulianDay(), 1)).toBe(JUNICHOKU[6]);
  expect(getJunichoku(createDate(2021, 2, 6).getJulianDay(), 1)).toBe(JUNICHOKU[7]);
  expect(getJunichoku(createDate(2021, 2, 7).getJulianDay(), 1)).toBe(JUNICHOKU[8]);
  expect(getJunichoku(createDate(2021, 2, 8).getJulianDay(), 1)).toBe(JUNICHOKU[9]);
  expect(getJunichoku(createDate(2021, 2, 9).getJulianDay(), 1)).toBe(JUNICHOKU[10]);
  expect(getJunichoku(createDate(2021, 2, 10).getJulianDay(), 1)).toBe(JUNICHOKU[11]);
  expect(getJunichoku(createDate(2021, 2, 11).getJulianDay(), 1)).toBe(JUNICHOKU[0]);
  expect(getJunichoku(createDate(2021, 2, 12).getJulianDay(), 1)).toBe(JUNICHOKU[1]);
  expect(getJunichoku(createDate(2021, 2, 13).getJulianDay(), 1)).toBe(JUNICHOKU[2]);
});

test('二十八宿の取得', () => {
  expect(getNijuhashuku(createDate(2021, 1, 1).getJulianDay())).toBe(ASTROLOGY28[15]);
  expect(getNijuhashuku(createDate(2021, 1, 2).getJulianDay())).toBe(ASTROLOGY28[16]);
  expect(getNijuhashuku(createDate(2021, 1, 3).getJulianDay())).toBe(ASTROLOGY28[17]);
  expect(getNijuhashuku(createDate(2021, 1, 4).getJulianDay())).toBe(ASTROLOGY28[18]);
  expect(getNijuhashuku(createDate(2021, 1, 5).getJulianDay())).toBe(ASTROLOGY28[19]);
  expect(getNijuhashuku(createDate(2021, 1, 6).getJulianDay())).toBe(ASTROLOGY28[20]);
  expect(getNijuhashuku(createDate(2021, 1, 7).getJulianDay())).toBe(ASTROLOGY28[21]);
  expect(getNijuhashuku(createDate(2021, 1, 8).getJulianDay())).toBe(ASTROLOGY28[22]);
  expect(getNijuhashuku(createDate(2021, 1, 9).getJulianDay())).toBe(ASTROLOGY28[23]);
  expect(getNijuhashuku(createDate(2021, 1, 10).getJulianDay())).toBe(ASTROLOGY28[24]);
  expect(getNijuhashuku(createDate(2021, 1, 11).getJulianDay())).toBe(ASTROLOGY28[25]);
  expect(getNijuhashuku(createDate(2021, 1, 12).getJulianDay())).toBe(ASTROLOGY28[26]);
  expect(getNijuhashuku(createDate(2021, 1, 13).getJulianDay())).toBe(ASTROLOGY28[27]);
  expect(getNijuhashuku(createDate(2021, 1, 14).getJulianDay())).toBe(ASTROLOGY28[0]);
  expect(getNijuhashuku(createDate(2021, 1, 15).getJulianDay())).toBe(ASTROLOGY28[1]);
  expect(getNijuhashuku(createDate(2021, 1, 16).getJulianDay())).toBe(ASTROLOGY28[2]);
  expect(getNijuhashuku(createDate(2021, 1, 17).getJulianDay())).toBe(ASTROLOGY28[3]);
  expect(getNijuhashuku(createDate(2021, 1, 18).getJulianDay())).toBe(ASTROLOGY28[4]);
  expect(getNijuhashuku(createDate(2021, 1, 19).getJulianDay())).toBe(ASTROLOGY28[5]);
  expect(getNijuhashuku(createDate(2021, 1, 20).getJulianDay())).toBe(ASTROLOGY28[6]);
  expect(getNijuhashuku(createDate(2021, 1, 21).getJulianDay())).toBe(ASTROLOGY28[7]);
  expect(getNijuhashuku(createDate(2021, 1, 22).getJulianDay())).toBe(ASTROLOGY28[8]);
  expect(getNijuhashuku(createDate(2021, 1, 23).getJulianDay())).toBe(ASTROLOGY28[9]);
  expect(getNijuhashuku(createDate(2021, 1, 24).getJulianDay())).toBe(ASTROLOGY28[10]);
  expect(getNijuhashuku(createDate(2021, 1, 25).getJulianDay())).toBe(ASTROLOGY28[11]);
  expect(getNijuhashuku(createDate(2021, 1, 26).getJulianDay())).toBe(ASTROLOGY28[12]);
  expect(getNijuhashuku(createDate(2021, 1, 27).getJulianDay())).toBe(ASTROLOGY28[13]);
  expect(getNijuhashuku(createDate(2021, 1, 28).getJulianDay())).toBe(ASTROLOGY28[14]);
});

test('四季の取得', () => {
  expect(getSeason(createDate(2020, 2, 3).getJulianDay()).season4).toBe(SEASON4[3]);
  expect(getSeason(createDate(2020, 2, 4).getJulianDay()).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2020, 5, 4).getJulianDay()).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2020, 5, 5).getJulianDay()).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2020, 8, 6).getJulianDay()).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2020, 8, 7).getJulianDay()).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2020, 11, 6).getJulianDay()).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2020, 11, 7).getJulianDay()).season4).toBe(SEASON4[3]);

  expect(getSeason(createDate(2021, 2, 2).getJulianDay()).season4).toBe(SEASON4[3]);
  expect(getSeason(createDate(2021, 2, 3).getJulianDay()).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2021, 5, 4).getJulianDay()).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2021, 5, 5).getJulianDay()).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2021, 8, 6).getJulianDay()).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2021, 8, 7).getJulianDay()).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2021, 11, 6).getJulianDay()).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2021, 11, 7).getJulianDay()).season4).toBe(SEASON4[3]);
});

test('二十四節気の取得', () => {
  expect(getSeason(createDate(2021, 1, 5).getJulianDay()).season24.value).toBe(SEASON24[19].value);
  expect(getSeason(createDate(2021, 1, 20).getJulianDay()).season24.value).toBe(SEASON24[20].value);
  expect(getSeason(createDate(2021, 2, 3).getJulianDay()).season24.value).toBe(SEASON24[21].value);
  expect(getSeason(createDate(2021, 2, 18).getJulianDay()).season24.value).toBe(SEASON24[22].value);
  expect(getSeason(createDate(2021, 3, 5).getJulianDay()).season24.value).toBe(SEASON24[23].value);
  expect(getSeason(createDate(2021, 3, 20).getJulianDay()).season24.value).toBe(SEASON24[0].value);
  expect(getSeason(createDate(2021, 4, 4).getJulianDay()).season24.value).toBe(SEASON24[1].value);
  expect(getSeason(createDate(2021, 4, 20).getJulianDay()).season24.value).toBe(SEASON24[2].value);
  expect(getSeason(createDate(2021, 5, 5).getJulianDay()).season24.value).toBe(SEASON24[3].value);
  expect(getSeason(createDate(2021, 5, 21).getJulianDay()).season24.value).toBe(SEASON24[4].value);
  expect(getSeason(createDate(2021, 6, 5).getJulianDay()).season24.value).toBe(SEASON24[5].value);
  expect(getSeason(createDate(2021, 6, 21).getJulianDay()).season24.value).toBe(SEASON24[6].value);
  expect(getSeason(createDate(2021, 7, 7).getJulianDay()).season24.value).toBe(SEASON24[7].value);
  expect(getSeason(createDate(2021, 7, 22).getJulianDay()).season24.value).toBe(SEASON24[8].value);
  expect(getSeason(createDate(2021, 8, 7).getJulianDay()).season24.value).toBe(SEASON24[9].value);
  expect(getSeason(createDate(2021, 8, 23).getJulianDay()).season24.value).toBe(SEASON24[10].value);
  expect(getSeason(createDate(2021, 9, 7).getJulianDay()).season24.value).toBe(SEASON24[11].value);
  expect(getSeason(createDate(2021, 9, 23).getJulianDay()).season24.value).toBe(SEASON24[12].value);
  expect(getSeason(createDate(2021, 10, 8).getJulianDay()).season24.value).toBe(SEASON24[13].value);
  expect(getSeason(createDate(2021, 10, 23).getJulianDay()).season24.value).toBe(SEASON24[14].value);
  expect(getSeason(createDate(2021, 11, 7).getJulianDay()).season24.value).toBe(SEASON24[15].value);
  expect(getSeason(createDate(2021, 11, 22).getJulianDay()).season24.value).toBe(SEASON24[16].value);
  expect(getSeason(createDate(2021, 12, 7).getJulianDay()).season24.value).toBe(SEASON24[17].value);
  expect(getSeason(createDate(2021, 12, 22).getJulianDay()).season24.value).toBe(SEASON24[18].value);
});

test('七十二候の取得', () => {
  expect(getSeason(createDate(2021, 1, 4).getJulianDay()).season72).toBe(SEASON72[56]);
  expect(getSeason(createDate(2021, 1, 5).getJulianDay()).season72).toBe(SEASON72[57]);
  expect(getSeason(createDate(2021, 1, 9).getJulianDay()).season72).toBe(SEASON72[57]);
  expect(getSeason(createDate(2021, 1, 10).getJulianDay()).season72).toBe(SEASON72[58]);
  expect(getSeason(createDate(2021, 1, 14).getJulianDay()).season72).toBe(SEASON72[58]);
  expect(getSeason(createDate(2021, 1, 15).getJulianDay()).season72).toBe(SEASON72[59]);
  expect(getSeason(createDate(2021, 1, 19).getJulianDay()).season72).toBe(SEASON72[59]);
  expect(getSeason(createDate(2021, 1, 20).getJulianDay()).season72).toBe(SEASON72[60]);
  expect(getSeason(createDate(2021, 1, 24).getJulianDay()).season72).toBe(SEASON72[60]);
  expect(getSeason(createDate(2021, 1, 25).getJulianDay()).season72).toBe(SEASON72[61]);
  expect(getSeason(createDate(2021, 1, 29).getJulianDay()).season72).toBe(SEASON72[61]);
  expect(getSeason(createDate(2021, 1, 30).getJulianDay()).season72).toBe(SEASON72[62]);
  expect(getSeason(createDate(2021, 2, 2).getJulianDay()).season72).toBe(SEASON72[62]);
  expect(getSeason(createDate(2021, 2, 3).getJulianDay()).season72).toBe(SEASON72[63]);
  expect(getSeason(createDate(2021, 2, 7).getJulianDay()).season72).toBe(SEASON72[63]);
  expect(getSeason(createDate(2021, 2, 8).getJulianDay()).season72).toBe(SEASON72[64]);
  expect(getSeason(createDate(2021, 2, 12).getJulianDay()).season72).toBe(SEASON72[64]);
  expect(getSeason(createDate(2021, 2, 13).getJulianDay()).season72).toBe(SEASON72[65]);
  expect(getSeason(createDate(2021, 2, 17).getJulianDay()).season72).toBe(SEASON72[65]);
  expect(getSeason(createDate(2021, 2, 18).getJulianDay()).season72).toBe(SEASON72[66]);
  expect(getSeason(createDate(2021, 2, 22).getJulianDay()).season72).toBe(SEASON72[66]);
  expect(getSeason(createDate(2021, 2, 23).getJulianDay()).season72).toBe(SEASON72[67]);
  expect(getSeason(createDate(2021, 2, 27).getJulianDay()).season72).toBe(SEASON72[67]);
  expect(getSeason(createDate(2021, 2, 28).getJulianDay()).season72).toBe(SEASON72[68]);
  expect(getSeason(createDate(2021, 3, 4).getJulianDay()).season72).toBe(SEASON72[68]);
  expect(getSeason(createDate(2021, 3, 5).getJulianDay()).season72).toBe(SEASON72[69]);
  expect(getSeason(createDate(2021, 3, 9).getJulianDay()).season72).toBe(SEASON72[69]);
  expect(getSeason(createDate(2021, 3, 10).getJulianDay()).season72).toBe(SEASON72[70]);
  expect(getSeason(createDate(2021, 3, 14).getJulianDay()).season72).toBe(SEASON72[70]);
  expect(getSeason(createDate(2021, 3, 15).getJulianDay()).season72).toBe(SEASON72[71]);
  expect(getSeason(createDate(2021, 3, 19).getJulianDay()).season72).toBe(SEASON72[71]);
  expect(getSeason(createDate(2021, 3, 20).getJulianDay()).season72).toBe(SEASON72[0]);
  expect(getSeason(createDate(2021, 3, 24).getJulianDay()).season72).toBe(SEASON72[0]);
  expect(getSeason(createDate(2021, 3, 25).getJulianDay()).season72).toBe(SEASON72[1]);
  expect(getSeason(createDate(2021, 3, 29).getJulianDay()).season72).toBe(SEASON72[1]);
  expect(getSeason(createDate(2021, 3, 30).getJulianDay()).season72).toBe(SEASON72[2]);
  expect(getSeason(createDate(2021, 4, 3).getJulianDay()).season72).toBe(SEASON72[2]);
  expect(getSeason(createDate(2021, 4, 4).getJulianDay()).season72).toBe(SEASON72[3]);
  expect(getSeason(createDate(2021, 4, 9).getJulianDay()).season72).toBe(SEASON72[3]);
  expect(getSeason(createDate(2021, 4, 10).getJulianDay()).season72).toBe(SEASON72[4]);
  expect(getSeason(createDate(2021, 4, 14).getJulianDay()).season72).toBe(SEASON72[4]);
  expect(getSeason(createDate(2021, 4, 15).getJulianDay()).season72).toBe(SEASON72[5]);
  expect(getSeason(createDate(2021, 4, 19).getJulianDay()).season72).toBe(SEASON72[5]);
  expect(getSeason(createDate(2021, 4, 20).getJulianDay()).season72).toBe(SEASON72[6]);
  expect(getSeason(createDate(2021, 4, 24).getJulianDay()).season72).toBe(SEASON72[6]);
  expect(getSeason(createDate(2021, 4, 25).getJulianDay()).season72).toBe(SEASON72[7]);
  expect(getSeason(createDate(2021, 4, 29).getJulianDay()).season72).toBe(SEASON72[7]);
  expect(getSeason(createDate(2021, 4, 30).getJulianDay()).season72).toBe(SEASON72[8]);
  expect(getSeason(createDate(2021, 5, 4).getJulianDay()).season72).toBe(SEASON72[8]);
  expect(getSeason(createDate(2021, 5, 5).getJulianDay()).season72).toBe(SEASON72[9]);
  expect(getSeason(createDate(2021, 5, 9).getJulianDay()).season72).toBe(SEASON72[9]);
  expect(getSeason(createDate(2021, 5, 10).getJulianDay()).season72).toBe(SEASON72[10]);
  expect(getSeason(createDate(2021, 5, 14).getJulianDay()).season72).toBe(SEASON72[10]);
  expect(getSeason(createDate(2021, 5, 15).getJulianDay()).season72).toBe(SEASON72[11]);
  expect(getSeason(createDate(2021, 5, 20).getJulianDay()).season72).toBe(SEASON72[11]);
  expect(getSeason(createDate(2021, 5, 21).getJulianDay()).season72).toBe(SEASON72[12]);
  expect(getSeason(createDate(2021, 5, 25).getJulianDay()).season72).toBe(SEASON72[12]);
  expect(getSeason(createDate(2021, 5, 26).getJulianDay()).season72).toBe(SEASON72[13]);
  expect(getSeason(createDate(2021, 5, 30).getJulianDay()).season72).toBe(SEASON72[13]);
  expect(getSeason(createDate(2021, 5, 31).getJulianDay()).season72).toBe(SEASON72[14]);
  expect(getSeason(createDate(2021, 6, 4).getJulianDay()).season72).toBe(SEASON72[14]);
  expect(getSeason(createDate(2021, 6, 5).getJulianDay()).season72).toBe(SEASON72[15]);
  expect(getSeason(createDate(2021, 6, 10).getJulianDay()).season72).toBe(SEASON72[15]);
  expect(getSeason(createDate(2021, 6, 11).getJulianDay()).season72).toBe(SEASON72[16]);
  expect(getSeason(createDate(2021, 6, 15).getJulianDay()).season72).toBe(SEASON72[16]);
  expect(getSeason(createDate(2021, 6, 16).getJulianDay()).season72).toBe(SEASON72[17]);
  expect(getSeason(createDate(2021, 6, 20).getJulianDay()).season72).toBe(SEASON72[17]);
  expect(getSeason(createDate(2021, 6, 21).getJulianDay()).season72).toBe(SEASON72[18]);
  expect(getSeason(createDate(2021, 6, 25).getJulianDay()).season72).toBe(SEASON72[18]);
  expect(getSeason(createDate(2021, 6, 26).getJulianDay()).season72).toBe(SEASON72[19]);
  expect(getSeason(createDate(2021, 7, 1).getJulianDay()).season72).toBe(SEASON72[19]);
  expect(getSeason(createDate(2021, 7, 2).getJulianDay()).season72).toBe(SEASON72[20]);
  expect(getSeason(createDate(2021, 7, 6).getJulianDay()).season72).toBe(SEASON72[20]);
  expect(getSeason(createDate(2021, 7, 7).getJulianDay()).season72).toBe(SEASON72[21]);
  expect(getSeason(createDate(2021, 7, 11).getJulianDay()).season72).toBe(SEASON72[21]);
  expect(getSeason(createDate(2021, 7, 12).getJulianDay()).season72).toBe(SEASON72[22]);
  expect(getSeason(createDate(2021, 7, 16).getJulianDay()).season72).toBe(SEASON72[22]);
  expect(getSeason(createDate(2021, 7, 17).getJulianDay()).season72).toBe(SEASON72[23]);
  expect(getSeason(createDate(2021, 7, 21).getJulianDay()).season72).toBe(SEASON72[23]);
  expect(getSeason(createDate(2021, 7, 22).getJulianDay()).season72).toBe(SEASON72[24]);
  expect(getSeason(createDate(2021, 7, 27).getJulianDay()).season72).toBe(SEASON72[24]);
  expect(getSeason(createDate(2021, 7, 28).getJulianDay()).season72).toBe(SEASON72[25]);
  expect(getSeason(createDate(2021, 8, 1).getJulianDay()).season72).toBe(SEASON72[25]);
  expect(getSeason(createDate(2021, 8, 2).getJulianDay()).season72).toBe(SEASON72[26]);
  expect(getSeason(createDate(2021, 8, 6).getJulianDay()).season72).toBe(SEASON72[26]);
  expect(getSeason(createDate(2021, 8, 7).getJulianDay()).season72).toBe(SEASON72[27]);
  expect(getSeason(createDate(2021, 8, 11).getJulianDay()).season72).toBe(SEASON72[27]);
  expect(getSeason(createDate(2021, 8, 12).getJulianDay()).season72).toBe(SEASON72[28]);
  expect(getSeason(createDate(2021, 8, 17).getJulianDay()).season72).toBe(SEASON72[28]);
  expect(getSeason(createDate(2021, 8, 18).getJulianDay()).season72).toBe(SEASON72[29]);
  expect(getSeason(createDate(2021, 8, 22).getJulianDay()).season72).toBe(SEASON72[29]);
  expect(getSeason(createDate(2021, 8, 23).getJulianDay()).season72).toBe(SEASON72[30]);
  expect(getSeason(createDate(2021, 8, 27).getJulianDay()).season72).toBe(SEASON72[30]);
  expect(getSeason(createDate(2021, 8, 28).getJulianDay()).season72).toBe(SEASON72[31]);
  expect(getSeason(createDate(2021, 9, 1).getJulianDay()).season72).toBe(SEASON72[31]);
  expect(getSeason(createDate(2021, 9, 2).getJulianDay()).season72).toBe(SEASON72[32]);
  expect(getSeason(createDate(2021, 9, 6).getJulianDay()).season72).toBe(SEASON72[32]);
  expect(getSeason(createDate(2021, 9, 7).getJulianDay()).season72).toBe(SEASON72[33]);
  expect(getSeason(createDate(2021, 9, 11).getJulianDay()).season72).toBe(SEASON72[33]);
  expect(getSeason(createDate(2021, 9, 12).getJulianDay()).season72).toBe(SEASON72[34]);
  expect(getSeason(createDate(2021, 9, 17).getJulianDay()).season72).toBe(SEASON72[34]);
  expect(getSeason(createDate(2021, 9, 18).getJulianDay()).season72).toBe(SEASON72[35]);
  expect(getSeason(createDate(2021, 9, 22).getJulianDay()).season72).toBe(SEASON72[35]);
  expect(getSeason(createDate(2021, 9, 23).getJulianDay()).season72).toBe(SEASON72[36]);
  expect(getSeason(createDate(2021, 9, 27).getJulianDay()).season72).toBe(SEASON72[36]);
  expect(getSeason(createDate(2021, 9, 28).getJulianDay()).season72).toBe(SEASON72[37]);
  expect(getSeason(createDate(2021, 10, 2).getJulianDay()).season72).toBe(SEASON72[37]);
  expect(getSeason(createDate(2021, 10, 3).getJulianDay()).season72).toBe(SEASON72[38]);
  expect(getSeason(createDate(2021, 10, 7).getJulianDay()).season72).toBe(SEASON72[38]);
  expect(getSeason(createDate(2021, 10, 8).getJulianDay()).season72).toBe(SEASON72[39]);
  expect(getSeason(createDate(2021, 10, 12).getJulianDay()).season72).toBe(SEASON72[39]);
  expect(getSeason(createDate(2021, 10, 13).getJulianDay()).season72).toBe(SEASON72[40]);
  expect(getSeason(createDate(2021, 10, 17).getJulianDay()).season72).toBe(SEASON72[40]);
  expect(getSeason(createDate(2021, 10, 18).getJulianDay()).season72).toBe(SEASON72[41]);
  expect(getSeason(createDate(2021, 10, 22).getJulianDay()).season72).toBe(SEASON72[41]);
  expect(getSeason(createDate(2021, 10, 23).getJulianDay()).season72).toBe(SEASON72[42]);
  expect(getSeason(createDate(2021, 10, 27).getJulianDay()).season72).toBe(SEASON72[42]);
  expect(getSeason(createDate(2021, 10, 28).getJulianDay()).season72).toBe(SEASON72[43]);
  expect(getSeason(createDate(2021, 11, 1).getJulianDay()).season72).toBe(SEASON72[43]);
  expect(getSeason(createDate(2021, 11, 2).getJulianDay()).season72).toBe(SEASON72[44]);
  expect(getSeason(createDate(2021, 11, 6).getJulianDay()).season72).toBe(SEASON72[44]);
  expect(getSeason(createDate(2021, 11, 7).getJulianDay()).season72).toBe(SEASON72[45]);
  expect(getSeason(createDate(2021, 11, 11).getJulianDay()).season72).toBe(SEASON72[45]);
  expect(getSeason(createDate(2021, 11, 12).getJulianDay()).season72).toBe(SEASON72[46]);
  expect(getSeason(createDate(2021, 11, 16).getJulianDay()).season72).toBe(SEASON72[46]);
  expect(getSeason(createDate(2021, 11, 17).getJulianDay()).season72).toBe(SEASON72[47]);
  expect(getSeason(createDate(2021, 11, 21).getJulianDay()).season72).toBe(SEASON72[47]);
  expect(getSeason(createDate(2021, 11, 22).getJulianDay()).season72).toBe(SEASON72[48]);
  expect(getSeason(createDate(2021, 11, 26).getJulianDay()).season72).toBe(SEASON72[48]);
  expect(getSeason(createDate(2021, 11, 27).getJulianDay()).season72).toBe(SEASON72[49]);
  expect(getSeason(createDate(2021, 12, 1).getJulianDay()).season72).toBe(SEASON72[49]);
  expect(getSeason(createDate(2021, 12, 2).getJulianDay()).season72).toBe(SEASON72[50]);
  expect(getSeason(createDate(2021, 12, 6).getJulianDay()).season72).toBe(SEASON72[50]);
  expect(getSeason(createDate(2021, 12, 7).getJulianDay()).season72).toBe(SEASON72[51]);
  expect(getSeason(createDate(2021, 12, 11).getJulianDay()).season72).toBe(SEASON72[51]);
  expect(getSeason(createDate(2021, 12, 12).getJulianDay()).season72).toBe(SEASON72[52]);
  expect(getSeason(createDate(2021, 12, 16).getJulianDay()).season72).toBe(SEASON72[52]);
  expect(getSeason(createDate(2021, 12, 17).getJulianDay()).season72).toBe(SEASON72[53]);
  expect(getSeason(createDate(2021, 12, 21).getJulianDay()).season72).toBe(SEASON72[53]);
  expect(getSeason(createDate(2021, 12, 22).getJulianDay()).season72).toBe(SEASON72[54]);
  expect(getSeason(createDate(2021, 12, 25).getJulianDay()).season72).toBe(SEASON72[54]);
  expect(getSeason(createDate(2021, 12, 26).getJulianDay()).season72).toBe(SEASON72[55]);
  expect(getSeason(createDate(2021, 12, 30).getJulianDay()).season72).toBe(SEASON72[55]);
  expect(getSeason(createDate(2021, 12, 31).getJulianDay()).season72).toBe(SEASON72[56]);
});

test('十干(年)の取得', () => {
  expect(getZodiacYear(createDate(2000, 1, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacYear(createDate(2001, 1, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacYear(createDate(2002, 1, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacYear(createDate(2003, 1, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacYear(createDate(2004, 1, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacYear(createDate(2005, 1, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacYear(createDate(2006, 1, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacYear(createDate(2007, 1, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacYear(createDate(2008, 1, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacYear(createDate(2009, 1, 1)).jikkan).toBe(JIKKAN[5]);
});

test('十二支(年)の取得', () => {
  expect(getZodiacYear(createDate(2000, 1, 1)).junishi).toBe(JUNISHI[4]);
  expect(getZodiacYear(createDate(2001, 1, 1)).junishi).toBe(JUNISHI[5]);
  expect(getZodiacYear(createDate(2002, 1, 1)).junishi).toBe(JUNISHI[6]);
  expect(getZodiacYear(createDate(2003, 1, 1)).junishi).toBe(JUNISHI[7]);
  expect(getZodiacYear(createDate(2004, 1, 1)).junishi).toBe(JUNISHI[8]);
  expect(getZodiacYear(createDate(2005, 1, 1)).junishi).toBe(JUNISHI[9]);
  expect(getZodiacYear(createDate(2006, 1, 1)).junishi).toBe(JUNISHI[10]);
  expect(getZodiacYear(createDate(2007, 1, 1)).junishi).toBe(JUNISHI[11]);
  expect(getZodiacYear(createDate(2008, 1, 1)).junishi).toBe(JUNISHI[0]);
  expect(getZodiacYear(createDate(2009, 1, 1)).junishi).toBe(JUNISHI[1]);
  expect(getZodiacYear(createDate(2010, 1, 1)).junishi).toBe(JUNISHI[2]);
  expect(getZodiacYear(createDate(2011, 1, 1)).junishi).toBe(JUNISHI[3]);
});

test('十干(月)の取得', () => {
  expect(getZodiacMonth(createDate(2000, 1, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacMonth(createDate(2000, 2, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacMonth(createDate(2000, 3, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacMonth(createDate(2000, 4, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacMonth(createDate(2000, 5, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacMonth(createDate(2000, 6, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacMonth(createDate(2000, 7, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacMonth(createDate(2000, 8, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacMonth(createDate(2000, 9, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacMonth(createDate(2000, 10, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacMonth(createDate(2000, 11, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacMonth(createDate(2000, 12, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacMonth(createDate(2001, 1, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacMonth(createDate(2001, 2, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacMonth(createDate(2001, 3, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacMonth(createDate(2001, 4, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacMonth(createDate(2001, 5, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacMonth(createDate(2001, 6, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacMonth(createDate(2001, 7, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacMonth(createDate(2001, 8, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacMonth(createDate(2001, 9, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacMonth(createDate(2001, 10, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacMonth(createDate(2001, 11, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacMonth(createDate(2001, 12, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacMonth(createDate(2002, 1, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacMonth(createDate(2002, 2, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacMonth(createDate(2002, 3, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacMonth(createDate(2002, 4, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacMonth(createDate(2002, 5, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacMonth(createDate(2002, 6, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacMonth(createDate(2002, 7, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacMonth(createDate(2002, 8, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacMonth(createDate(2002, 9, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacMonth(createDate(2002, 10, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacMonth(createDate(2002, 11, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacMonth(createDate(2002, 12, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacMonth(createDate(2003, 1, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacMonth(createDate(2003, 2, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacMonth(createDate(2003, 3, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacMonth(createDate(2003, 4, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacMonth(createDate(2003, 5, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacMonth(createDate(2003, 6, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacMonth(createDate(2003, 7, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacMonth(createDate(2003, 8, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacMonth(createDate(2003, 9, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacMonth(createDate(2003, 10, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacMonth(createDate(2003, 11, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacMonth(createDate(2003, 12, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacMonth(createDate(2004, 1, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacMonth(createDate(2004, 2, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacMonth(createDate(2004, 3, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getZodiacMonth(createDate(2004, 4, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacMonth(createDate(2004, 5, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacMonth(createDate(2004, 6, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacMonth(createDate(2004, 7, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacMonth(createDate(2004, 8, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacMonth(createDate(2004, 9, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacMonth(createDate(2004, 10, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacMonth(createDate(2004, 11, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacMonth(createDate(2004, 12, 1)).jikkan).toBe(JIKKAN[3]);
});

test('十二支(月)の取得', () => {
  expect(getZodiacMonth(createDate(2021, 1, 1)).junishi).toBe(JUNISHI[2]);
  expect(getZodiacMonth(createDate(2021, 2, 1)).junishi).toBe(JUNISHI[3]);
  expect(getZodiacMonth(createDate(2021, 3, 1)).junishi).toBe(JUNISHI[4]);
  expect(getZodiacMonth(createDate(2021, 4, 1)).junishi).toBe(JUNISHI[5]);
  expect(getZodiacMonth(createDate(2021, 5, 1)).junishi).toBe(JUNISHI[6]);
  expect(getZodiacMonth(createDate(2021, 6, 1)).junishi).toBe(JUNISHI[7]);
  expect(getZodiacMonth(createDate(2021, 7, 1)).junishi).toBe(JUNISHI[8]);
  expect(getZodiacMonth(createDate(2021, 8, 1)).junishi).toBe(JUNISHI[9]);
  expect(getZodiacMonth(createDate(2021, 9, 1)).junishi).toBe(JUNISHI[10]);
  expect(getZodiacMonth(createDate(2021, 10, 1)).junishi).toBe(JUNISHI[11]);
  expect(getZodiacMonth(createDate(2021, 11, 1)).junishi).toBe(JUNISHI[0]);
  expect(getZodiacMonth(createDate(2021, 12, 1)).junishi).toBe(JUNISHI[1]);
});

test('十干(日)の取得', () => {
  expect(getZodiacDay(createDate(2021, 1, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getZodiacDay(createDate(2021, 1, 2)).jikkan).toBe(JIKKAN[6]);
  expect(getZodiacDay(createDate(2021, 1, 3)).jikkan).toBe(JIKKAN[7]);
  expect(getZodiacDay(createDate(2021, 1, 4)).jikkan).toBe(JIKKAN[8]);
  expect(getZodiacDay(createDate(2021, 1, 5)).jikkan).toBe(JIKKAN[9]);
  expect(getZodiacDay(createDate(2021, 1, 6)).jikkan).toBe(JIKKAN[0]);
  expect(getZodiacDay(createDate(2021, 1, 7)).jikkan).toBe(JIKKAN[1]);
  expect(getZodiacDay(createDate(2021, 1, 8)).jikkan).toBe(JIKKAN[2]);
  expect(getZodiacDay(createDate(2021, 1, 9)).jikkan).toBe(JIKKAN[3]);
  expect(getZodiacDay(createDate(2021, 1, 10)).jikkan).toBe(JIKKAN[4]);
});

test('十二支(日)の取得', () => {
  expect(getZodiacDay(createDate(2021, 1, 1)).junishi).toBe(JUNISHI[9]);
  expect(getZodiacDay(createDate(2021, 1, 2)).junishi).toBe(JUNISHI[10]);
  expect(getZodiacDay(createDate(2021, 1, 3)).junishi).toBe(JUNISHI[11]);
  expect(getZodiacDay(createDate(2021, 1, 4)).junishi).toBe(JUNISHI[0]);
  expect(getZodiacDay(createDate(2021, 1, 5)).junishi).toBe(JUNISHI[1]);
  expect(getZodiacDay(createDate(2021, 1, 6)).junishi).toBe(JUNISHI[2]);
  expect(getZodiacDay(createDate(2021, 1, 7)).junishi).toBe(JUNISHI[3]);
  expect(getZodiacDay(createDate(2021, 1, 8)).junishi).toBe(JUNISHI[4]);
  expect(getZodiacDay(createDate(2021, 1, 9)).junishi).toBe(JUNISHI[5]);
  expect(getZodiacDay(createDate(2021, 1, 10)).junishi).toBe(JUNISHI[6]);
  expect(getZodiacDay(createDate(2021, 1, 11)).junishi).toBe(JUNISHI[7]);
  expect(getZodiacDay(createDate(2021, 1, 12)).junishi).toBe(JUNISHI[8]);
});

test('十二星座の取得', () => {
  expect(getSign(createDate(2021, 1, 19)).sign12).toBe(SIGN12[11]);
  expect(getSign(createDate(2021, 1, 20)).sign12).toBe(SIGN12[0]);
  expect(getSign(createDate(2021, 2, 18)).sign12).toBe(SIGN12[0]);
  expect(getSign(createDate(2021, 2, 19)).sign12).toBe(SIGN12[1]);
  expect(getSign(createDate(2021, 3, 20)).sign12).toBe(SIGN12[1]);
  expect(getSign(createDate(2021, 3, 21)).sign12).toBe(SIGN12[2]);
  expect(getSign(createDate(2021, 4, 19)).sign12).toBe(SIGN12[2]);
  expect(getSign(createDate(2021, 4, 20)).sign12).toBe(SIGN12[3]);
  expect(getSign(createDate(2021, 5, 20)).sign12).toBe(SIGN12[3]);
  expect(getSign(createDate(2021, 5, 21)).sign12).toBe(SIGN12[4]);
  expect(getSign(createDate(2021, 6, 21)).sign12).toBe(SIGN12[4]);
  expect(getSign(createDate(2021, 6, 22)).sign12).toBe(SIGN12[5]);
  expect(getSign(createDate(2021, 7, 22)).sign12).toBe(SIGN12[5]);
  expect(getSign(createDate(2021, 7, 23)).sign12).toBe(SIGN12[6]);
  expect(getSign(createDate(2021, 8, 22)).sign12).toBe(SIGN12[6]);
  expect(getSign(createDate(2021, 8, 23)).sign12).toBe(SIGN12[7]);
  expect(getSign(createDate(2021, 9, 22)).sign12).toBe(SIGN12[7]);
  expect(getSign(createDate(2021, 9, 23)).sign12).toBe(SIGN12[8]);
  expect(getSign(createDate(2021, 10, 23)).sign12).toBe(SIGN12[8]);
  expect(getSign(createDate(2021, 10, 24)).sign12).toBe(SIGN12[9]);
  expect(getSign(createDate(2021, 11, 22)).sign12).toBe(SIGN12[9]);
  expect(getSign(createDate(2021, 11, 23)).sign12).toBe(SIGN12[10]);
  expect(getSign(createDate(2021, 12, 21)).sign12).toBe(SIGN12[10]);
  expect(getSign(createDate(2021, 12, 22)).sign12).toBe(SIGN12[11]);
});

test('十三星座の取得', () => {
  expect(getSign(createDate(2021, 1, 18)).sign13).toBe(SIGN13[12]);
  expect(getSign(createDate(2021, 1, 19)).sign13).toBe(SIGN13[0]);
  expect(getSign(createDate(2021, 2, 15)).sign13).toBe(SIGN13[0]);
  expect(getSign(createDate(2021, 2, 16)).sign13).toBe(SIGN13[1]);
  expect(getSign(createDate(2021, 3, 11)).sign13).toBe(SIGN13[1]);
  expect(getSign(createDate(2021, 3, 12)).sign13).toBe(SIGN13[2]);
  expect(getSign(createDate(2021, 4, 18)).sign13).toBe(SIGN13[2]);
  expect(getSign(createDate(2021, 4, 19)).sign13).toBe(SIGN13[3]);
  expect(getSign(createDate(2021, 5, 13)).sign13).toBe(SIGN13[3]);
  expect(getSign(createDate(2021, 5, 14)).sign13).toBe(SIGN13[4]);
  expect(getSign(createDate(2021, 6, 20)).sign13).toBe(SIGN13[4]);
  expect(getSign(createDate(2021, 6, 21)).sign13).toBe(SIGN13[5]);
  expect(getSign(createDate(2021, 7, 19)).sign13).toBe(SIGN13[5]);
  expect(getSign(createDate(2021, 7, 20)).sign13).toBe(SIGN13[6]);
  expect(getSign(createDate(2021, 8, 19)).sign13).toBe(SIGN13[6]);
  expect(getSign(createDate(2021, 8, 20)).sign13).toBe(SIGN13[7]);
  expect(getSign(createDate(2021, 9, 15)).sign13).toBe(SIGN13[7]);
  expect(getSign(createDate(2021, 9, 16)).sign13).toBe(SIGN13[8]);
  expect(getSign(createDate(2021, 10, 30)).sign13).toBe(SIGN13[8]);
  expect(getSign(createDate(2021, 10, 31)).sign13).toBe(SIGN13[9]);
  expect(getSign(createDate(2021, 11, 22)).sign13).toBe(SIGN13[9]);
  expect(getSign(createDate(2021, 11, 23)).sign13).toBe(SIGN13[10]);
  expect(getSign(createDate(2021, 11, 29)).sign13).toBe(SIGN13[10]);
  expect(getSign(createDate(2021, 11, 30)).sign13).toBe(SIGN13[11]);
  expect(getSign(createDate(2021, 12, 17)).sign13).toBe(SIGN13[11]);
  expect(getSign(createDate(2021, 12, 18)).sign13).toBe(SIGN13[12]);
});

test('月相の取得', () => {
  expect(getLunaPhase(createLuna(2021, 2, 1).day)).toBe(LUNA_PHASES[19]);
  expect(getLunaPhase(createLuna(2021, 2, 2).day)).toBe(LUNA_PHASES[20]);
  expect(getLunaPhase(createLuna(2021, 2, 3).day)).toBe(LUNA_PHASES[21]);
  expect(getLunaPhase(createLuna(2021, 2, 4).day)).toBe(LUNA_PHASES[22]);
  expect(getLunaPhase(createLuna(2021, 2, 5).day)).toBe(LUNA_PHASES[23]);
  expect(getLunaPhase(createLuna(2021, 2, 6).day)).toBe(LUNA_PHASES[24]);
  expect(getLunaPhase(createLuna(2021, 2, 7).day)).toBe(LUNA_PHASES[25]);
  expect(getLunaPhase(createLuna(2021, 2, 8).day)).toBe(LUNA_PHASES[26]);
  expect(getLunaPhase(createLuna(2021, 2, 9).day)).toBe(LUNA_PHASES[27]);
  expect(getLunaPhase(createLuna(2021, 2, 10).day)).toBe(LUNA_PHASES[28]);
  expect(getLunaPhase(createLuna(2021, 2, 11).day)).toBe(LUNA_PHASES[29]);
  expect(getLunaPhase(createLuna(2021, 2, 12).day)).toBe(LUNA_PHASES[0]);
  expect(getLunaPhase(createLuna(2021, 2, 13).day)).toBe(LUNA_PHASES[1]);
  expect(getLunaPhase(createLuna(2021, 2, 14).day)).toBe(LUNA_PHASES[2]);
  expect(getLunaPhase(createLuna(2021, 2, 15).day)).toBe(LUNA_PHASES[3]);
  expect(getLunaPhase(createLuna(2021, 2, 16).day)).toBe(LUNA_PHASES[4]);
  expect(getLunaPhase(createLuna(2021, 2, 17).day)).toBe(LUNA_PHASES[5]);
  expect(getLunaPhase(createLuna(2021, 2, 18).day)).toBe(LUNA_PHASES[6]);
  expect(getLunaPhase(createLuna(2021, 2, 19).day)).toBe(LUNA_PHASES[7]);
  expect(getLunaPhase(createLuna(2021, 2, 20).day)).toBe(LUNA_PHASES[8]);
  expect(getLunaPhase(createLuna(2021, 2, 21).day)).toBe(LUNA_PHASES[9]);
  expect(getLunaPhase(createLuna(2021, 2, 22).day)).toBe(LUNA_PHASES[10]);
  expect(getLunaPhase(createLuna(2021, 2, 23).day)).toBe(LUNA_PHASES[11]);
  expect(getLunaPhase(createLuna(2021, 2, 24).day)).toBe(LUNA_PHASES[12]);
  expect(getLunaPhase(createLuna(2021, 2, 25).day)).toBe(LUNA_PHASES[13]);
  expect(getLunaPhase(createLuna(2021, 2, 26).day)).toBe(LUNA_PHASES[14]);
  expect(getLunaPhase(createLuna(2021, 2, 27).day)).toBe(LUNA_PHASES[15]);
  expect(getLunaPhase(createLuna(2021, 2, 28).day)).toBe(LUNA_PHASES[16]);
  expect(getLunaPhase(createLuna(2021, 3, 1).day)).toBe(LUNA_PHASES[17]);
  expect(getLunaPhase(createLuna(2021, 3, 2).day)).toBe(LUNA_PHASES[18]);
});

test('潮汐の取得', () => {
  expect(getTidePhase(createLuna(2021, 1, 1).lunaAge)).toBe(TIDE_PHASES[17]);
  expect(getTidePhase(createLuna(2021, 1, 2).lunaAge)).toBe(TIDE_PHASES[18]);
  expect(getTidePhase(createLuna(2021, 1, 3).lunaAge)).toBe(TIDE_PHASES[19]);
  expect(getTidePhase(createLuna(2021, 1, 4).lunaAge)).toBe(TIDE_PHASES[20]);
  expect(getTidePhase(createLuna(2021, 1, 5).lunaAge)).toBe(TIDE_PHASES[21]);
  expect(getTidePhase(createLuna(2021, 1, 6).lunaAge)).toBe(TIDE_PHASES[22]);
  expect(getTidePhase(createLuna(2021, 1, 7).lunaAge)).toBe(TIDE_PHASES[23]);
  expect(getTidePhase(createLuna(2021, 1, 8).lunaAge)).toBe(TIDE_PHASES[24]);
  expect(getTidePhase(createLuna(2021, 1, 9).lunaAge)).toBe(TIDE_PHASES[25]);
  expect(getTidePhase(createLuna(2021, 1, 10).lunaAge)).toBe(TIDE_PHASES[26]);
  expect(getTidePhase(createLuna(2021, 1, 11).lunaAge)).toBe(TIDE_PHASES[27]);
  expect(getTidePhase(createLuna(2021, 1, 12).lunaAge)).toBe(TIDE_PHASES[28]);
  expect(getTidePhase(createLuna(2021, 1, 13).lunaAge)).toBe(TIDE_PHASES[29]);
  expect(getTidePhase(createLuna(2021, 1, 14).lunaAge)).toBe(TIDE_PHASES[0]);
  expect(getTidePhase(createLuna(2021, 1, 15).lunaAge)).toBe(TIDE_PHASES[1]);
  expect(getTidePhase(createLuna(2021, 1, 16).lunaAge)).toBe(TIDE_PHASES[2]);
  expect(getTidePhase(createLuna(2021, 1, 17).lunaAge)).toBe(TIDE_PHASES[3]);
  expect(getTidePhase(createLuna(2021, 1, 18).lunaAge)).toBe(TIDE_PHASES[4]);
  expect(getTidePhase(createLuna(2021, 1, 19).lunaAge)).toBe(TIDE_PHASES[5]);
  expect(getTidePhase(createLuna(2021, 1, 20).lunaAge)).toBe(TIDE_PHASES[6]);
  expect(getTidePhase(createLuna(2021, 1, 21).lunaAge)).toBe(TIDE_PHASES[7]);
  expect(getTidePhase(createLuna(2021, 1, 22).lunaAge)).toBe(TIDE_PHASES[8]);
  expect(getTidePhase(createLuna(2021, 1, 23).lunaAge)).toBe(TIDE_PHASES[9]);
  expect(getTidePhase(createLuna(2021, 1, 24).lunaAge)).toBe(TIDE_PHASES[10]);
  expect(getTidePhase(createLuna(2021, 1, 25).lunaAge)).toBe(TIDE_PHASES[11]);
  expect(getTidePhase(createLuna(2021, 1, 26).lunaAge)).toBe(TIDE_PHASES[12]);
  expect(getTidePhase(createLuna(2021, 1, 27).lunaAge)).toBe(TIDE_PHASES[13]);
  expect(getTidePhase(createLuna(2021, 1, 28).lunaAge)).toBe(TIDE_PHASES[14]);
  expect(getTidePhase(createLuna(2021, 1, 29).lunaAge)).toBe(TIDE_PHASES[15]);
  expect(getTidePhase(createLuna(2021, 1, 30).lunaAge)).toBe(TIDE_PHASES[16]);
  expect(getTidePhase(createLuna(2021, 1, 31).lunaAge)).toBe(TIDE_PHASES[17]);
});

test('修正ユリウス日の取得', () => {
  expect(getJulianDayRevise(createDate(2021, 1, 1).getJulianDay())).toBe(59215);
});

test('リリウス日の取得', () => {
  expect(getLilianDay(createDate(2021, 1, 1).getJulianDay())).toBe(160056);
});

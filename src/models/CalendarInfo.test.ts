import JapaneseLunisolarCalendar from './JapaneseLunisolarCalendar';
import {
  createCalendarInfo,
  getRokuyo,
  getEtoYear,
  getEtoMonth,
  getEtoDay,
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
  expect(getJunichoku(createDate(2021, 2, 1), 12)).toBe(JUNICHOKU[3]);
  expect(getJunichoku(createDate(2021, 2, 2), 12)).toBe(JUNICHOKU[4]);
  expect(getJunichoku(createDate(2021, 2, 3), 1)).toBe(JUNICHOKU[4]);
  expect(getJunichoku(createDate(2021, 2, 4), 1)).toBe(JUNICHOKU[5]);
  expect(getJunichoku(createDate(2021, 2, 5), 1)).toBe(JUNICHOKU[6]);
  expect(getJunichoku(createDate(2021, 2, 6), 1)).toBe(JUNICHOKU[7]);
  expect(getJunichoku(createDate(2021, 2, 7), 1)).toBe(JUNICHOKU[8]);
  expect(getJunichoku(createDate(2021, 2, 8), 1)).toBe(JUNICHOKU[9]);
  expect(getJunichoku(createDate(2021, 2, 9), 1)).toBe(JUNICHOKU[10]);
  expect(getJunichoku(createDate(2021, 2, 10), 1)).toBe(JUNICHOKU[11]);
  expect(getJunichoku(createDate(2021, 2, 11), 1)).toBe(JUNICHOKU[0]);
  expect(getJunichoku(createDate(2021, 2, 12), 1)).toBe(JUNICHOKU[1]);
  expect(getJunichoku(createDate(2021, 2, 13), 1)).toBe(JUNICHOKU[2]);
});

test('二十八宿の取得', () => {
  expect(getNijuhashuku(createDate(2021, 1, 1))).toBe(ASTROLOGY28[15]);
  expect(getNijuhashuku(createDate(2021, 1, 2))).toBe(ASTROLOGY28[16]);
  expect(getNijuhashuku(createDate(2021, 1, 3))).toBe(ASTROLOGY28[17]);
  expect(getNijuhashuku(createDate(2021, 1, 4))).toBe(ASTROLOGY28[18]);
  expect(getNijuhashuku(createDate(2021, 1, 5))).toBe(ASTROLOGY28[19]);
  expect(getNijuhashuku(createDate(2021, 1, 6))).toBe(ASTROLOGY28[20]);
  expect(getNijuhashuku(createDate(2021, 1, 7))).toBe(ASTROLOGY28[21]);
  expect(getNijuhashuku(createDate(2021, 1, 8))).toBe(ASTROLOGY28[22]);
  expect(getNijuhashuku(createDate(2021, 1, 9))).toBe(ASTROLOGY28[23]);
  expect(getNijuhashuku(createDate(2021, 1, 10))).toBe(ASTROLOGY28[24]);
  expect(getNijuhashuku(createDate(2021, 1, 11))).toBe(ASTROLOGY28[25]);
  expect(getNijuhashuku(createDate(2021, 1, 12))).toBe(ASTROLOGY28[26]);
  expect(getNijuhashuku(createDate(2021, 1, 13))).toBe(ASTROLOGY28[27]);
  expect(getNijuhashuku(createDate(2021, 1, 14))).toBe(ASTROLOGY28[0]);
  expect(getNijuhashuku(createDate(2021, 1, 15))).toBe(ASTROLOGY28[1]);
  expect(getNijuhashuku(createDate(2021, 1, 16))).toBe(ASTROLOGY28[2]);
  expect(getNijuhashuku(createDate(2021, 1, 17))).toBe(ASTROLOGY28[3]);
  expect(getNijuhashuku(createDate(2021, 1, 18))).toBe(ASTROLOGY28[4]);
  expect(getNijuhashuku(createDate(2021, 1, 19))).toBe(ASTROLOGY28[5]);
  expect(getNijuhashuku(createDate(2021, 1, 20))).toBe(ASTROLOGY28[6]);
  expect(getNijuhashuku(createDate(2021, 1, 21))).toBe(ASTROLOGY28[7]);
  expect(getNijuhashuku(createDate(2021, 1, 22))).toBe(ASTROLOGY28[8]);
  expect(getNijuhashuku(createDate(2021, 1, 23))).toBe(ASTROLOGY28[9]);
  expect(getNijuhashuku(createDate(2021, 1, 24))).toBe(ASTROLOGY28[10]);
  expect(getNijuhashuku(createDate(2021, 1, 25))).toBe(ASTROLOGY28[11]);
  expect(getNijuhashuku(createDate(2021, 1, 26))).toBe(ASTROLOGY28[12]);
  expect(getNijuhashuku(createDate(2021, 1, 27))).toBe(ASTROLOGY28[13]);
  expect(getNijuhashuku(createDate(2021, 1, 28))).toBe(ASTROLOGY28[14]);
});

test('四季の取得', () => {
  expect(getSeason(createDate(2020, 2, 3)).season4).toBe(SEASON4[3]);
  expect(getSeason(createDate(2020, 2, 4)).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2020, 5, 4)).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2020, 5, 5)).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2020, 8, 6)).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2020, 8, 7)).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2020, 11, 6)).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2020, 11, 7)).season4).toBe(SEASON4[3]);

  expect(getSeason(createDate(2021, 2, 2)).season4).toBe(SEASON4[3]);
  expect(getSeason(createDate(2021, 2, 3)).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2021, 5, 4)).season4).toBe(SEASON4[0]);
  expect(getSeason(createDate(2021, 5, 5)).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2021, 8, 6)).season4).toBe(SEASON4[1]);
  expect(getSeason(createDate(2021, 8, 7)).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2021, 11, 6)).season4).toBe(SEASON4[2]);
  expect(getSeason(createDate(2021, 11, 7)).season4).toBe(SEASON4[3]);
});

test('二十四節気の取得', () => {
  expect(getSeason(createDate(2021, 1, 5)).season24.value).toBe(SEASON24[19].value);
  expect(getSeason(createDate(2021, 1, 20)).season24.value).toBe(SEASON24[20].value);
  expect(getSeason(createDate(2021, 2, 3)).season24.value).toBe(SEASON24[21].value);
  expect(getSeason(createDate(2021, 2, 18)).season24.value).toBe(SEASON24[22].value);
  expect(getSeason(createDate(2021, 3, 5)).season24.value).toBe(SEASON24[23].value);
  expect(getSeason(createDate(2021, 3, 20)).season24.value).toBe(SEASON24[0].value);
  expect(getSeason(createDate(2021, 4, 4)).season24.value).toBe(SEASON24[1].value);
  expect(getSeason(createDate(2021, 4, 20)).season24.value).toBe(SEASON24[2].value);
  expect(getSeason(createDate(2021, 5, 5)).season24.value).toBe(SEASON24[3].value);
  expect(getSeason(createDate(2021, 5, 21)).season24.value).toBe(SEASON24[4].value);
  expect(getSeason(createDate(2021, 6, 5)).season24.value).toBe(SEASON24[5].value);
  expect(getSeason(createDate(2021, 6, 21)).season24.value).toBe(SEASON24[6].value);
  expect(getSeason(createDate(2021, 7, 7)).season24.value).toBe(SEASON24[7].value);
  expect(getSeason(createDate(2021, 7, 22)).season24.value).toBe(SEASON24[8].value);
  expect(getSeason(createDate(2021, 8, 7)).season24.value).toBe(SEASON24[9].value);
  expect(getSeason(createDate(2021, 8, 23)).season24.value).toBe(SEASON24[10].value);
  expect(getSeason(createDate(2021, 9, 7)).season24.value).toBe(SEASON24[11].value);
  expect(getSeason(createDate(2021, 9, 23)).season24.value).toBe(SEASON24[12].value);
  expect(getSeason(createDate(2021, 10, 8)).season24.value).toBe(SEASON24[13].value);
  expect(getSeason(createDate(2021, 10, 23)).season24.value).toBe(SEASON24[14].value);
  expect(getSeason(createDate(2021, 11, 7)).season24.value).toBe(SEASON24[15].value);
  expect(getSeason(createDate(2021, 11, 22)).season24.value).toBe(SEASON24[16].value);
  expect(getSeason(createDate(2021, 12, 7)).season24.value).toBe(SEASON24[17].value);
  expect(getSeason(createDate(2021, 12, 22)).season24.value).toBe(SEASON24[18].value);
});

test('七十二候の取得', () => {
  expect(getSeason(createDate(2021, 1, 4)).season72).toBe(SEASON72[56]);
  expect(getSeason(createDate(2021, 1, 5)).season72).toBe(SEASON72[57]);
  expect(getSeason(createDate(2021, 1, 9)).season72).toBe(SEASON72[57]);
  expect(getSeason(createDate(2021, 1, 10)).season72).toBe(SEASON72[58]);
  expect(getSeason(createDate(2021, 1, 14)).season72).toBe(SEASON72[58]);
  expect(getSeason(createDate(2021, 1, 15)).season72).toBe(SEASON72[59]);
  expect(getSeason(createDate(2021, 1, 19)).season72).toBe(SEASON72[59]);
  expect(getSeason(createDate(2021, 1, 20)).season72).toBe(SEASON72[60]);
  expect(getSeason(createDate(2021, 1, 24)).season72).toBe(SEASON72[60]);
  expect(getSeason(createDate(2021, 1, 25)).season72).toBe(SEASON72[61]);
  expect(getSeason(createDate(2021, 1, 29)).season72).toBe(SEASON72[61]);
  expect(getSeason(createDate(2021, 1, 30)).season72).toBe(SEASON72[62]);
  expect(getSeason(createDate(2021, 2, 2)).season72).toBe(SEASON72[62]);
  expect(getSeason(createDate(2021, 2, 3)).season72).toBe(SEASON72[63]);
  expect(getSeason(createDate(2021, 2, 7)).season72).toBe(SEASON72[63]);
  expect(getSeason(createDate(2021, 2, 8)).season72).toBe(SEASON72[64]);
  expect(getSeason(createDate(2021, 2, 12)).season72).toBe(SEASON72[64]);
  expect(getSeason(createDate(2021, 2, 13)).season72).toBe(SEASON72[65]);
  expect(getSeason(createDate(2021, 2, 17)).season72).toBe(SEASON72[65]);
  expect(getSeason(createDate(2021, 2, 18)).season72).toBe(SEASON72[66]);
  expect(getSeason(createDate(2021, 2, 22)).season72).toBe(SEASON72[66]);
  expect(getSeason(createDate(2021, 2, 23)).season72).toBe(SEASON72[67]);
  expect(getSeason(createDate(2021, 2, 27)).season72).toBe(SEASON72[67]);
  expect(getSeason(createDate(2021, 2, 28)).season72).toBe(SEASON72[68]);
  expect(getSeason(createDate(2021, 3, 4)).season72).toBe(SEASON72[68]);
  expect(getSeason(createDate(2021, 3, 5)).season72).toBe(SEASON72[69]);
  expect(getSeason(createDate(2021, 3, 9)).season72).toBe(SEASON72[69]);
  expect(getSeason(createDate(2021, 3, 10)).season72).toBe(SEASON72[70]);
  expect(getSeason(createDate(2021, 3, 14)).season72).toBe(SEASON72[70]);
  expect(getSeason(createDate(2021, 3, 15)).season72).toBe(SEASON72[71]);
  expect(getSeason(createDate(2021, 3, 19)).season72).toBe(SEASON72[71]);
  expect(getSeason(createDate(2021, 3, 20)).season72).toBe(SEASON72[0]);
  expect(getSeason(createDate(2021, 3, 24)).season72).toBe(SEASON72[0]);
  expect(getSeason(createDate(2021, 3, 25)).season72).toBe(SEASON72[1]);
  expect(getSeason(createDate(2021, 3, 29)).season72).toBe(SEASON72[1]);
  expect(getSeason(createDate(2021, 3, 30)).season72).toBe(SEASON72[2]);
  expect(getSeason(createDate(2021, 4, 3)).season72).toBe(SEASON72[2]);
  expect(getSeason(createDate(2021, 4, 4)).season72).toBe(SEASON72[3]);
  expect(getSeason(createDate(2021, 4, 9)).season72).toBe(SEASON72[3]);
  expect(getSeason(createDate(2021, 4, 10)).season72).toBe(SEASON72[4]);
  expect(getSeason(createDate(2021, 4, 14)).season72).toBe(SEASON72[4]);
  expect(getSeason(createDate(2021, 4, 15)).season72).toBe(SEASON72[5]);
  expect(getSeason(createDate(2021, 4, 19)).season72).toBe(SEASON72[5]);
  expect(getSeason(createDate(2021, 4, 20)).season72).toBe(SEASON72[6]);
  expect(getSeason(createDate(2021, 4, 24)).season72).toBe(SEASON72[6]);
  expect(getSeason(createDate(2021, 4, 25)).season72).toBe(SEASON72[7]);
  expect(getSeason(createDate(2021, 4, 29)).season72).toBe(SEASON72[7]);
  expect(getSeason(createDate(2021, 4, 30)).season72).toBe(SEASON72[8]);
  expect(getSeason(createDate(2021, 5, 4)).season72).toBe(SEASON72[8]);
  expect(getSeason(createDate(2021, 5, 5)).season72).toBe(SEASON72[9]);
  expect(getSeason(createDate(2021, 5, 9)).season72).toBe(SEASON72[9]);
  expect(getSeason(createDate(2021, 5, 10)).season72).toBe(SEASON72[10]);
  expect(getSeason(createDate(2021, 5, 14)).season72).toBe(SEASON72[10]);
  expect(getSeason(createDate(2021, 5, 15)).season72).toBe(SEASON72[11]);
  expect(getSeason(createDate(2021, 5, 20)).season72).toBe(SEASON72[11]);
  expect(getSeason(createDate(2021, 5, 21)).season72).toBe(SEASON72[12]);
  expect(getSeason(createDate(2021, 5, 25)).season72).toBe(SEASON72[12]);
  expect(getSeason(createDate(2021, 5, 26)).season72).toBe(SEASON72[13]);
  expect(getSeason(createDate(2021, 5, 30)).season72).toBe(SEASON72[13]);
  expect(getSeason(createDate(2021, 5, 31)).season72).toBe(SEASON72[14]);
  expect(getSeason(createDate(2021, 6, 4)).season72).toBe(SEASON72[14]);
  expect(getSeason(createDate(2021, 6, 5)).season72).toBe(SEASON72[15]);
  expect(getSeason(createDate(2021, 6, 10)).season72).toBe(SEASON72[15]);
  expect(getSeason(createDate(2021, 6, 11)).season72).toBe(SEASON72[16]);
  expect(getSeason(createDate(2021, 6, 15)).season72).toBe(SEASON72[16]);
  expect(getSeason(createDate(2021, 6, 16)).season72).toBe(SEASON72[17]);
  expect(getSeason(createDate(2021, 6, 20)).season72).toBe(SEASON72[17]);
  expect(getSeason(createDate(2021, 6, 21)).season72).toBe(SEASON72[18]);
  expect(getSeason(createDate(2021, 6, 25)).season72).toBe(SEASON72[18]);
  expect(getSeason(createDate(2021, 6, 26)).season72).toBe(SEASON72[19]);
  expect(getSeason(createDate(2021, 7, 1)).season72).toBe(SEASON72[19]);
  expect(getSeason(createDate(2021, 7, 2)).season72).toBe(SEASON72[20]);
  expect(getSeason(createDate(2021, 7, 6)).season72).toBe(SEASON72[20]);
  expect(getSeason(createDate(2021, 7, 7)).season72).toBe(SEASON72[21]);
  expect(getSeason(createDate(2021, 7, 11)).season72).toBe(SEASON72[21]);
  expect(getSeason(createDate(2021, 7, 12)).season72).toBe(SEASON72[22]);
  expect(getSeason(createDate(2021, 7, 16)).season72).toBe(SEASON72[22]);
  expect(getSeason(createDate(2021, 7, 17)).season72).toBe(SEASON72[23]);
  expect(getSeason(createDate(2021, 7, 21)).season72).toBe(SEASON72[23]);
  expect(getSeason(createDate(2021, 7, 22)).season72).toBe(SEASON72[24]);
  expect(getSeason(createDate(2021, 7, 27)).season72).toBe(SEASON72[24]);
  expect(getSeason(createDate(2021, 7, 28)).season72).toBe(SEASON72[25]);
  expect(getSeason(createDate(2021, 8, 1)).season72).toBe(SEASON72[25]);
  expect(getSeason(createDate(2021, 8, 2)).season72).toBe(SEASON72[26]);
  expect(getSeason(createDate(2021, 8, 6)).season72).toBe(SEASON72[26]);
  expect(getSeason(createDate(2021, 8, 7)).season72).toBe(SEASON72[27]);
  expect(getSeason(createDate(2021, 8, 11)).season72).toBe(SEASON72[27]);
  expect(getSeason(createDate(2021, 8, 12)).season72).toBe(SEASON72[28]);
  expect(getSeason(createDate(2021, 8, 17)).season72).toBe(SEASON72[28]);
  expect(getSeason(createDate(2021, 8, 18)).season72).toBe(SEASON72[29]);
  expect(getSeason(createDate(2021, 8, 22)).season72).toBe(SEASON72[29]);
  expect(getSeason(createDate(2021, 8, 23)).season72).toBe(SEASON72[30]);
  expect(getSeason(createDate(2021, 8, 27)).season72).toBe(SEASON72[30]);
  expect(getSeason(createDate(2021, 8, 28)).season72).toBe(SEASON72[31]);
  expect(getSeason(createDate(2021, 9, 1)).season72).toBe(SEASON72[31]);
  expect(getSeason(createDate(2021, 9, 2)).season72).toBe(SEASON72[32]);
  expect(getSeason(createDate(2021, 9, 6)).season72).toBe(SEASON72[32]);
  expect(getSeason(createDate(2021, 9, 7)).season72).toBe(SEASON72[33]);
  expect(getSeason(createDate(2021, 9, 11)).season72).toBe(SEASON72[33]);
  expect(getSeason(createDate(2021, 9, 12)).season72).toBe(SEASON72[34]);
  expect(getSeason(createDate(2021, 9, 17)).season72).toBe(SEASON72[34]);
  expect(getSeason(createDate(2021, 9, 18)).season72).toBe(SEASON72[35]);
  expect(getSeason(createDate(2021, 9, 22)).season72).toBe(SEASON72[35]);
  expect(getSeason(createDate(2021, 9, 23)).season72).toBe(SEASON72[36]);
  expect(getSeason(createDate(2021, 9, 27)).season72).toBe(SEASON72[36]);
  expect(getSeason(createDate(2021, 9, 28)).season72).toBe(SEASON72[37]);
  expect(getSeason(createDate(2021, 10, 2)).season72).toBe(SEASON72[37]);
  expect(getSeason(createDate(2021, 10, 3)).season72).toBe(SEASON72[38]);
  expect(getSeason(createDate(2021, 10, 7)).season72).toBe(SEASON72[38]);
  expect(getSeason(createDate(2021, 10, 8)).season72).toBe(SEASON72[39]);
  expect(getSeason(createDate(2021, 10, 12)).season72).toBe(SEASON72[39]);
  expect(getSeason(createDate(2021, 10, 13)).season72).toBe(SEASON72[40]);
  expect(getSeason(createDate(2021, 10, 17)).season72).toBe(SEASON72[40]);
  expect(getSeason(createDate(2021, 10, 18)).season72).toBe(SEASON72[41]);
  expect(getSeason(createDate(2021, 10, 22)).season72).toBe(SEASON72[41]);
  expect(getSeason(createDate(2021, 10, 23)).season72).toBe(SEASON72[42]);
  expect(getSeason(createDate(2021, 10, 27)).season72).toBe(SEASON72[42]);
  expect(getSeason(createDate(2021, 10, 28)).season72).toBe(SEASON72[43]);
  expect(getSeason(createDate(2021, 11, 1)).season72).toBe(SEASON72[43]);
  expect(getSeason(createDate(2021, 11, 2)).season72).toBe(SEASON72[44]);
  expect(getSeason(createDate(2021, 11, 6)).season72).toBe(SEASON72[44]);
  expect(getSeason(createDate(2021, 11, 7)).season72).toBe(SEASON72[45]);
  expect(getSeason(createDate(2021, 11, 11)).season72).toBe(SEASON72[45]);
  expect(getSeason(createDate(2021, 11, 12)).season72).toBe(SEASON72[46]);
  expect(getSeason(createDate(2021, 11, 16)).season72).toBe(SEASON72[46]);
  expect(getSeason(createDate(2021, 11, 17)).season72).toBe(SEASON72[47]);
  expect(getSeason(createDate(2021, 11, 21)).season72).toBe(SEASON72[47]);
  expect(getSeason(createDate(2021, 11, 22)).season72).toBe(SEASON72[48]);
  expect(getSeason(createDate(2021, 11, 26)).season72).toBe(SEASON72[48]);
  expect(getSeason(createDate(2021, 11, 27)).season72).toBe(SEASON72[49]);
  expect(getSeason(createDate(2021, 12, 1)).season72).toBe(SEASON72[49]);
  expect(getSeason(createDate(2021, 12, 2)).season72).toBe(SEASON72[50]);
  expect(getSeason(createDate(2021, 12, 6)).season72).toBe(SEASON72[50]);
  expect(getSeason(createDate(2021, 12, 7)).season72).toBe(SEASON72[51]);
  expect(getSeason(createDate(2021, 12, 11)).season72).toBe(SEASON72[51]);
  expect(getSeason(createDate(2021, 12, 12)).season72).toBe(SEASON72[52]);
  expect(getSeason(createDate(2021, 12, 16)).season72).toBe(SEASON72[52]);
  expect(getSeason(createDate(2021, 12, 17)).season72).toBe(SEASON72[53]);
  expect(getSeason(createDate(2021, 12, 21)).season72).toBe(SEASON72[53]);
  expect(getSeason(createDate(2021, 12, 22)).season72).toBe(SEASON72[54]);
  expect(getSeason(createDate(2021, 12, 25)).season72).toBe(SEASON72[54]);
  expect(getSeason(createDate(2021, 12, 26)).season72).toBe(SEASON72[55]);
  expect(getSeason(createDate(2021, 12, 30)).season72).toBe(SEASON72[55]);
  expect(getSeason(createDate(2021, 12, 31)).season72).toBe(SEASON72[56]);
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

test('年（十干）の取得', () => {
  expect(getEtoYear(createDate(2000, 1, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoYear(createDate(2001, 1, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoYear(createDate(2002, 1, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoYear(createDate(2003, 1, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoYear(createDate(2004, 1, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoYear(createDate(2005, 1, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoYear(createDate(2006, 1, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoYear(createDate(2007, 1, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoYear(createDate(2008, 1, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoYear(createDate(2009, 1, 1)).jikkan).toBe(JIKKAN[5]);
});

test('年（十二支）の取得', () => {
  expect(getEtoYear(createDate(2000, 1, 1)).junishi).toBe(JUNISHI[4]);
  expect(getEtoYear(createDate(2001, 1, 1)).junishi).toBe(JUNISHI[5]);
  expect(getEtoYear(createDate(2002, 1, 1)).junishi).toBe(JUNISHI[6]);
  expect(getEtoYear(createDate(2003, 1, 1)).junishi).toBe(JUNISHI[7]);
  expect(getEtoYear(createDate(2004, 1, 1)).junishi).toBe(JUNISHI[8]);
  expect(getEtoYear(createDate(2005, 1, 1)).junishi).toBe(JUNISHI[9]);
  expect(getEtoYear(createDate(2006, 1, 1)).junishi).toBe(JUNISHI[10]);
  expect(getEtoYear(createDate(2007, 1, 1)).junishi).toBe(JUNISHI[11]);
  expect(getEtoYear(createDate(2008, 1, 1)).junishi).toBe(JUNISHI[0]);
  expect(getEtoYear(createDate(2009, 1, 1)).junishi).toBe(JUNISHI[1]);
  expect(getEtoYear(createDate(2010, 1, 1)).junishi).toBe(JUNISHI[2]);
  expect(getEtoYear(createDate(2011, 1, 1)).junishi).toBe(JUNISHI[3]);
});

test('月（十干）の取得', () => {
  expect(getEtoMonth(createDate(2000, 1, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoMonth(createDate(2000, 2, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoMonth(createDate(2000, 3, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoMonth(createDate(2000, 4, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoMonth(createDate(2000, 5, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoMonth(createDate(2000, 6, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoMonth(createDate(2000, 7, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoMonth(createDate(2000, 8, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoMonth(createDate(2000, 9, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoMonth(createDate(2000, 10, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoMonth(createDate(2000, 11, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoMonth(createDate(2000, 12, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoMonth(createDate(2001, 1, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoMonth(createDate(2001, 2, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoMonth(createDate(2001, 3, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoMonth(createDate(2001, 4, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoMonth(createDate(2001, 5, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoMonth(createDate(2001, 6, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoMonth(createDate(2001, 7, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoMonth(createDate(2001, 8, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoMonth(createDate(2001, 9, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoMonth(createDate(2001, 10, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoMonth(createDate(2001, 11, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoMonth(createDate(2001, 12, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoMonth(createDate(2002, 1, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoMonth(createDate(2002, 2, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoMonth(createDate(2002, 3, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoMonth(createDate(2002, 4, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoMonth(createDate(2002, 5, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoMonth(createDate(2002, 6, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoMonth(createDate(2002, 7, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoMonth(createDate(2002, 8, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoMonth(createDate(2002, 9, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoMonth(createDate(2002, 10, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoMonth(createDate(2002, 11, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoMonth(createDate(2002, 12, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoMonth(createDate(2003, 1, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoMonth(createDate(2003, 2, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoMonth(createDate(2003, 3, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoMonth(createDate(2003, 4, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoMonth(createDate(2003, 5, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoMonth(createDate(2003, 6, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoMonth(createDate(2003, 7, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoMonth(createDate(2003, 8, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoMonth(createDate(2003, 9, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoMonth(createDate(2003, 10, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoMonth(createDate(2003, 11, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoMonth(createDate(2003, 12, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoMonth(createDate(2004, 1, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoMonth(createDate(2004, 2, 1)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoMonth(createDate(2004, 3, 1)).jikkan).toBe(JIKKAN[4]);
  expect(getEtoMonth(createDate(2004, 4, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoMonth(createDate(2004, 5, 1)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoMonth(createDate(2004, 6, 1)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoMonth(createDate(2004, 7, 1)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoMonth(createDate(2004, 8, 1)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoMonth(createDate(2004, 9, 1)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoMonth(createDate(2004, 10, 1)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoMonth(createDate(2004, 11, 1)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoMonth(createDate(2004, 12, 1)).jikkan).toBe(JIKKAN[3]);
});

test('月（十二支）の取得', () => {
  expect(getEtoMonth(createDate(2021, 1, 1)).junishi).toBe(JUNISHI[2]);
  expect(getEtoMonth(createDate(2021, 2, 1)).junishi).toBe(JUNISHI[3]);
  expect(getEtoMonth(createDate(2021, 3, 1)).junishi).toBe(JUNISHI[4]);
  expect(getEtoMonth(createDate(2021, 4, 1)).junishi).toBe(JUNISHI[5]);
  expect(getEtoMonth(createDate(2021, 5, 1)).junishi).toBe(JUNISHI[6]);
  expect(getEtoMonth(createDate(2021, 6, 1)).junishi).toBe(JUNISHI[7]);
  expect(getEtoMonth(createDate(2021, 7, 1)).junishi).toBe(JUNISHI[8]);
  expect(getEtoMonth(createDate(2021, 8, 1)).junishi).toBe(JUNISHI[9]);
  expect(getEtoMonth(createDate(2021, 9, 1)).junishi).toBe(JUNISHI[10]);
  expect(getEtoMonth(createDate(2021, 10, 1)).junishi).toBe(JUNISHI[11]);
  expect(getEtoMonth(createDate(2021, 11, 1)).junishi).toBe(JUNISHI[0]);
  expect(getEtoMonth(createDate(2021, 12, 1)).junishi).toBe(JUNISHI[1]);
});

test('日（十干）の取得', () => {
  expect(getEtoDay(createDate(2021, 1, 1)).jikkan).toBe(JIKKAN[5]);
  expect(getEtoDay(createDate(2021, 1, 2)).jikkan).toBe(JIKKAN[6]);
  expect(getEtoDay(createDate(2021, 1, 3)).jikkan).toBe(JIKKAN[7]);
  expect(getEtoDay(createDate(2021, 1, 4)).jikkan).toBe(JIKKAN[8]);
  expect(getEtoDay(createDate(2021, 1, 5)).jikkan).toBe(JIKKAN[9]);
  expect(getEtoDay(createDate(2021, 1, 6)).jikkan).toBe(JIKKAN[0]);
  expect(getEtoDay(createDate(2021, 1, 7)).jikkan).toBe(JIKKAN[1]);
  expect(getEtoDay(createDate(2021, 1, 8)).jikkan).toBe(JIKKAN[2]);
  expect(getEtoDay(createDate(2021, 1, 9)).jikkan).toBe(JIKKAN[3]);
  expect(getEtoDay(createDate(2021, 1, 10)).jikkan).toBe(JIKKAN[4]);
});

test('日（十二支）の取得', () => {
  expect(getEtoDay(createDate(2021, 1, 1)).junishi).toBe(JUNISHI[9]);
  expect(getEtoDay(createDate(2021, 1, 2)).junishi).toBe(JUNISHI[10]);
  expect(getEtoDay(createDate(2021, 1, 3)).junishi).toBe(JUNISHI[11]);
  expect(getEtoDay(createDate(2021, 1, 4)).junishi).toBe(JUNISHI[0]);
  expect(getEtoDay(createDate(2021, 1, 5)).junishi).toBe(JUNISHI[1]);
  expect(getEtoDay(createDate(2021, 1, 6)).junishi).toBe(JUNISHI[2]);
  expect(getEtoDay(createDate(2021, 1, 7)).junishi).toBe(JUNISHI[3]);
  expect(getEtoDay(createDate(2021, 1, 8)).junishi).toBe(JUNISHI[4]);
  expect(getEtoDay(createDate(2021, 1, 9)).junishi).toBe(JUNISHI[5]);
  expect(getEtoDay(createDate(2021, 1, 10)).junishi).toBe(JUNISHI[6]);
  expect(getEtoDay(createDate(2021, 1, 11)).junishi).toBe(JUNISHI[7]);
  expect(getEtoDay(createDate(2021, 1, 12)).junishi).toBe(JUNISHI[8]);
});

test('月相の取得', () => {
  expect(getLunaPhase(createLuna(2021, 1, 1))).toBe(LUNA_PHASES[17]);
  expect(getLunaPhase(createLuna(2021, 1, 2))).toBe(LUNA_PHASES[18]);
  expect(getLunaPhase(createLuna(2021, 1, 3))).toBe(LUNA_PHASES[19]);
  expect(getLunaPhase(createLuna(2021, 1, 4))).toBe(LUNA_PHASES[20]);
  expect(getLunaPhase(createLuna(2021, 1, 5))).toBe(LUNA_PHASES[21]);
  expect(getLunaPhase(createLuna(2021, 1, 6))).toBe(LUNA_PHASES[22]);
  expect(getLunaPhase(createLuna(2021, 1, 7))).toBe(LUNA_PHASES[23]);
  expect(getLunaPhase(createLuna(2021, 1, 8))).toBe(LUNA_PHASES[24]);
  expect(getLunaPhase(createLuna(2021, 1, 9))).toBe(LUNA_PHASES[25]);
  expect(getLunaPhase(createLuna(2021, 1, 10))).toBe(LUNA_PHASES[26]);
  expect(getLunaPhase(createLuna(2021, 1, 11))).toBe(LUNA_PHASES[27]);
  expect(getLunaPhase(createLuna(2021, 1, 12))).toBe(LUNA_PHASES[28]);
  expect(getLunaPhase(createLuna(2021, 1, 13))).toBe(LUNA_PHASES[29]);
  expect(getLunaPhase(createLuna(2021, 1, 14))).toBe(LUNA_PHASES[0]);
  expect(getLunaPhase(createLuna(2021, 1, 15))).toBe(LUNA_PHASES[1]);
  expect(getLunaPhase(createLuna(2021, 1, 16))).toBe(LUNA_PHASES[2]);
  expect(getLunaPhase(createLuna(2021, 1, 17))).toBe(LUNA_PHASES[3]);
  expect(getLunaPhase(createLuna(2021, 1, 18))).toBe(LUNA_PHASES[4]);
  expect(getLunaPhase(createLuna(2021, 1, 19))).toBe(LUNA_PHASES[5]);
  expect(getLunaPhase(createLuna(2021, 1, 20))).toBe(LUNA_PHASES[6]);
  expect(getLunaPhase(createLuna(2021, 1, 21))).toBe(LUNA_PHASES[7]);
  expect(getLunaPhase(createLuna(2021, 1, 22))).toBe(LUNA_PHASES[8]);
  expect(getLunaPhase(createLuna(2021, 1, 23))).toBe(LUNA_PHASES[9]);
  expect(getLunaPhase(createLuna(2021, 1, 24))).toBe(LUNA_PHASES[10]);
  expect(getLunaPhase(createLuna(2021, 1, 25))).toBe(LUNA_PHASES[11]);
  expect(getLunaPhase(createLuna(2021, 1, 26))).toBe(LUNA_PHASES[12]);
  expect(getLunaPhase(createLuna(2021, 1, 27))).toBe(LUNA_PHASES[13]);
  expect(getLunaPhase(createLuna(2021, 1, 28))).toBe(LUNA_PHASES[14]);
  expect(getLunaPhase(createLuna(2021, 1, 29))).toBe(LUNA_PHASES[15]);
  expect(getLunaPhase(createLuna(2021, 1, 30))).toBe(LUNA_PHASES[16]);
  expect(getLunaPhase(createLuna(2021, 1, 31))).toBe(LUNA_PHASES[17]);
});

test('潮汐の取得', () => {
  expect(getTidePhase(createLuna(2021, 1, 1))).toBe(TIDE_PHASES[17]);
  expect(getTidePhase(createLuna(2021, 1, 2))).toBe(TIDE_PHASES[18]);
  expect(getTidePhase(createLuna(2021, 1, 3))).toBe(TIDE_PHASES[19]);
  expect(getTidePhase(createLuna(2021, 1, 4))).toBe(TIDE_PHASES[20]);
  expect(getTidePhase(createLuna(2021, 1, 5))).toBe(TIDE_PHASES[21]);
  expect(getTidePhase(createLuna(2021, 1, 6))).toBe(TIDE_PHASES[22]);
  expect(getTidePhase(createLuna(2021, 1, 7))).toBe(TIDE_PHASES[23]);
  expect(getTidePhase(createLuna(2021, 1, 8))).toBe(TIDE_PHASES[24]);
  expect(getTidePhase(createLuna(2021, 1, 9))).toBe(TIDE_PHASES[25]);
  expect(getTidePhase(createLuna(2021, 1, 10))).toBe(TIDE_PHASES[26]);
  expect(getTidePhase(createLuna(2021, 1, 11))).toBe(TIDE_PHASES[27]);
  expect(getTidePhase(createLuna(2021, 1, 12))).toBe(TIDE_PHASES[28]);
  expect(getTidePhase(createLuna(2021, 1, 13))).toBe(TIDE_PHASES[29]);
  expect(getTidePhase(createLuna(2021, 1, 14))).toBe(TIDE_PHASES[0]);
  expect(getTidePhase(createLuna(2021, 1, 15))).toBe(TIDE_PHASES[1]);
  expect(getTidePhase(createLuna(2021, 1, 16))).toBe(TIDE_PHASES[2]);
  expect(getTidePhase(createLuna(2021, 1, 17))).toBe(TIDE_PHASES[3]);
  expect(getTidePhase(createLuna(2021, 1, 18))).toBe(TIDE_PHASES[4]);
  expect(getTidePhase(createLuna(2021, 1, 19))).toBe(TIDE_PHASES[5]);
  expect(getTidePhase(createLuna(2021, 1, 20))).toBe(TIDE_PHASES[6]);
  expect(getTidePhase(createLuna(2021, 1, 21))).toBe(TIDE_PHASES[7]);
  expect(getTidePhase(createLuna(2021, 1, 22))).toBe(TIDE_PHASES[8]);
  expect(getTidePhase(createLuna(2021, 1, 23))).toBe(TIDE_PHASES[9]);
  expect(getTidePhase(createLuna(2021, 1, 24))).toBe(TIDE_PHASES[10]);
  expect(getTidePhase(createLuna(2021, 1, 25))).toBe(TIDE_PHASES[11]);
  expect(getTidePhase(createLuna(2021, 1, 26))).toBe(TIDE_PHASES[12]);
  expect(getTidePhase(createLuna(2021, 1, 27))).toBe(TIDE_PHASES[13]);
  expect(getTidePhase(createLuna(2021, 1, 28))).toBe(TIDE_PHASES[14]);
  expect(getTidePhase(createLuna(2021, 1, 29))).toBe(TIDE_PHASES[15]);
  expect(getTidePhase(createLuna(2021, 1, 30))).toBe(TIDE_PHASES[16]);
  expect(getTidePhase(createLuna(2021, 1, 31))).toBe(TIDE_PHASES[17]);
});

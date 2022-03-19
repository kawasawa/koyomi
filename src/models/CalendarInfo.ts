import JapaneseLunisolarCalendar, { calcJulianCenturyNumber, calcSunLongitude } from './JapaneseLunisolarCalendar';

// ============================================================
// メソッド
// ============================================================

/**
 * 歴中を取得します。
 * @param calendar 旧暦インスタンス
 * @returns 歴中
 */
export const createCalendarInfo = (calendar: JapaneseLunisolarCalendar) => {
  if (isNaN(calendar.date.getTime())) return undefined;
  return {
    era: getEra(calendar.date),
    jpMonth: getJpMonth(calendar.date),
    jpWeek: getJpWeek(calendar.date),
    rokuyo: getRokuyo(calendar),
    shichiyo: getShichiyo(calendar.date),
    etoYear: getEtoYear(calendar.date),
    etoMonth: getEtoMonth(calendar.date),
    etoDay: getEtoDay(calendar.date),
    season: getSeaseon(calendar),
    sign: getSign(calendar.date),
    lunaPhase: getLunaPhase(calendar),
    tidePhase: getTidePhase(calendar),
  };
};
export default createCalendarInfo;

/**
 * 太陽黄経を取得します。
 * @param julianDay ユリウス日
 * @param flag 取得の基準となる気候
 * @returns 太陽黄経
 */
export const getEclipticCoordinate = (
  julianDay: number,
  flag: eclipticCoordinateFlag = eclipticCoordinateValues.none
) => {
  const jd1 = Math.floor(julianDay);
  const jd2 = julianDay - jd1 - 9.0 / 24.0;
  const t = calcJulianCenturyNumber(jd1 + jd2);
  switch (flag) {
    case eclipticCoordinateValues.none:
      return Math.floor(calcSunLongitude(t) * 100.0) / 100.0;
    case eclipticCoordinateValues.season24:
      return Math.floor(calcSunLongitude(t) / 15.0) * 15.0;
    case eclipticCoordinateValues.season72:
      return Math.floor(calcSunLongitude(t) / 5.0) * 5.0;
  }
};

/**
 * 元号を取得します。
 * @param date Date インスタンス
 * @returns 元号
 */
export const getEra = (date: Date) => {
  const year_month_date = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  for (let i = ERAS.length - 1; 0 <= i; i--) {
    if ((ERAS[i].startAt ?? NaN) <= year_month_date) {
      return ERAS[i];
    }
  }
  throw new RangeError();
};

/**
 * 和風月名を取得します。
 * @param date Date インスタンス
 * @returns 和風月名
 */
export const getJpMonth = (date: Date) => JP_MONTHS[date.getMonth()];

/**
 * 曜日を取得します。
 * @param date Date インスタンス
 * @returns 曜日
 */
export const getJpWeek = (date: Date) => JP_WEEKS[date.getDay()];

/**
 * 六曜を取得します。
 * @param calendar 旧暦インスタンス
 * @returns 六曜
 */
export const getRokuyo = (calendar: JapaneseLunisolarCalendar) => ROKUYO[(calendar.month + calendar.day - 2) % 6];

/**
 * 七曜を取得します。
 * @param date Date インスタンス
 * @returns 七曜
 */
export const getShichiyo = (date: Date) => SHICHIYO[date.getDay()];

/**
 * 年の干支を取得します
 * @param date Date インスタンス
 * @returns [十干, 十二支]
 */
export const getEtoYear = (date: Date) => ({
  jikkan: JIKKAN[(date.getFullYear() + 6) % 10],
  junishi: JUNISHI[(date.getFullYear() + 8) % 12],
});

/**
 * 月の干支を取得します
 * @param date Date インスタンス
 * @returns [十干, 十二支]
 * @remarks
 * - 暦と天文の雑学
 * - http://koyomi.vis.ne.jp/reki_doc/doc_0020.htm
 * - 2021/07/25 参照
 *
 * 暦月 | １ | ２ | ３ | ４ | ５ | ６ | ７ | ８ | ９ | 10 | 11 | 12 | [%5]
 * 天干 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 0
 *      | 庚 | 辛 | 壬 | 癸 | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 1
 *      | 壬 | 癸 | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 | 2
 *      | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 | 甲 | 乙 | 3
 *      | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 | 甲 | 乙 | 丙 | 丁 | 4
 * -----------------------------------------------------------------
 * 暦月 | １ | ２ | ３ | ４ | ５ | ６ | ７ | ８ | ９ | 10 | 11 | 12 |
 * 地支 | 寅 | 卯 | 辰 | 巳 | 午 | 未 | 申 | 酉 | 戌 | 亥 | 子 | 丑 |
 */
export const getEtoMonth = (date: Date) => ({
  jikkan: JIKKAN[(date.getMonth() + (((date.getFullYear() % 5) * 2 + 4) % 10)) % JIKKAN.length],
  junishi: JUNISHI[(date.getMonth() + 2) % JUNISHI.length],
});

/**
 * 日の干支を取得します。
 * @param date Date インスタンス
 * @returns [十干, 十二支]
 * @remarks
 * - 六十干支の計算方法
 * - http://www.tadopika.net/fate/sixtycount.html
 * - 2021/07/25 参照
 *
 * 暦月 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 |
 * Ｃ   |  9 | 40 |  8 | 39 |  9 | 40 | 10 | 41 | 12 | 42 | 13 | 43 |
 * -----------------------------------------------------------------
 * Ｎ   | ０ | １ | ２ | ３ | ４ | ５ | ６ | ７ | ８ | ９ |
 * 十干 | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 |
 * -----------------------------------------------------------------
 * Ｍ     | ０ | １ | ２ | ３ | ４ | ５ | ６ | ７ | ８ | ９ | 10 | 11 |
 * 十二支 | 子 | 丑 | 寅 | 卯 | 辰 | 巳 | 午 | 未 | 申 | 酉 | 戌 | 亥 |
 */
export const getEtoDay = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const A = (year % 12) * 5;
  const B1 = Math.floor((1 < month ? year : year - 1) / 4);
  const B2 = Math.floor((1 < month ? year : year - 1) / 100);
  const B3 = Math.floor(B1 / 100);
  const C = [9, 40, 8, 39, 9, 40, 10, 41, 12, 42, 13, 43][month];
  const Z = A + B1 - B2 + B3 + C + day;
  const N = Number(Z.toString().slice(-1));
  const M = Z % 12;
  return { jikkan: JIKKAN[N], junishi: JUNISHI[M] };
};

/**
 * 気候を取得します。
 * @param calendar 旧暦インスタンス
 * @returns [四季, 二十四節気, 七十二候]
 */
export const getSeaseon = (calendar: JapaneseLunisolarCalendar) => {
  const julianDay = Math.floor(calendar.date.getJulianDay());

  const i_s72 = getEclipticCoordinate(julianDay + 1, eclipticCoordinateValues.season72) / 5;
  const season72 = SEASON72[i_s72];

  const i_s4 = Math.floor(((i_s72 + 9) % 72) / 18); // 東風解凍（立春）が基準となるように調整
  const season4 = SEASON4[i_s4];

  let season24: CalendarInfo;
  const offset24 = getEclipticCoordinate(julianDay, eclipticCoordinateValues.season24);
  for (let i = 0; ; i++) {
    const next24 = getEclipticCoordinate(julianDay + 1 + i, eclipticCoordinateValues.season24);
    if (offset24 !== next24) {
      const i_s24 = next24 / 15;
      season24 = {
        value: SEASON24[i_s24].value,
        kana: SEASON24[i_s24].kana,
        summary: SEASON24[i_s24].summary,
        startAt: i,
      };
      break;
    }
  }

  return { season4, season24, season72 };
};

/**
 * 星座を取得します。
 * @param date Date インスタンス
 * @returns [十二星座, 十三星座]
 */
export const getSign = (date: Date) => {
  const month_date = (date.getMonth() + 1) * 100 + date.getDate();

  let sign12 = SIGN12[SIGN12.length - 1];
  for (let i = SIGN12.length - 1; 0 <= i; i--) {
    if ((SIGN12[i].startAt ?? NaN) <= month_date) {
      sign12 = SIGN12[i];
      break;
    }
  }

  let sign13 = SIGN13[SIGN13.length - 1];
  for (let i = SIGN13.length - 1; 0 <= i; i--) {
    if ((SIGN13[i].startAt ?? NaN) <= month_date) {
      sign13 = SIGN13[i];
      break;
    }
  }

  return { sign12, sign13 };
};

/**
 * 月相
 * @param calendar 旧暦インスタンス
 * @returns 月相
 */
export const getLunaPhase = (calendar: JapaneseLunisolarCalendar) => LUNA_PHASES[Math.floor(calendar.lunaAge)];

/**
 * 潮汐を取得します。
 * @param calendar 旧暦インスタンス
 * @returns 潮汐
 */
export const getTidePhase = (calendar: JapaneseLunisolarCalendar) => TIDE_PHASES[Math.floor(calendar.lunaAge) % 30];

// ============================================================
// 定数
// ============================================================

export type CalendarInfo = Readonly<{
  value: string;
  kana?: string;
  summary?: string;
  url?: string;
  startAt?: number;
}>;

export const eclipticCoordinateValues = {
  none: 'none',
  season24: 'season24',
  season72: 'season72',
} as const;
export type eclipticCoordinateFlag = typeof eclipticCoordinateValues[keyof typeof eclipticCoordinateValues];

export const JP_WEEKS: Array<CalendarInfo> = [
  { value: '日', kana: 'にち' },
  { value: '月', kana: 'げつ' },
  { value: '火', kana: 'か' },
  { value: '水', kana: 'すい' },
  { value: '木', kana: 'もく' },
  { value: '金', kana: 'きん' },
  { value: '土', kana: 'ど' },
];

export const ROKUYO: Array<CalendarInfo> = [
  {
    value: '先勝',
    kana: 'せんしょう',
    summary: '急ぐことは吉。午前は吉、午後は凶。',
  },
  {
    value: '友引',
    kana: 'ともびき',
    summary: '友を引く。祝い事は良いが葬式などの凶事を忌む。朝夕は吉、正午は凶など。',
  },
  {
    value: '先負',
    kana: 'せんぷ',
    summary: '何事も控えめに平静を保つ日。午前は凶、午後は吉。',
  },
  {
    value: '仏滅',
    kana: 'ぶつめつ',
    summary: '万事凶。葬式や法事は構わない。',
  },
  {
    value: '大安',
    kana: 'たいあん',
    summary: '万事大吉。特に婚礼に良い。',
  },
  {
    value: '赤口',
    kana: 'しゃっこう',
    summary: '凶日。特に祝事は大凶。火の元、刃物に要注意。正午は吉、朝夕は凶。',
  },
];

export const SHICHIYO: Array<CalendarInfo> = [
  { value: '太陽', kana: 'たいよう' },
  { value: '月', kana: 'つき' },
  { value: '火星', kana: 'かせい' },
  { value: '水星', kana: 'すいせい' },
  { value: '木星', kana: 'もくせい' },
  { value: '金星', kana: 'きんせい' },
  { value: '土星', kana: 'どせい' },
];

export const ERAS: Array<CalendarInfo> = [
  {
    value: '慶応',
    kana: 'けいおう',
    startAt: 18650408,
  },
  {
    value: '明治',
    kana: 'めいじ',
    startAt: 18680908,
  },
  {
    value: '大正',
    kana: 'たいしょう',
    startAt: 19120730,
  },
  {
    value: '昭和',
    kana: 'しょうわ',
    startAt: 19261225,
  },
  {
    value: '平成',
    kana: 'へいせい',
    startAt: 19890108,
  },
  {
    value: '令和',
    kana: 'れいわ',
    startAt: 20190501,
  },
];

export const JP_MONTHS: Array<CalendarInfo> = [
  {
    value: '睦月',
    kana: 'むつき',
    summary: '正月に親類一同が集まる、睦び（親しくする）の月。',
  },
  {
    value: '如月',
    kana: 'きさらぎ',
    summary: '衣更着（きさらぎ）とも言う。まだ寒さが残っていて、衣を重ね着する（更に着る）月。',
  },
  {
    value: '弥生',
    kana: 'やよい',
    summary: '木草弥生い茂る（きくさいやおいしげる、草木が生い茂る）月。',
  },
  {
    value: '卯月',
    kana: 'うづき',
    summary: '卯の花の月。',
  },
  {
    value: '皐月',
    kana: 'さつき',
    summary: '早月（さつき）とも言う。早苗（さなえ）を植える月。',
  },
  {
    value: '水無月',
    kana: 'みなづき',
    summary: '水の月（「無」は「の」を意味する）で、田に水を引く月の意と言われる。',
  },
  {
    value: '文月',
    kana: 'ふみづき',
    summary: '稲の穂が実る月（穂含月：ほふみづき）。',
  },
  {
    value: '葉月',
    kana: 'はづき',
    summary: '木々の葉落ち月（はおちづき）。',
  },
  {
    value: '長月',
    kana: 'ながつき',
    summary: '夜長月（よながづき）。',
  },
  {
    value: '神無月',
    kana: 'かんなづき',
    summary:
      '神の月（「無」は「の」を意味する）の意味。全国の神々が出雲大社に集まり、各地の神々が留守になる月という説などもある。',
  },
  {
    value: '霜月',
    kana: 'しもつき',
    summary: '霜の降る月。',
  },
  {
    value: '師走',
    kana: 'しわす',
    summary: '師匠といえども趨走（すうそう、走り回る）する月。',
  },
];

export const JIKKAN: Array<CalendarInfo> = [
  { value: '甲', kana: 'きのえ' },
  { value: '乙', kana: 'きのと' },
  { value: '丙', kana: 'ひのえ' },
  { value: '丁', kana: 'ひのと' },
  { value: '戊', kana: 'つちのえ' },
  { value: '己', kana: 'つちのと' },
  { value: '庚', kana: 'かのえ' },
  { value: '辛', kana: 'かのと' },
  { value: '壬', kana: 'みずのえ' },
  { value: '癸', kana: 'みずのと' },
];

export const JUNISHI: Array<CalendarInfo> = [
  { value: '子', kana: 'ね' },
  { value: '丑', kana: 'うし' },
  { value: '寅', kana: 'とら' },
  { value: '卯', kana: 'う' },
  { value: '辰', kana: 'たつ' },
  { value: '巳', kana: 'み' },
  { value: '午', kana: 'うま' },
  { value: '未', kana: 'ひつじ' },
  { value: '申', kana: 'さる' },
  { value: '酉', kana: 'とり' },
  { value: '戌', kana: 'いぬ' },
  { value: '亥', kana: 'い' },
];

export const SEASON4: Array<CalendarInfo> = [
  { value: '春', kana: 'はる' },
  { value: '夏', kana: 'なつ' },
  { value: '秋', kana: 'あき' },
  { value: '冬', kana: 'ふゆ' },
];

export const SEASON24: Array<CalendarInfo> = [
  {
    value: '春分',
    kana: 'しゅんぶん',
    summary: '太陽が真東から昇って真西に沈み、昼夜がほぼ等しくなる',
  },
  {
    value: '清明',
    kana: 'せいめい',
    summary: 'すべてのものが生き生きとして、清らかに見える',
  },
  {
    value: '穀雨',
    kana: 'こくう',
    summary: '穀物をうるおす春雨が降る',
  },
  {
    value: '立夏',
    kana: 'りっか',
    summary: '夏の気配が感じられる',
  },
  {
    value: '小満',
    kana: 'しょうまん',
    summary: 'すべてのものがしだいにのびて天地に満ち始める',
  },
  {
    value: '芒種',
    kana: 'ぼうしゅ',
    summary: '稲などの（芒のある）穀物を植える',
  },
  {
    value: '夏至',
    kana: 'げし',
    summary: '昼の長さが最も長くなる',
  },
  {
    value: '小暑',
    kana: 'しょうしょ',
    summary: '暑気に入り梅雨のあけるころ',
  },
  {
    value: '大暑',
    kana: 'たいしょ',
    summary: '夏の暑さがもっとも極まるころ',
  },
  {
    value: '立秋',
    kana: 'りっしゅう',
    summary: '秋の気配が感じられる',
  },
  {
    value: '処暑',
    kana: 'しょしょ',
    summary: '暑さがおさまるころ',
  },
  {
    value: '白露',
    kana: 'はくろ',
    summary: 'しらつゆが草に宿る',
  },
  {
    value: '秋分',
    kana: 'しゅうぶん',
    summary: '秋の彼岸の中日、昼夜がほぼ等しくなる',
  },
  {
    value: '寒露',
    kana: 'かんろ',
    summary: '秋が深まり野草に冷たい露がむすぶ',
  },
  {
    value: '霜降',
    kana: 'そうこう',

    summary: '霜が降りるころ',
  },
  {
    value: '立冬',
    kana: 'りっとう',

    summary: '冬の気配が感じられる',
  },
  {
    value: '小雪',
    kana: 'しょうせつ',
    summary: '寒くなって雨が雪になる',
  },
  {
    value: '大雪',
    kana: 'たいせつ',
    summary: '雪がいよいよ降りつもってくる',
  },
  {
    value: '冬至',
    kana: 'とうじ',
    summary: '昼が一年中で一番短くなる',
  },
  {
    value: '小寒',
    kana: 'しょうかん',
    summary: '寒の入りで、寒気がましてくる',
  },
  {
    value: '大寒',
    kana: 'だいかん',
    summary: '冷気が極まって、最も寒さがつのる',
  },
  {
    value: '立春',
    kana: 'りっしゅん',
    summary: '寒さも峠を越え、春の気配が感じられる',
  },
  {
    value: '雨水',
    kana: 'うすい',
    summary: '陽気がよくなり、雪や氷が溶けて水になり、雪が雨に変わる',
  },
  {
    value: '啓蟄',
    kana: 'けいちつ',
    summary: '冬ごもりしていた地中の虫がはい出てくる',
  },
];

export const SEASON72: Array<CalendarInfo> = [
  {
    value: '雀始巣',
    kana: 'すずめはじめてすくう',
    summary: '雀が巣を構え始める',
  },
  {
    value: '桜始開',
    kana: 'さくらはじめてひらく',
    summary: '桜の花が咲き始める',
  },
  {
    value: '雷乃発声',
    kana: 'かみなりすなわちこえをはっす',
    summary: '遠くで雷の音がし始める',
  },
  {
    value: '玄鳥至',
    kana: 'つばめきたる',
    summary: '燕が南からやって来る',
  },
  {
    value: '鴻雁北',
    kana: 'こうがんきたへかえる',
    summary: '雁が北へ渡って行く',
  },
  {
    value: '虹始見',
    kana: 'にじはじめてあらわる',
    summary: '雨の後に虹が出始める',
  },
  {
    value: '葭始生',
    kana: 'あしはじめてしょうず',
    summary: '葦が芽を吹き始める',
  },
  {
    value: '霜止出苗',
    kana: 'しもやんでなえいづる',
    summary: '霜が終り稲の苗が生長する',
  },
  {
    value: '牡丹華',
    kana: 'ぼたんはなさく',
    summary: '牡丹の花が咲く',
  },
  {
    value: '蛙始鳴',
    kana: 'かわずはじめてなく',
    summary: '蛙が鳴き始める',
  },
  {
    value: '蚯蚓出',
    kana: 'みみずいづる',
    summary: '蚯蚓が地上に這出る',
  },
  {
    value: '竹笋生',
    kana: 'たけのこしょうず',
    summary: '筍が生えて来る',
  },
  {
    value: '蚕起食桑',
    kana: 'かいこおきてくわをはむ',
    summary: '蚕が桑を盛んに食べ始める',
  },
  {
    value: '紅花栄',
    kana: 'べにばなさかう',
    summary: '紅花が盛んに咲く',
  },
  {
    value: '麦秋至',
    kana: 'むぎのときいたる',
    summary: '麦が熟し麦秋となる',
  },
  {
    value: '螳螂生',
    kana: 'かまきりしょうず',
    summary: '螳螂が生まれ出る',
  },
  {
    value: '腐草為蛍',
    kana: 'くされたるくさほたるとなる',
    summary: '腐った草が蒸れ蛍になる',
  },
  {
    value: '梅子黄',
    kana: 'うめのみきばむ',
    summary: '梅の実が黄ばんで熟す',
  },
  {
    value: '乃東枯',
    kana: 'なつかれくさかるる',
    summary: '夏枯草が枯れる',
  },
  {
    value: '菖蒲華',
    kana: 'あやめはなさく',
    summary: 'あやめの花が咲く',
  },
  {
    value: '半夏生',
    kana: 'はんげしょうず',
    summary: '烏柄杓が生える',
  },
  {
    value: '温風至',
    kana: 'あつかぜいたる',
    summary: '暖い風が吹いて来る',
  },
  {
    value: '蓮始開',
    kana: 'はすはじめてひらく',
    summary: '蓮の花が開き始める',
  },
  {
    value: '鷹乃学習',
    kana: 'たかすなわちわざをなす',
    summary: '鷹の幼鳥が飛ぶことを覚える',
  },
  {
    value: '桐始結花',
    kana: 'きりはじめてはなをむすぶ',
    summary: '桐の花が(来年の)蕾をつける',
  },
  {
    value: '土潤溽暑',
    kana: 'つちうるおうてむしあつし',
    summary: '土が湿って蒸暑くなる',
  },
  {
    value: '大雨時行',
    kana: 'たいうときどきにふる',
    summary: '時として大雨が降る',
  },
  {
    value: '涼風至',
    kana: 'すづかぜいたる',
    summary: '涼しい風が立ち始める',
  },
  {
    value: '寒蝉鳴',
    kana: 'ひぐらしなく',
    summary: '蜩が鳴き始める',
  },
  {
    value: '蒙霧升降',
    kana: 'ふかききりまとう',
    summary: '深い霧が立ち込める',
  },
  {
    value: '綿柎開',
    kana: 'わたのはなしべひらく',
    summary: '綿を包む萼（がく）が開く',
  },
  {
    value: '天地始粛',
    kana: 'てんちはじめてさむし',
    summary: 'ようやく暑さが鎮まる',
  },
  {
    value: '禾乃登',
    kana: 'こくものすなわちみのる',
    summary: '稲が実る',
  },
  {
    value: '草露白',
    kana: 'くさのつゆしろし',
    summary: '草に降りた露が白く光る',
  },
  {
    value: '鶺鴒鳴',
    kana: 'せきれいなく',
    summary: '鶺鴒（せきれい）が鳴き始める',
  },
  {
    value: '玄鳥去',
    kana: 'つばめさる',
    summary: '燕が南へ帰って行く',
  },
  {
    value: '雷乃収声',
    kana: 'かみなりすなわちこえをおさむ',
    summary: '雷が鳴り響かなくなる',
  },
  {
    value: '蟄虫坏戸',
    kana: 'むしかくれてとをふさぐ',
    summary: '虫が土中に掘った穴をふさぐ',
  },
  {
    value: '水始涸',
    kana: 'みずはじめてかる',
    summary: '田畑の水を干し始める',
  },
  {
    value: '鴻雁来',
    kana: 'こうがんきたる',
    summary: '雁が飛来し始める',
  },
  {
    value: '菊花開',
    kana: 'きくのはなひらく',
    summary: '菊の花が咲く',
  },
  {
    value: '蟋蟀在戸',
    kana: 'きりぎりすとにあり',
    summary: '蟋蟀が戸の辺りで鳴く',
  },
  {
    value: '霜始降',
    kana: 'しもはじめてふる',
    summary: '霜が降り始める',
  },
  {
    value: '霎時施',
    kana: 'こさめときどきふる',
    summary: '小雨がしとしと降る',
  },
  {
    value: '楓蔦黄',
    kana: 'もみじつたきばむ',
    summary: 'もみじや蔦が黄葉する',
  },
  {
    value: '山茶始開',
    kana: 'つばきはじめてひらく',
    summary: '山茶花が咲き始める',
  },
  {
    value: '地始凍',
    kana: 'ちはじめてこおる',
    summary: '大地が凍り始める',
  },
  {
    value: '金盞香',
    kana: 'きんせんかさく',
    summary: '水仙の花が咲く',
  },
  {
    value: '虹蔵不見',
    kana: 'にじかくれてみえず',
    summary: '虹を見かけなくなる',
  },
  {
    value: '朔風払葉',
    kana: 'きたかぜこのはをはらう',
    summary: '北風が木の葉を払い除ける',
  },
  {
    value: '橘始黄',
    kana: 'たちばなはじめてきばむ',
    summary: '橘の実が黄色くなり始める',
  },
  {
    value: '閉塞成冬',
    kana: 'そらさむくふゆとなる',
    summary: '天地の気が塞がって冬となる',
  },
  {
    value: '熊蟄穴',
    kana: 'くまあなにこもる',
    summary: '熊が冬眠のために穴に隠れる',
  },
  {
    value: '鱖魚群',
    kana: 'さけのうおむらがる',
    summary: '鮭が群がり川を上る',
  },
  {
    value: '乃東生',
    kana: 'なつかれくさしょうず',
    summary: '夏枯草が芽を出す',
  },
  {
    value: '麋角解',
    kana: 'おおしかのつのおつる',
    summary: '大鹿が角を落とす',
  },
  {
    value: '雪下出麦',
    kana: 'ゆきわたりてむぎいづる',
    summary: '雪の下で麦が芽を出す',
  },
  {
    value: '芹乃栄',
    kana: 'せりすなわちさかう',
    summary: '芹がよく生育する',
  },
  {
    value: '水泉動',
    kana: 'しみずあたたかをふくむ',
    summary: '地中で凍った泉が動き始める',
  },
  {
    value: '雉始雊',
    kana: 'きじはじめてなく',
    summary: '雄の雉が鳴き始める',
  },
  {
    value: '款冬華',
    kana: 'ふきのはなさく',
    summary: '蕗の薹（ふきのとう）が蕾を出す',
  },
  {
    value: '水沢腹堅',
    kana: 'さわみずこおりつめる',
    summary: '沢に氷が厚く張りつめる',
  },
  {
    value: '鶏始乳',
    kana: 'にわとりはじめてとやにつく',
    summary: '鶏が卵を産み始める',
  },
  {
    value: '東風解凍',
    kana: 'はるかぜこおりをとく',
    summary: '東風が厚い氷を解かし始める',
  },
  {
    value: '黄鶯睍睆',
    kana: 'うぐいすなく',
    summary: '鶯が山里で鳴き始める',
  },
  {
    value: '魚上氷',
    kana: 'うおこおりをいずる',
    summary: '割れた氷の間から魚が飛び出る',
  },
  {
    value: '土脉潤起',
    kana: 'つちのしょううるおいおこる',
    summary: '雨が降って土が湿り気を含む',
  },
  {
    value: '霞始靆',
    kana: 'かすみはじめてたなびく',
    summary: '霞がたなびき始める',
  },
  {
    value: '草木萌動',
    kana: 'そうもくめばえいずる',
    summary: '草木が芽吹き始める',
  },
  {
    value: '蟄虫啓戸',
    kana: 'すごもりむしとをひらく',
    summary: '冬籠りの虫が出て来る',
  },
  {
    value: '桃始笑',
    kana: 'ももはじめてさく',
    summary: '桃の花が咲き始める',
  },
  {
    value: '菜虫化蝶',
    kana: 'なむしちょうとなる',
    summary: '青虫が羽化して紋白蝶になる',
  },
];

export const SIGN12: Array<CalendarInfo> = [
  { value: '水瓶座', kana: 'みずがめ', startAt: 120 },
  { value: '魚座', kana: 'うお', startAt: 219 },
  { value: '牡羊座', kana: 'おひつじ', startAt: 321 },
  { value: '牡牛座', kana: 'おうし', startAt: 420 },
  { value: '双子座', kana: 'ふたご', startAt: 521 },
  { value: '蟹座', kana: 'かに', startAt: 622 },
  { value: '獅子座', kana: 'しし', startAt: 723 },
  { value: '乙女座', kana: 'おとめ', startAt: 823 },
  { value: '天秤座', kana: 'てんびん', startAt: 923 },
  { value: '蠍座', kana: 'かに', startAt: 1024 },
  { value: '射手座', kana: 'いて', startAt: 1123 },
  { value: '山羊座', kana: 'やぎ', startAt: 1222 },
];

export const SIGN13: Array<CalendarInfo> = [
  { value: '山羊座', kana: 'やぎ', startAt: 119 },
  { value: '水瓶座', kana: 'みずがめ', startAt: 216 },
  { value: '魚座', kana: 'うお', startAt: 312 },
  { value: '牡羊座', kana: 'おひつじ', startAt: 419 },
  { value: '牡牛座', kana: 'おうし', startAt: 514 },
  { value: '双子座', kana: 'ふたご', startAt: 621 },
  { value: '蟹座', kana: 'かに', startAt: 720 },
  { value: '獅子座', kana: 'しし', startAt: 820 },
  { value: '乙女座', kana: 'おとめ', startAt: 916 },
  { value: '天秤座', kana: 'てんびん', startAt: 1031 },
  { value: '蠍座', kana: 'かに', startAt: 1123 },
  { value: '蛇遣座', kana: 'へびつかい', startAt: 1130 },
  { value: '射手座', kana: 'いて', startAt: 1218 },
];

export const LUNA_PHASES: Array<CalendarInfo> = [
  { value: '新月', kana: 'しんげつ' },
  { value: '繊月', kana: 'せんげつ' },
  { value: '三日月', kana: 'みかづき' },
  { value: '黄昏月', kana: 'たそがれづき' },
  { value: '五日月' },
  { value: '六日月' },
  { value: '七日月' },
  { value: '上弦月', kana: 'じょうげんのつき' },
  { value: '九日月' },
  { value: '十日夜月', kana: 'とおかんやのつき' },
  { value: '十日余月', kana: 'とおかあまりのつき' },
  { value: '十二日月' },
  { value: '十三夜月', kana: 'じゅうさんやづき' },
  { value: '待宵月', kana: 'まちよいづき' },
  { value: '十五夜月', kana: 'じゅうごやづき' },
  { value: '十六夜月', kana: 'いざよいのつき' },
  { value: '立待月', kana: 'たちまちづき' },
  { value: '居待月', kana: 'いまちづき' },
  { value: '寝待月', kana: 'ねまちづき' },
  { value: '更待月', kana: 'ふけまちづき' },
  { value: '二十日余月', kana: 'はつかあまりのつき' },
  { value: '二十二日月' },
  { value: '下弦月', kana: 'かげんのつき' },
  { value: '真夜中月', kana: 'まよなかのつき' },
  { value: '二十五日月' },
  { value: '暁月', kana: 'ぎょうげつ' },
  { value: '二十七日月' },
  { value: '二十八日月' },
  { value: '二十九日月' },
  { value: '月隠', kana: 'つごもり' },
];

export const TIDE_PHASES: Array<CalendarInfo> = [
  { value: '大潮', kana: 'おおしお' },
  { value: '大潮', kana: 'おおしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '小潮', kana: 'こしお' },
  { value: '小潮', kana: 'こしお' },
  { value: '小潮', kana: 'こしお' },
  { value: '長潮', kana: 'ながしお' },
  { value: '若潮', kana: 'わかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '大潮', kana: 'おおしお' },
  { value: '大潮', kana: 'おおしお' },
  { value: '大潮', kana: 'おおしお' },
  { value: '大潮', kana: 'おおしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '小潮', kana: 'こしお' },
  { value: '小潮', kana: 'こしお' },
  { value: '小潮', kana: 'こしお' },
  { value: '長潮', kana: 'ながしお' },
  { value: '若潮', kana: 'わかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '中潮', kana: 'なかしお' },
  { value: '大潮', kana: 'おおしお' },
  { value: '大潮', kana: 'おおしお' },
];

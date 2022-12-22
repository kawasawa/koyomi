import JapaneseLunisolarCalendar, { calcJulianCenturyNumber, calcSunLongitude } from './JapaneseLunisolarCalendar';

// ============================================================
// メソッド
// ============================================================

/**
 * 暦注を取得します。
 * @param calendar 旧暦インスタンス
 * @returns 暦注
 */
export const createCalendarInfo = (calendar: JapaneseLunisolarCalendar) => {
  if (isNaN(calendar.date.getTime())) return undefined;

  const julianDay = calendar.date.getJulianDay();
  const season = getSeason(julianDay);
  const setsuMonth = getSetsuMonth(season.season24);
  return {
    rokuyo: getRokuyo(calendar),
    junichoku: getJunichoku(julianDay, setsuMonth),
    nijuhashuku: getNijuhashuku(julianDay),
    season: season,
    zodiac: {
      year: getZodiacYear(calendar.date),
      month: getZodiacMonth(calendar.date),
      day: getZodiacDay(calendar.date),
    },
    sign: getSign(calendar.date),
    lunaPhase: getLunaPhase(calendar.day),
    // lunaPhase: getLunaPhase(calendar.lunaAge),
    tidePhase: getTidePhase(calendar.lunaAge),
    eclipticCoordinate: getEclipticCoordinate(julianDay + 1),
    julianDay: julianDay,
    julianDayRevise: getJulianDayRevise(julianDay),
    lilianDay: getLilianDay(julianDay),
  };
};

/**
 * 節月を取得します。
 * @param season24 二十四節気居
 * @returns 節月
 */
export const getSetsuMonth = (season24: CalendarInfo) => {
  // 立春を起点に二十四節気を列挙する
  const season24Names = SEASON24.map((x) => x.value);
  const temp = season24Names.splice(season24Names.findIndex((x) => x === '立春'));
  season24Names.splice(0, 0, ...temp);

  // 未来における直近の二十四節気から節月を推定する
  let i = season24Names.findIndex((value) => value === season24.value);
  if (season24.startAt !== 0) i = 0 < i ? i - 1 : season24Names.length - 1;
  return Math.floor(i / 2) + 1;
};

/**
 * 太陽黄経を取得します。
 * @param julianDay ユリウス日
 * @param flag 取得の基準となる気候
 * @returns 太陽黄経
 */
export const getEclipticCoordinate = (julianDay: number, flag?: 'season24' | 'season72') => {
  const jd1 = Math.floor(julianDay);
  const jd2 = julianDay - jd1 - 9.0 / 24.0;
  const t = calcJulianCenturyNumber(jd1 + jd2);
  switch (flag) {
    case 'season24':
      return Math.floor(calcSunLongitude(t) / 15.0) * 15.0;
    case 'season72':
      return Math.floor(calcSunLongitude(t) / 5.0) * 5.0;
    default:
      return Math.floor(calcSunLongitude(t) * 100.0) / 100.0;
  }
};

/**
 * 六曜を取得します。
 * @param calendar 旧暦インスタンス
 * @returns 六曜
 */
export const getRokuyo = (calendar: JapaneseLunisolarCalendar) =>
  ROKUYO[(calendar.month + calendar.day - 2) % ROKUYO.length];

/**
 * 十二直を取得します。
 * @param julianDay ユリウス日
 * @param setsuMonth 節月
 * @returns 十二直
 */
export const getJunichoku = (julianDay: number, setsuMonth: number) =>
  JUNICHOKU[(Math.ceil(julianDay) - setsuMonth) % JUNICHOKU.length];

/**
 * 二十八宿を取得します。
 * @param julianDay ユリウス日
 * @returns 二十八宿
 */
export const getNijuhashuku = (julianDay: number) => ASTROLOGY28[(Math.floor(julianDay) + 12) % ASTROLOGY28.length];

/**
 * 気候を取得します。
 * @param julianDay ユリウス日
 * @returns [四季, 二十四節気, 七十二候]
 */
export const getSeason = (julianDay: number) => {
  const i_s72 = getEclipticCoordinate(Math.floor(julianDay) + 1, 'season72') / 5;
  const season72 = SEASON72[i_s72];

  const i_s4 = Math.floor(((i_s72 + 9) % 72) / 18); // 東風解凍（立春）が基準となるように調整
  const season4 = SEASON4[i_s4];

  let season24: CalendarInfo;
  const currentCoordinate = getEclipticCoordinate(Math.floor(julianDay), 'season24');
  for (let i = 0; ; i++) {
    const nextCoordinate = getEclipticCoordinate(Math.floor(julianDay) + 1 + i, 'season24');
    if (currentCoordinate === nextCoordinate) continue;

    const i_s24 = nextCoordinate / 15;
    season24 = {
      value: SEASON24[i_s24].value,
      kana: SEASON24[i_s24].kana,
      summary: SEASON24[i_s24].summary,
      startAt: i, // 対象の二十四節気は何日後であるか
    };
    break;
  }

  return { season4, season24, season72 };
};

/**
 * 年の干支を取得します
 * @param date Date インスタンス
 * @returns [十干, 十二支]
 */
export const getZodiacYear = (date: Date) => ({
  jikkan: JIKKAN[(date.getFullYear() + 6) % JIKKAN.length],
  junishi: JUNISHI[(date.getFullYear() + 8) % JUNISHI.length],
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
export const getZodiacMonth = (date: Date) => ({
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
export const getZodiacDay = (date: Date) => {
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
 * 星座を取得します。
 * @param date Date インスタンス
 * @returns [十二星座, 十三星座]
 */
export const getSign = (date: Date) => {
  const MMdd = (date.getMonth() + 1) * 100 + date.getDate();

  let sign12 = SIGN12[SIGN12.length - 1];
  for (let i = SIGN12.length - 1; 0 <= i; i--) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (SIGN12[i].startAt! <= MMdd) {
      sign12 = SIGN12[i];
      break;
    }
  }

  let sign13 = SIGN13[SIGN13.length - 1];
  for (let i = SIGN13.length - 1; 0 <= i; i--) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (SIGN13[i].startAt! <= MMdd) {
      sign13 = SIGN13[i];
      break;
    }
  }

  return { sign12, sign13 };
};

/**
 * 旧暦日基準の月相を取得します。
 * @param oldDay 旧暦日
 * @returns 月相
 */
export const getLunaPhase = (oldDay: number) => LUNA_PHASES[(oldDay - 1) % LUNA_PHASES.length];

/**
 * 潮汐を取得します。
 * @param lunaAge 月齢
 * @returns 潮汐
 */
export const getTidePhase = (lunaAge: number) => TIDE_PHASES[Math.floor(lunaAge) % TIDE_PHASES.length];

/**
 * 修正ユリウス日を取得します。
 * @param julianDay ユリウス日
 * @returns 修正ユリウス日
 */
export const getJulianDayRevise = (julianDay: number) => julianDay - 2400000.5;

/**
 * リリウス日を取得します。
 * @param julianDay ユリウス日
 * @returns リリウス日
 */
export const getLilianDay = (julianDay: number) => julianDay - 2299159.5;

// ============================================================
// 定数
// ============================================================

export type CalendarInfo = Readonly<{
  value: string;
  kana?: string;
  summary?: string;
  startAt?: number;
}>;

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

export const JUNICHOKU: Array<CalendarInfo> = [
  { value: '建', kana: 'たつ', summary: 'よろず大吉の日。動土と蔵開きは凶。' },
  { value: '除', kana: 'のぞく', summary: '井戸掘り・治療開始・祭祀は吉。結婚と動土は凶。' },
  { value: '満', kana: 'みつ', summary: '新規事・移転・結婚は吉。動土と服薬は凶。' },
  { value: '平', kana: 'たいら', summary: '旅行・結婚・道路修理は吉。穴掘りと種蒔きは凶。' },
  { value: '定', kana: 'さだん', summary: '開店・結婚・移転・種蒔きは吉。旅行と訴訟は凶。' },
  { value: '執', kana: 'とる', summary: '祭祀・祝い事・造作・種蒔きは吉。金銭の出入りは凶。' },
  { value: '破', kana: 'やぶる', summary: '訴訟・出陣・漁猟・服薬は吉。祝い事と契約事は凶。' },
  { value: '危', kana: 'あやぶ', summary: '万事控えめに。' },
  { value: '成', kana: 'なる', summary: '新規事・建築・開店は吉。訴訟と談判は凶。' },
  { value: '納', kana: 'おさん', summary: '収穫と商品購入は吉。結婚と見合いは凶。' },
  { value: '開', kana: 'ひらく', summary: '	建築・移転・結婚は吉。葬式は凶。' },
  { value: '閉', kana: 'とづ', summary: '金銭出納と建墓は吉。棟上げ・結婚・開店は凶。' },
];

export const ASTROLOGY28: Array<CalendarInfo> = [
  { value: '角宿', kana: 'かくしゅく', summary: '着始め・柱立て・普請造作・結婚は吉。葬式は凶。' },
  { value: '亢宿', kana: 'こうしゅく', summary: '衣類仕立て・物品購入・種蒔きは吉。造作は凶。' },
  { value: '氐宿', kana: 'ていしゅく', summary: '結婚・開店・結納・酒造りは吉。着始めは凶。' },
  { value: '房宿', kana: 'ぼうしゅく', summary: '髪切り・結婚・旅行・移転・開店・祭祀は吉。' },
  { value: '心宿', kana: 'しんしゅく', summary: '祭祀・移転・旅行・新規事は吉。造作と結婚は凶。' },
  { value: '尾宿', kana: 'びしゅく', summary: '結婚・開店・移転・造作・新規事は吉。着始めと仕立ては凶。' },
  { value: '箕宿', kana: 'きしゅく', summary: '動土・池掘り・仕入れ・集金・改築は吉。結婚と葬式は凶。' },
  { value: '斗宿', kana: 'としゅく', summary: '土掘り・開店・造作は吉。' },
  { value: '牛宿', kana: 'ぎゅうしゅく', summary: '移転・旅行・金談など全てが吉。' },
  { value: '女宿', kana: 'じょしゅく', summary: '稽古始めとお披露目は吉。訴訟・結婚・葬式は凶。' },
  { value: '虚宿', kana: 'きょしゅく', summary: '着始めと学問始めは吉。相談・造作・積極的な行動は凶。' },
  { value: '危宿', kana: 'きしゅく', summary: '壁塗り・船普請・酒作りは吉。衣類仕立てと高所作業は凶。' },
  { value: '室宿', kana: 'しっしゅく', summary: '祈願始め・結婚・祝い事・祭祀・井戸掘りは吉。' },
  { value: '壁宿', kana: 'へきしゅく', summary: '開店・旅行・結婚・衣類仕立て・新規事開始は吉。' },
  { value: '奎宿', kana: 'けいしゅく', summary: '開店・文芸開始・樹木植替えは吉。' },
  { value: '婁宿', kana: 'ろうしゅく', summary: '動土・造作・縁談・契約・造園・衣類仕立ては吉。' },
  { value: '胃宿', kana: 'いしゅく', summary: '開店・移転・求職は吉。' },
  { value: '昴宿', kana: 'ぼうしゅく', summary: '神仏詣・祝い事・開店は吉。' },
  { value: '畢宿', kana: 'ひっしゅく', summary: '稽古始めと運搬始めは吉。造作と衣類着始めは凶。' },
  { value: '觜宿', kana: 'ししゅく', summary: '稽古始めと運搬始めは吉。造作と衣類着始めは凶。' },
  { value: '参宿', kana: 'さんしゅく', summary: '仕入れ・納入・取引開始・祝い事・縁談は吉。' },
  { value: '井宿', kana: 'せいしゅく', summary: '神仏詣・種蒔き・動土・普請は吉。衣類仕立ては凶。' },
  { value: '鬼宿', kana: 'きしゅく', summary: '婚礼のみ凶。他の事は全て吉。' },
  { value: '柳宿', kana: 'りゅうしゅく', summary: '物事を断るのは吉。結婚・開店・葬式は凶。' },
  { value: '星宿', kana: 'せいしゅく', summary: '乗馬始めと便所改造は吉。祝い事と種蒔きは凶。' },
  { value: '張宿', kana: 'ちょうしゅく', summary: '就職・見合い・神仏祈願・祝い事は吉。' },
  { value: '翼宿', kana: 'よくしゅく', summary: '耕作始め・植え替え・種蒔きは吉。高所作業と結婚は凶。' },
  { value: '軫宿', kana: 'しんしゅく', summary: '地鎮祭・落成式・祭祀・祝い事は吉。衣類仕立ては凶。' },
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

export const LUNA_PHASES: Array<CalendarInfo> = [
  { value: '新月', kana: 'しんげつ' },
  { value: '繊月', kana: 'せんげつ' },
  { value: '三日月', kana: 'みかづき' },
  { value: '黄昏月', kana: 'たそがれづき' },
  { value: '五日月', kana: '' },
  { value: '六日月', kana: '' },
  { value: '七日月', kana: '' },
  { value: '上弦月', kana: 'じょうげんのつき' },
  { value: '九日月', kana: '' },
  { value: '十日夜月', kana: 'とおかんやのつき' },
  { value: '十日余月', kana: 'とおかあまりのつき' },
  { value: '十二日月', kana: '' },
  { value: '十三夜月', kana: 'じゅうさんやづき' },
  { value: '待宵月', kana: 'まちよいづき' },
  { value: '十五夜月', kana: 'じゅうごやづき' },
  { value: '十六夜月', kana: 'いざよいのつき' },
  { value: '立待月', kana: 'たちまちづき' },
  { value: '居待月', kana: 'いまちづき' },
  { value: '寝待月', kana: 'ねまちづき' },
  { value: '更待月', kana: 'ふけまちづき' },
  { value: '二十日余月', kana: 'はつかあまりのつき' },
  { value: '二十二日月', kana: '' },
  { value: '下弦月', kana: 'かげんのつき' },
  { value: '真夜中月', kana: 'まよなかのつき' },
  { value: '二十五日月', kana: '' },
  { value: '暁月', kana: 'ぎょうげつ' },
  { value: '二十七日月', kana: '' },
  { value: '二十八日月', kana: '' },
  { value: '二十九日月', kana: '' },
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

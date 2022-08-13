/* istanbul ignore file */
/* eslint-disable */

// ============================================================
// 旧暦計算処理
//
// 下記プログラムをもとに、TypeScript で書き換えて構築されました。
// ------------------------------------------------------------
// qreki.js: 旧暦計算サンプルプログラム rev. 1.1
// Coded by H.Takano (C)1993,1994
// Arranged for ECMAScript(ECMA-262) by Nagano Yutaka (C)1999
// http://kikuchisan.net/wsp/java/java59.html
// ============================================================

// ============================================================
// 定数
// ============================================================

/** タイムゾーン */
const TIME_ZONE = -0.375;
/** 一日に相当するミリ秒数 */
const DAY_MILLISECONDS = 86400000;
/** 平均朔望月 */
const SYNODIC_MONTH = 29.530589;
/** ユリウス年 */
const JULIAN_YEAR = 365.2;
/** ユリウス世紀 */
const JULIAN_CENTURY = 36525;
/** ユリウス日の基準を補正する係数 */
const JULIAN_CORRECTION = 2440587.5;
/** ラジアン変換係数 */
const K = Math.PI / 180;

// ============================================================
// 型定義
// ============================================================

declare global {
  interface Date {
    /**
     * ユリウス日を取得します。
     * @returns ユリウス日
     */
    getJulianDay(): number;

    /**
     * ユリウス日を設定します。
     * @param julianDay ユリウス日
     * @returns Date インスタンス
     */
    setJulianDay(julianDay: number): Date;

    /**
     * 東京地方時が採用されていた期間であるかどうかを判定します。
     * @returns 判定結果
     */
    isTokyoLocalTime(): boolean;
  }
}

// ============================================================
// プロトタイプ宣言
// ============================================================

Date.prototype.getJulianDay = function (): number {
  // 1888 年以降は日本標準時 (GMT+0900)、それより前は東京地方時 (GMT+0918) が使用される
  // ここでは東京地方時の期間であっても、日本標準時とみなし計算を行う
  const date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0);
  if (this.isTokyoLocalTime()) {
    date.setMinutes(18);
    date.setSeconds(59);
  }
  return JULIAN_CORRECTION - TIME_ZONE + date.getTime() / DAY_MILLISECONDS;
};

Date.prototype.setJulianDay = function (julianDay: number): Date {
  this.setTime((TIME_ZONE - JULIAN_CORRECTION + julianDay) * DAY_MILLISECONDS);
  return this;
};

Date.prototype.isTokyoLocalTime = function (): boolean {
  return this.getFullYear() < 1888;
};

// ============================================================
// クラス
// ============================================================

/**
 * 太陽太陰暦を使用し、年月日の区分で時間を計算します。
 */
export default class JapaneseLunisolarCalendar {
  /** 西暦の日付 */
  date: Date;
  /** 旧暦年 */
  year = NaN;
  /** 旧暦月 */
  month = NaN;
  /** 旧暦日 */
  day = NaN;
  /** 月齢 */
  lunaAge = NaN;
  /** 閏月 */
  isLeapMonth = false;

  /**
   * 新しいインスタンスを生成します。
   * @param date Date インスタンス
   */
  constructor(date: Date) {
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (isNaN(this.date.getTime())) return;

    // ------------------------------------------------------------
    // 二分二至／中気の時刻を算出
    // ------------------------------------------------------------

    const julianDay = Math.floor(this.date.getJulianDay());
    const chuTimes = new Array<number>(4);
    const { jd, lambda_sun0 } = this.calcChuTime(julianDay, 90);
    chuTimes[0] = jd; // 直前の二分二至の時刻
    for (let i = 1; i < chuTimes.length; i++) {
      chuTimes[i] = this.calcChuTime(chuTimes[i - 1] + 32, 30).jd; // 中気の時刻
    }

    // ------------------------------------------------------------
    // 朔の時刻を算出
    // ------------------------------------------------------------

    const sakuTimes = new Array<number>(5);
    sakuTimes[0] = this.calcSakuTime(chuTimes[0]); // 直前の二分二至の直前の朔の時刻
    for (let i = 1; i < sakuTimes.length; i++) {
      sakuTimes[i] = this.calcSakuTime(sakuTimes[i - 1] + 30);

      // 前の朔との差が 26 日以内であれば、同じ時刻が計算されたと推測される
      // 基準日を加算して再計算する
      if (Math.abs(Math.floor(sakuTimes[i - 1]) - Math.floor(sakuTimes[i])) <= 26) {
        sakuTimes[i] = this.calcSakuTime(sakuTimes[i - 1] + 35);
      }
    }

    // 朔の大小関係を確認、調整する
    if (Math.floor(sakuTimes[1]) <= Math.floor(chuTimes[0])) {
      // 二分二至と中気の朔とが逆転した場合、朔を繰り下げて修正する
      // 末尾の朔を新たに計算する
      for (let i = 0; i < sakuTimes.length - 1; i++) {
        sakuTimes[i] = sakuTimes[i + 1];
      }
      sakuTimes[sakuTimes.length - 1] = this.calcSakuTime(sakuTimes[sakuTimes.length - 2] + 35);
    } else if (Math.floor(chuTimes[0]) < Math.floor(sakuTimes[0])) {
      // 二分二至と二分二至の朔とが逆転した場合、朔を繰り上げて修正する
      // 先頭の朔を新たに計算する
      for (let i = sakuTimes.length - 1; 0 < i; i--) {
        sakuTimes[i] = sakuTimes[i - 1];
      }
      sakuTimes[0] = this.calcSakuTime(sakuTimes[0] - 27);
    }

    // ------------------------------------------------------------
    // 朔日行列を作成
    // ------------------------------------------------------------

    const saku = new Array<any>(5);
    for (let i = 0; i < saku.length; i++) {
      saku[i] = {};
    }

    // 朔日行列
    // saku[i].isLeapMonth ... 閏月であるかどうか
    // saku[i].julianDay ..... 朔日のユリウス日
    // saku[i].month ......... 月
    saku[0].isLeapMonth = false;
    saku[0].julianDay = Math.floor(sakuTimes[0]);
    saku[0].month = Math.floor(lambda_sun0 / 30) + 2; // 二分二至の時の太陽黄経をもとに先頭の月を推定

    // 節月で 4 ヶ月間に 5 回の朔がある場合、閏月を含む可能性がある
    let isLeapMonth = Math.floor(sakuTimes[4]) <= Math.floor(chuTimes[3]);
    for (let i = 1; i < 5; i++) {
      if (
        isLeapMonth &&
        1 < i &&
        (Math.floor(sakuTimes[i]) <= chuTimes[i - 1] || chuTimes[i - 1] <= Math.floor(sakuTimes[i - 1]))
      ) {
        saku[i - 1].isLeapMonth = true;
        saku[i - 1].julianDay = Math.floor(sakuTimes[i - 1]);
        saku[i - 1].month = saku[i - 2].month;
        isLeapMonth = false;
      }

      saku[i].isLeapMonth = false;
      saku[i].julianDay = Math.floor(sakuTimes[i]);
      saku[i].month = saku[i - 1].month + 1;
      if (12 < saku[i].month) {
        saku[i].month -= 12;
      }
    }

    // ------------------------------------------------------------
    // 旧暦の算出
    // ------------------------------------------------------------

    let sakuIndex = 0;
    let needAdjustIndex = true;
    const fJd = Math.floor(julianDay);
    for (; sakuIndex < 5; sakuIndex++) {
      const fJdSaku = Math.floor(saku[sakuIndex].julianDay);
      if (fJdSaku < fJd) continue;

      if (fJd === fJdSaku) needAdjustIndex = false;
      break;
    }
    if (needAdjustIndex) {
      sakuIndex--;
    }

    this.isLeapMonth = saku[sakuIndex].isLeapMonth;
    this.month = saku[sakuIndex].month;
    this.day = Math.floor(julianDay) - Math.floor(saku[sakuIndex].julianDay) + 1;
    // 旧暦月が 10 以上かつ新暦月より大きい場合、まだ年を越していないと推測される
    this.year =
      this.date.getFullYear() -
      (10 <= saku[sakuIndex].month && this.date.getMonth() + 1 < saku[sakuIndex].month ? 1 : 0);

    // ------------------------------------------------------------
    // 月齢の算出
    // ------------------------------------------------------------

    // 小数第一位までの精度で導出する
    // 朔望月は 29.3 から 29.8 の範囲となる
    const lunaJulianDay = this.date.getJulianDay();
    let lunaAge = Math.round((lunaJulianDay - this.calcSakuTime(lunaJulianDay)) * 10.0) / 10.0;
    if (29.8 < lunaAge) lunaAge -= 29.8;
    if (lunaAge < 0.0) lunaAge = 29.3;
    this.lunaAge = lunaAge;
  }

  /**
   * 指定されたユリウス日以前で直近の二分二至／中気の時刻を算出します。
   * @param julianDay ユリウス日
   * @param longitude 経度 (90: 二分二至, 30: 中気)
   * @returns 0: 指定された経度の時刻 (JSTユリウス日), 1: 太陽の黄経
   * @remarks 引数、戻り値ともユリウス日で表し、時分秒は日の小数で表す。力学時とユリウス日との補正時刻=0.0secと仮定。
   */
  calcChuTime(julianDay: number, longitude: number) {
    const coverage = (t1: number, t2: number) => {
      const SEC = 1 / 86400;
      return Math.abs(t1 + t2) <= SEC;
    };

    // 時刻引数を小数部と整数部とに分解する、小数部は UTC に変換する
    let t1 = Math.floor(julianDay);
    let t2 = julianDay - t1 + TIME_ZONE;

    // 直前の二分二至の黄経 λsun0 を算出する
    // λsun(t): t = (tm + 0.5 - 2451545) / 36525;
    const lambda_sun0 = longitude * Math.floor(calcSunLongitude(calcJulianCenturyNumber(t1 + t2)) / longitude);

    // 直前の二分二至の時刻を算出する
    // 誤差が ±1.0 sec 以内に収束するまで繰り返す
    let delta_t1 = 0;
    let delta_t2 = 1;
    for (; !coverage(delta_t1, delta_t2); ) {
      // 黄経差 Δλ を算出する、Δλ は ±180 の範囲になるよう補正する
      // Δλ = λsun(t) - λsun0
      let delta_lambda = calcSunLongitude(calcJulianCenturyNumber(t1 + t2)) - lambda_sun0;
      if (180 < delta_lambda) delta_lambda -= 360;
      else if (delta_lambda < -180) delta_lambda += 360;

      // 時刻引数の補正値 Δt を算出する
      // Δt = Δλ * 365.2 / 360
      delta_t1 = Math.floor((delta_lambda * JULIAN_YEAR) / 360);
      delta_t2 = (delta_lambda * JULIAN_YEAR) / 360 - delta_t1;

      // 時刻引数を補正値 Δt により補正する
      t1 -= delta_t1;
      t2 -= delta_t2;
      if (t2 < 0) {
        t1--;
        t2++;
      }
    }

    return { jd: t1 + t2 - TIME_ZONE, lambda_sun0 };
  }

  /**
   * 指定されたユリウス日以前で直近の朔の時刻を算出します。
   * @param julianDay ユリウス日
   * @returns 朔の時刻
   * @remarks 引数、戻り値ともJSTユリウス日で表し、時分秒は日の小数で表す。力学時とユリウス日との補正時刻=0.0secと仮定。
   */
  calcSakuTime(julianDay: number): number {
    const coverage = (t1: number, t2: number) => {
      const SEC = 1 / 86400;
      return Math.abs(t1 + t2) <= SEC;
    };

    // 時刻引数を小数部と整数部とに分解する、小数部は UTC に変換する
    let t1 = Math.floor(julianDay);
    let t2 = julianDay - t1 + TIME_ZONE;

    // 朔の時刻を算出する
    // 誤差が ±1.0 sec 以内に収束するまで繰り返す
    let delta_t1 = 0;
    let delta_t2 = 1;
    for (let i = 0; !coverage(delta_t1, delta_t2); i++) {
      // 太陽の黄経 λsun(t), 月の黄経 λmoon(t) を算出する
      const t = calcJulianCenturyNumber(t1 + t2);
      const lambda_sun = calcSunLongitude(t);
      const lambda_moon = calcMoonLongitude(t);

      // 月と太陽の黄経差 Δλ を算出する
      // Δλ = λmoon - λsun
      let delta_lambda = lambda_moon - lambda_sun;
      if (i === 0 && delta_lambda < 0)
        // 初回に 0 未満の場合は補正する
        delta_lambda = normalizeAngle(delta_lambda);
      else if (0 <= lambda_sun && lambda_sun <= 20 && 300 <= lambda_moon)
        // 春分付近に朔がある (0 <= λsun >= 20) かつ月の黄経が 300 以上 (300 <= λmoon) の場合は補正する
        delta_lambda = 360 - normalizeAngle(delta_lambda);
      else if (40 < Math.abs(delta_lambda))
        // Δλ の引き込み範囲 ±40 を逸脱した場合は補正する
        delta_lambda = normalizeAngle(delta_lambda);

      // 時刻引数の補正値 Δt を算出する
      // Δt = Δλ * 29.530589 / 360;
      delta_t1 = Math.floor((delta_lambda * SYNODIC_MONTH) / 360);
      delta_t2 = (delta_lambda * SYNODIC_MONTH) / 360 - delta_t1;

      // 時刻引数を補正値 Δt により補正する
      t1 -= delta_t1;
      t2 -= delta_t2;
      if (t2 < 0) {
        t1--;
        t2++;
      }

      // ループが 15 回目に達した場合、初期値を補正する
      if (i === 14 && !coverage(delta_t1, delta_t2)) {
        t1 = Math.floor(julianDay - 26);
        t2 = 0;
      }

      // 初期値の補正後も収束しない場合、初期値を結果として返却する
      if (30 <= i && !coverage(delta_t1, delta_t2)) {
        t1 = julianDay;
        t2 = 0;
        break;
      }
    }

    return t1 + t2 - TIME_ZONE;
  }
}

// ============================================================
// メソッド
// ============================================================

/**
 * 0 から 360 の範囲で角度を正規化します。
 * @param angle 角度
 * @returns 正規化された角度
 */
export const normalizeAngle = (angle: number) => {
  return angle - 360 * Math.floor(angle / 360);
};

/**
 * ユリウス世紀数を算出します。
 * @param julianDay ユリウス日
 * @returns ユリウス世紀数
 */
export const calcJulianCenturyNumber = (julianDay: number) => {
  return (julianDay + 0.5 - 2451545) / JULIAN_CENTURY;
};

/**
 * 太陽の黄経を算出します。
 * @param dynamicalTime 力学時
 * @returns 太陽の黄経
 */
export const calcSunLongitude = (dynamicalTime: number) => {
  // 摂動項
  let th = 0.0004 * Math.cos(K * normalizeAngle(31557 * dynamicalTime + 161));
  th += 0.0004 * Math.cos(K * normalizeAngle(29930 * dynamicalTime + 48));
  th += 0.0005 * Math.cos(K * normalizeAngle(2281 * dynamicalTime + 221));
  th += 0.0005 * Math.cos(K * normalizeAngle(155 * dynamicalTime + 118));
  th += 0.0006 * Math.cos(K * normalizeAngle(33718 * dynamicalTime + 316));
  th += 0.0007 * Math.cos(K * normalizeAngle(9038 * dynamicalTime + 64));
  th += 0.0007 * Math.cos(K * normalizeAngle(3035 * dynamicalTime + 110));
  th += 0.0007 * Math.cos(K * normalizeAngle(65929 * dynamicalTime + 45));
  th += 0.0013 * Math.cos(K * normalizeAngle(22519 * dynamicalTime + 352));
  th += 0.0015 * Math.cos(K * normalizeAngle(45038 * dynamicalTime + 254));
  th += 0.0018 * Math.cos(K * normalizeAngle(445267 * dynamicalTime + 208));
  th += 0.0018 * Math.cos(K * normalizeAngle(19 * dynamicalTime + 159));
  th += 0.002 * Math.cos(K * normalizeAngle(32964 * dynamicalTime + 158));
  th += 0.02 * Math.cos(K * normalizeAngle(71998.1 * dynamicalTime + 265.1));
  th -= 0.0048 * Math.cos(K * normalizeAngle(35999.05 * dynamicalTime + 267.52)) * dynamicalTime;
  th += 1.9147 * Math.cos(K * normalizeAngle(35999.05 * dynamicalTime + 267.52));

  // 比例項
  let ang = normalizeAngle(36000.7695 * dynamicalTime);
  ang = normalizeAngle(ang + 280.4659);

  return normalizeAngle(th + ang);
};

/**
 * 月の黄経を算出します。
 * @param dynamicalTime 力学時
 * @returns 月の黄経
 */
export const calcMoonLongitude = (dynamicalTime: number) => {
  // 摂動項
  let th = 0.0003 * Math.cos(K * normalizeAngle(2322131 * dynamicalTime + 191));
  th += 0.0003 * Math.cos(K * normalizeAngle(4067 * dynamicalTime + 70));
  th += 0.0003 * Math.cos(K * normalizeAngle(549197 * dynamicalTime + 220));
  th += 0.0003 * Math.cos(K * normalizeAngle(1808933 * dynamicalTime + 58));
  th += 0.0003 * Math.cos(K * normalizeAngle(349472 * dynamicalTime + 337));
  th += 0.0003 * Math.cos(K * normalizeAngle(381404 * dynamicalTime + 354));
  th += 0.0003 * Math.cos(K * normalizeAngle(958465 * dynamicalTime + 340));
  th += 0.0004 * Math.cos(K * normalizeAngle(12006 * dynamicalTime + 187));
  th += 0.0004 * Math.cos(K * normalizeAngle(39871 * dynamicalTime + 223));
  th += 0.0005 * Math.cos(K * normalizeAngle(509131 * dynamicalTime + 242));
  th += 0.0005 * Math.cos(K * normalizeAngle(1745069 * dynamicalTime + 24));
  th += 0.0005 * Math.cos(K * normalizeAngle(1908795 * dynamicalTime + 90));
  th += 0.0006 * Math.cos(K * normalizeAngle(2258267 * dynamicalTime + 156));
  th += 0.0006 * Math.cos(K * normalizeAngle(111869 * dynamicalTime + 38));
  th += 0.0007 * Math.cos(K * normalizeAngle(27864 * dynamicalTime + 127));
  th += 0.0007 * Math.cos(K * normalizeAngle(485333 * dynamicalTime + 186));
  th += 0.0007 * Math.cos(K * normalizeAngle(405201 * dynamicalTime + 50));
  th += 0.0007 * Math.cos(K * normalizeAngle(790672 * dynamicalTime + 114));
  th += 0.0008 * Math.cos(K * normalizeAngle(1403732 * dynamicalTime + 98));
  th += 0.0009 * Math.cos(K * normalizeAngle(858602 * dynamicalTime + 129));
  th += 0.0011 * Math.cos(K * normalizeAngle(1920802 * dynamicalTime + 186));
  th += 0.0012 * Math.cos(K * normalizeAngle(1267871 * dynamicalTime + 249));
  th += 0.0016 * Math.cos(K * normalizeAngle(1856938 * dynamicalTime + 152));
  th += 0.0018 * Math.cos(K * normalizeAngle(401329 * dynamicalTime + 274));
  th += 0.0021 * Math.cos(K * normalizeAngle(341337 * dynamicalTime + 16));
  th += 0.0021 * Math.cos(K * normalizeAngle(71998 * dynamicalTime + 85));
  th += 0.0021 * Math.cos(K * normalizeAngle(990397 * dynamicalTime + 357));
  th += 0.0022 * Math.cos(K * normalizeAngle(818536 * dynamicalTime + 151));
  th += 0.0023 * Math.cos(K * normalizeAngle(922466 * dynamicalTime + 163));
  th += 0.0024 * Math.cos(K * normalizeAngle(99863 * dynamicalTime + 122));
  th += 0.0026 * Math.cos(K * normalizeAngle(1379739 * dynamicalTime + 17));
  th += 0.0027 * Math.cos(K * normalizeAngle(918399 * dynamicalTime + 182));
  th += 0.0028 * Math.cos(K * normalizeAngle(1934 * dynamicalTime + 145));
  th += 0.0037 * Math.cos(K * normalizeAngle(541062 * dynamicalTime + 259));
  th += 0.0038 * Math.cos(K * normalizeAngle(1781068 * dynamicalTime + 21));
  th += 0.004 * Math.cos(K * normalizeAngle(133 * dynamicalTime + 29));
  th += 0.004 * Math.cos(K * normalizeAngle(1844932 * dynamicalTime + 56));
  th += 0.004 * Math.cos(K * normalizeAngle(1331734 * dynamicalTime + 283));
  th += 0.005 * Math.cos(K * normalizeAngle(481266 * dynamicalTime + 205));
  th += 0.0052 * Math.cos(K * normalizeAngle(31932 * dynamicalTime + 107));
  th += 0.0068 * Math.cos(K * normalizeAngle(926533 * dynamicalTime + 323));
  th += 0.0079 * Math.cos(K * normalizeAngle(449334 * dynamicalTime + 188));
  th += 0.0085 * Math.cos(K * normalizeAngle(826671 * dynamicalTime + 111));
  th += 0.01 * Math.cos(K * normalizeAngle(1431597 * dynamicalTime + 315));
  th += 0.0107 * Math.cos(K * normalizeAngle(1303870 * dynamicalTime + 246));
  th += 0.011 * Math.cos(K * normalizeAngle(489205 * dynamicalTime + 142));
  th += 0.0125 * Math.cos(K * normalizeAngle(1443603 * dynamicalTime + 52));
  th += 0.0154 * Math.cos(K * normalizeAngle(75870 * dynamicalTime + 41));
  th += 0.0304 * Math.cos(K * normalizeAngle(513197.9 * dynamicalTime + 222.5));
  th += 0.0347 * Math.cos(K * normalizeAngle(445267.1 * dynamicalTime + 27.9));
  th += 0.0409 * Math.cos(K * normalizeAngle(441199.8 * dynamicalTime + 47.4));
  th += 0.0458 * Math.cos(K * normalizeAngle(854535.2 * dynamicalTime + 148.2));
  th += 0.0533 * Math.cos(K * normalizeAngle(1367733.1 * dynamicalTime + 280.7));
  th += 0.0571 * Math.cos(K * normalizeAngle(377336.3 * dynamicalTime + 13.2));
  th += 0.0588 * Math.cos(K * normalizeAngle(63863.5 * dynamicalTime + 124.2));
  th += 0.1144 * Math.cos(K * normalizeAngle(966404 * dynamicalTime + 276.5));
  th += 0.1851 * Math.cos(K * normalizeAngle(35999.05 * dynamicalTime + 87.53));
  th += 0.2136 * Math.cos(K * normalizeAngle(954397.74 * dynamicalTime + 179.93));
  th += 0.6583 * Math.cos(K * normalizeAngle(890534.22 * dynamicalTime + 145.7));
  th += 1.274 * Math.cos(K * normalizeAngle(413335.35 * dynamicalTime + 10.74));
  th += 6.2888 * Math.cos(K * normalizeAngle(477198.868 * dynamicalTime + 44.963));

  // 比例項
  let ang = normalizeAngle(481267.8809 * dynamicalTime);
  ang = normalizeAngle(ang + 218.3162);

  return normalizeAngle(th + ang);
};

/* eslint-enable */

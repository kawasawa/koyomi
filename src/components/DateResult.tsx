import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { AppState } from '../stores/root';
import createCalendarInfo, { getEclipticCoordinate } from '../models/CalendarInfo';
import JapaneseLunisolarCalendar from '../models/JapaneseLunisolarCalendar';

import AutumnImage from '../resources/autumn.jpg';
import Autumn2Image from '../resources/autumn2.jpg';
import Autumn3Image from '../resources/autumn3.jpg';
import BoarImage from '../resources/boar.jpg';
import CalendarImage from '../resources/calendar.jpg';
import ChickenImage from '../resources/chicken.jpg';
import ClockImage from '../resources/clock.jpg';
import CowImage from '../resources/cow.jpg';
import DogImage from '../resources/dog.jpg';
import DragonImage from '../resources/dragon.jpg';
import HorseImage from '../resources/horse.jpg';
import JapanImage from '../resources/japan.jpg';
import MonkeyImage from '../resources/monkey.jpg';
import MoonImage from '../resources/moon.jpg';
import MosesImage from '../resources/moses.jpg';
import MouseImage from '../resources/mouse.jpg';
import RabbitImage from '../resources/rabbit.jpg';
import RokuyoImage from '../resources/rokuyo.jpg';
import SeaImage from '../resources/sea.jpg';
import SheepImage from '../resources/sheep.jpg';
import SignSnakeCharmerImage from '../resources/sign-snake-charmer.jpg';
import SighImage from '../resources/sign.jpg';
import SnakeImage from '../resources/snake.jpg';
import SolarImage from '../resources/solar.jpg';
import SpringImage from '../resources/spring.jpg';
import Spring2Image from '../resources/spring2.jpg';
import Spring3Image from '../resources/spring3.jpg';
import SummerImage from '../resources/summer.jpg';
import Summer2Image from '../resources/summer2.jpg';
import Summer3Image from '../resources/summer3.jpg';
import TigerImage from '../resources/tiger.jpg';
import WeekImage from '../resources/week.jpg';
import WinterImage from '../resources/winter.jpg';
import Winter2Image from '../resources/winter2.jpg';
import Winter3Image from '../resources/winter3.jpg';

// ============================================================
// 月の満ち欠けのイラストを下記からお借りしています。
//
// koyomi.js: 今日のこよみ
// http://kikuchisan.net/
// ============================================================

import Moon0Icon from '../resources/moon/moon0.gif';
import Moon1Icon from '../resources/moon/moon1.gif';
import Moon2Icon from '../resources/moon/moon2.gif';
import Moon3Icon from '../resources/moon/moon3.gif';
import Moon4Icon from '../resources/moon/moon4.gif';
import Moon5Icon from '../resources/moon/moon5.gif';
import Moon6Icon from '../resources/moon/moon6.gif';
import Moon7Icon from '../resources/moon/moon7.gif';
import Moon8Icon from '../resources/moon/moon8.gif';
import Moon9Icon from '../resources/moon/moon9.gif';
import Moon10Icon from '../resources/moon/moon10.gif';
import Moon11Icon from '../resources/moon/moon11.gif';
import Moon12Icon from '../resources/moon/moon12.gif';
import Moon13Icon from '../resources/moon/moon13.gif';
import Moon14Icon from '../resources/moon/moon14.gif';
import Moon15Icon from '../resources/moon/moon15.gif';
import Moon16Icon from '../resources/moon/moon16.gif';
import Moon17Icon from '../resources/moon/moon17.gif';
import Moon18Icon from '../resources/moon/moon18.gif';
import Moon19Icon from '../resources/moon/moon19.gif';
import Moon20Icon from '../resources/moon/moon20.gif';
import Moon21Icon from '../resources/moon/moon21.gif';
import Moon22Icon from '../resources/moon/moon22.gif';
import Moon23Icon from '../resources/moon/moon23.gif';
import Moon24Icon from '../resources/moon/moon24.gif';
import Moon25Icon from '../resources/moon/moon25.gif';
import Moon26Icon from '../resources/moon/moon26.gif';
import Moon27Icon from '../resources/moon/moon27.gif';
import Moon28Icon from '../resources/moon/moon28.gif';
import Moon29Icon from '../resources/moon/moon29.gif';

const moonIcons = [
  Moon0Icon,
  Moon1Icon,
  Moon2Icon,
  Moon3Icon,
  Moon4Icon,
  Moon5Icon,
  Moon6Icon,
  Moon7Icon,
  Moon8Icon,
  Moon9Icon,
  Moon10Icon,
  Moon11Icon,
  Moon12Icon,
  Moon13Icon,
  Moon14Icon,
  Moon15Icon,
  Moon16Icon,
  Moon17Icon,
  Moon18Icon,
  Moon19Icon,
  Moon20Icon,
  Moon21Icon,
  Moon22Icon,
  Moon23Icon,
  Moon24Icon,
  Moon25Icon,
  Moon26Icon,
  Moon27Icon,
  Moon28Icon,
  Moon29Icon,
];

const getSeasonImage = (season4?: string) => {
  let season4Image: string, season24Image: string, season72Image: string;
  switch (season4) {
    case '春':
      season4Image = SpringImage;
      season24Image = Spring2Image;
      season72Image = Spring3Image;
      break;
    case '夏':
      season4Image = SummerImage;
      season24Image = Summer2Image;
      season72Image = Summer3Image;
      break;
    case '秋':
      season4Image = AutumnImage;
      season24Image = Autumn2Image;
      season72Image = Autumn3Image;
      break;
    case '冬':
      season4Image = WinterImage;
      season24Image = Winter2Image;
      season72Image = Winter3Image;
      break;
    default:
      season4Image = SpringImage;
      season24Image = Spring2Image;
      season72Image = Spring3Image;
      break;
  }
  return { season4Image, season24Image, season72Image };
};

const getZodiacImage = (junishi?: string) => {
  let zodiacImage: string;
  switch (junishi) {
    case '子':
      zodiacImage = MouseImage;
      break;
    case '丑':
      zodiacImage = CowImage;
      break;
    case '寅':
      zodiacImage = TigerImage;
      break;
    case '卯':
      zodiacImage = RabbitImage;
      break;
    case '辰':
      zodiacImage = DragonImage;
      break;
    case '巳':
      zodiacImage = SnakeImage;
      break;
    case '午':
      zodiacImage = HorseImage;
      break;
    case '未':
      zodiacImage = SheepImage;
      break;
    case '申':
      zodiacImage = MonkeyImage;
      break;
    case '酉':
      zodiacImage = ChickenImage;
      break;
    case '戌':
      zodiacImage = DogImage;
      break;
    case '亥':
      zodiacImage = BoarImage;
      break;
    default:
      zodiacImage = MouseImage;
      break;
  }
  return zodiacImage;
};

const DateResult = () => {
  const { date } = useSelector((state: AppState) => state.view);
  const calendar = new JapaneseLunisolarCalendar(date);
  const calendarInfo = createCalendarInfo(calendar);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const eraYear = year - Math.floor((calendarInfo?.era.startAt ?? NaN) / 10000) + 1;
  const julianDay = Math.floor(date.getJulianDay() * 10) / 10;
  const julianDayRevise = julianDay - 2400000.5;
  const lilianDay = julianDay - 2299159.5;
  const eclipticCoordinate = getEclipticCoordinate(date.getJulianDay() + 1);
  const { season4Image, season24Image, season72Image } = getSeasonImage(calendarInfo?.season.season4.value);
  const zodiacImage = getZodiacImage(calendarInfo?.etoYear.junishi.value);
  const moonIcon = moonIcons[Math.floor(calendar.lunaAge)];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="和暦"
          value={`${calendarInfo?.era.value} ${eraYear === 1 ? '元' : eraYear}年 ${month}月 ${day}日（${
            calendarInfo?.jpWeek.value
          }）`}
          summary1={calendarInfo?.era.summary}
          summary2="元号または年号とは、年を数える方法のひとつであり、紀元と違って連続せず、改元が行なわれます。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/CEF2BBCB2FB8B5B9E6.html"
          image={JapanImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="旧暦"
          value={`${calendar.year}年 ${calendar.month}月 ${calendar.day}日`}
          summary2="旧暦とは、厳密には明治5年まで用いられていた天保暦法による暦を指します。それ以前の太陰太陽暦全般を指して使われることもあります。これに対し、現在使われている太陽暦（グレゴリオ暦）を新暦と呼びます。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/C2C0B1A2C2C0CDDBCEF1.html"
          image={ClockImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="六曜"
          value={calendarInfo?.rokuyo.value}
          kana={calendarInfo?.rokuyo.kana}
          summary1={calendarInfo?.rokuyo.summary}
          summary2="六曜は14世紀ごろに中国から日本に伝えられましたが、広く行われるようになったのは幕末以降のことです。時代とともにその名称や順序も変遷していて、現在は、先勝、友引、先負、仏滅、大安、赤口となっています。"
          url="https://www.ndl.go.jp/koyomi/chapter3/s3.html"
          image={RokuyoImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="七曜"
          value={calendarInfo?.shichiyo.value}
          kana={calendarInfo?.shichiyo.kana}
          summary2="宿曜経には、七曜が日月五星であると書かれています。各惑星は、歳星・熒惑・鎮星・太白・辰星という名前のほかに、五行説と結びついた木星・火星・土星・金星・水星という名前も持っていました。これがその訳語として用いられることになります。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/CDD7C1C72F1BDB5B4D6A4C8A4CFA1A92FCDCBC6FCA4CECCBEC1B0.html"
          image={WeekImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="四季"
          value={calendarInfo?.season.season4.value}
          kana={calendarInfo?.season.season4.kana}
          summary2="一般に季節と言うと、春夏秋冬を思い浮かべると思います。しかし、たとえば春がいつからいつまでなのかについては、絶対的な定義は存在しません。日本や中国の太陰太陽暦では、（節月で区切る場合）立春・立夏・立秋・立冬をもって四季の始まりとします。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/B5A8C0E1.html"
          image={season4Image}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="二十四節気"
          value={
            calendarInfo?.season.season24.startAt === 0
              ? calendarInfo?.season.season24.value
              : `${calendarInfo?.season.season24.value} まで ${calendarInfo?.season.season24.startAt}日`
          }
          kana={calendarInfo?.season.season24.startAt === 0 ? calendarInfo?.season.season24.kana : ''}
          summary1={calendarInfo?.season.season24.startAt === 0 ? calendarInfo?.season.season24.summary : ''}
          summary2="二十四節気は、今でも立春、春分、夏至など、季節を表す言葉として用いられています。1年を春夏秋冬の4つの季節に分け、さらにそれぞれを6つに分けたもので、「節または節気」と「気（中または中気とも呼ばれる）」が交互にあります。"
          url="https://www.ndl.go.jp/koyomi/chapter3/s7.html"
          image={season24Image}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="七十二候"
          value={calendarInfo?.season.season72.value}
          kana={calendarInfo?.season.season72.kana}
          summary1={calendarInfo?.season.season72.summary}
          summary2="七十二候は二十四節気を細分化したもので、気候を表します。一気を初候・次候・末候の三候に分けるので、合計72個になります。二十四節「気」と七十二「候」をあわせて「気候」となります。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/B5A8C0E12FBCB7BDBDC6F3B8F5.html"
          image={season72Image}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="十二星座"
          value={calendarInfo?.sign.sign12.value}
          kana={calendarInfo?.sign.sign12.kana}
          summary2="黄道十二星座は、黄道が経過している13星座のうち、へびつかい座を除いた12の星座を指します。"
          url="https://ja.wikipedia.org/wiki/黄道十二星座"
          image={SighImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="十三星座"
          value={calendarInfo?.sign.sign13.value}
          kana={calendarInfo?.sign.sign13.kana}
          summary2="十三星座は一般に用いられる十二星座にへびつかい座を加えた13の星座を指します。期間が均等に分割される十二星座に対して、十三星座は星座の大きさに沿って分割されます。"
          url="https://ja.wikipedia.org/wiki/13星座占い"
          image={SignSnakeCharmerImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="和風月名"
          value={calendarInfo?.jpMonth.value}
          kana={calendarInfo?.jpMonth.kana}
          summary1={calendarInfo?.jpMonth.summary}
          summary2="旧暦では、和風月名と呼ばれる月の和風の呼び名を使用していました。和風月名は旧暦の季節や行事に合わせたもので、現在の暦でも使用されることがありますが、現在の季節感とは1～2ヶ月ほどのずれがあります。"
          url="https://www.ndl.go.jp/koyomi/chapter3/s8.html"
          image={CalendarImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="干支"
          value={`${calendarInfo?.etoYear.jikkan.value}${calendarInfo?.etoYear.junishi.value}`}
          kana={`${calendarInfo?.etoYear.jikkan.kana} ${calendarInfo?.etoYear.junishi.kana}`}
          summary1={`月の干支: ${calendarInfo?.etoMonth.jikkan.value}${calendarInfo?.etoMonth.junishi.value} ／ 日の干支: ${calendarInfo?.etoDay.jikkan.value}${calendarInfo?.etoDay.junishi.value}`}
          summary2="暦注の多くは陰陽五行説という古代中国の思想や易から発生し、月日に当てられるようになったもので、その大きな柱となるものが干支です。干支は、十干と十二支の組み合わせです。"
          url="https://www.ndl.go.jp/koyomi/chapter3/s1.html"
          image={zodiacImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="月相"
          value={calendarInfo?.lunaPhase.value}
          kana={calendarInfo?.lunaPhase.kana}
          summary1={`月齢: ${calendar?.lunaAge.toString()}`}
          summary2="月は 朔（新月）→ 上弦 → 望（満月） → 下弦 → 朔 と、みかけの形が日々変化していきます。この変化を月の位相あるいは満ち欠けといいます。周期は約29.5日、より正確には29.530589日（朔望月）となります。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/B7EEA4CECBFEA4C1B7E7A4B1.html"
          image={MoonImage}
          icon={moonIcon}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="潮汐"
          value={calendarInfo?.tidePhase.value}
          kana={calendarInfo?.tidePhase.kana}
          summary2="潮汐は月や太陽が地球を引き伸ばすために起こる現象です。月（太陽）のある側と、その反対側へ引き伸ばされます。もちろん陸も引き伸ばされますが、海水の方が大きく動けますので、潮の満ち干として現れるわけです。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/C4ACBCAE.html"
          image={SeaImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="太陽黄経"
          value={`${eclipticCoordinate.toString()}°`}
          summary2="太陽系の惑星はどれもほぼ同じ面の上を運動していますから、この面＝黄道面を基準に考えると便利です。これを黄道座標系と呼びます。地球上の経度や緯度と同様に、天体の位置は黄経 (Longitude; λ)・黄緯 (Latitude; β) で表します。黄経は春分点の方向を基準に0°から360°まで測ります。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/B2ABC6BBBAC2C9B8B7CF.html"
          image={SolarImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DateCard
          title="ユリウス日"
          value={julianDay.toString()}
          summary1={`修正日: ${julianDayRevise.toString()} ／ リリウス日: ${lilianDay.toString()}`}
          summary2="ユリウス日はユリウス暦を紀元前4713年1月1日まで遡って適用し、そこから数えた経過日数です。ユリウス通日ということもあります。1583年、長期にわたる年代を数えるため、スカリゲルによりユリウス周期が考案されました。"
          url="https://eco.mtk.nao.ac.jp/koyomi/wiki/A5E6A5EAA5A6A5B9C6FC.html"
          image={MosesImage}
        />
      </Grid>
    </Grid>
  );
};

export default DateResult;

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
  },
  image: {
    height: 120,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: theme.spacing(2),
  },
  titleBox: {
    display: 'flex',
  },
}));

type CardProps = {
  title?: string;
  value?: string;
  kana?: string;
  summary1?: string;
  summary2?: string;
  url?: string;
  image?: string;
  icon?: string;
};

const DateCard: React.FC<CardProps> = ({ title, value, kana, summary1, summary2, url, image, icon }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.image} image={image} />
      <CardContent>
        <Box className={classes.titleBox}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {title}
          </Typography>
          {icon ? <img className={classes.icon} src={icon} alt="icon" loading="lazy" /> : null}
        </Box>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Box ml={1}>
              <Typography variant="h5" color="textPrimary" gutterBottom>
                {value}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box ml={1.5}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {kana}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          {summary1}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {summary2}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{ flex: '1 0 0' }} />
        <Button size="small" color="secondary" href={`${url ?? ''}`} target="_blank">
          もっと見る
        </Button>
      </CardActions>
    </Card>
  );
};

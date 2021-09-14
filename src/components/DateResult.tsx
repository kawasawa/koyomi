import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
import { Alert } from '@material-ui/lab';
import * as util from 'util';

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

const getAge = (birthDate: Date) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const thisYearsBirthday = new Date(todayYear, birthDate.getMonth(), birthDate.getDate());
  let age = todayYear - birthDate.getFullYear();
  if (today < thisYearsBirthday) age--;
  return age;
};

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
  },
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
  balloon: {
    display: 'block',
    boxSizing: 'border-box',
    margin: '-3px 0 0 5px',
    padding: '0px 10px',
    background: '#fafafa',
    border: '1px solid #aaa',
    borderRadius: 3,
  },
  balloonBefore: {
    display: 'block',
    width: 10,
    height: 10,
    margin: '-6px 0 0 10px',
    background: '#fafafa',
    borderLeft: '1px solid #aaa',
    borderBottom: '1px solid #aaa',
    transform: 'rotate(135deg)',
    WebkitTransform: 'rotate(135deg)',
  },
}));

const DateResult = () => {
  const classes = useStyles();
  const [t] = useTranslation();

  const { date } = useSelector((state: AppState) => state.view);
  const calendar = new JapaneseLunisolarCalendar(date);
  const calendarInfo = createCalendarInfo(calendar);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const eraYear = year - Math.floor((calendarInfo?.era.startAt ?? NaN) / 10000) + 1;
  const age = getAge(date);
  const julianDayExact = date.getJulianDay();
  const julianDay = Math.floor(julianDayExact * 10) / 10;
  const julianDayRevise = julianDay - 2400000.5;
  const lilianDay = julianDay - 2299159.5;
  const eclipticCoordinate = getEclipticCoordinate(julianDayExact + 1);
  const { season4Image, season24Image, season72Image } = getSeasonImage(calendarInfo?.season.season4.value);
  const zodiacImage = getZodiacImage(calendarInfo?.etoYear.junishi.value);
  const moonIcon = moonIcons[Math.floor(calendar.lunaAge)];

  const cardInfo = [
    {
      title: t('label.japanese-calendar'),
      value: `${util.format(
        t('label.ymd'),
        `${calendarInfo?.era.value} ${eraYear === 1 ? '元' : eraYear}`,
        month,
        day
      )} (${calendarInfo?.jpWeek.value})`,
      summary1: calendarInfo?.era.summary,
      summary2: t('text.japanese-calendar'),
      balloon: 1 <= age ? util.format(t('label.age'), age) : null,
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/CEF2BBCB2FB8B5B9E6.html',
      image: JapanImage,
    },
    {
      title: t('label.lunisolar-calendar'),
      value: util.format(t('label.ymd'), calendar.year, calendar.month, calendar.day),
      summary2: t('text.lunisolar-calendar'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/C2C0B1A2C2C0CDDBCEF1.html',
      image: ClockImage,
    },
    {
      title: t('label.rokuyo'),
      value: calendarInfo?.rokuyo.value,
      kana: calendarInfo?.rokuyo.kana,
      summary1: calendarInfo?.rokuyo.summary,
      summary2: t('text.rokuyo'),
      url: 'https://www.ndl.go.jp/koyomi/chapter3/s3.html',
      image: RokuyoImage,
    },
    {
      title: t('label.shichiyo'),
      value: calendarInfo?.shichiyo.value,
      kana: calendarInfo?.shichiyo.kana,
      summary2: t('text.shichiyo'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/CDD7C1C72F1BDB5B4D6A4C8A4CFA1A92FCDCBC6FCA4CECCBEC1B0.html',
      image: WeekImage,
    },
    {
      title: t('label.season4'),
      value: calendarInfo?.season.season4.value,
      kana: calendarInfo?.season.season4.kana,
      summary2: t('text.season4'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/B5A8C0E1.html',
      image: season4Image,
    },
    {
      title: t('label.season24'),
      value:
        calendarInfo?.season.season24.startAt === 0
          ? calendarInfo?.season.season24.value
          : util.format(
              t('label.until-day'),
              calendarInfo?.season.season24.value,
              calendarInfo?.season.season24.startAt
            ),
      kana: calendarInfo?.season.season24.startAt === 0 ? calendarInfo?.season.season24.kana : null,
      summary1: calendarInfo?.season.season24.startAt === 0 ? calendarInfo?.season.season24.summary : null,
      summary2: t('text.season24'),
      url: 'https://www.ndl.go.jp/koyomi/chapter3/s7.html',
      image: season24Image,
    },
    {
      title: t('label.season72'),
      value: calendarInfo?.season.season72.value,
      kana: calendarInfo?.season.season72.kana,
      summary1: calendarInfo?.season.season72.summary,
      summary2: t('text.season72'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/B5A8C0E12FBCB7BDBDC6F3B8F5.html',
      image: season72Image,
    },
    {
      title: t('label.sign12'),
      value: calendarInfo?.sign.sign12.value,
      kana: calendarInfo?.sign.sign12.kana,
      summary2: t('text.sign12'),
      url: 'https://ja.wikipedia.org/wiki/黄道十二星座',
      image: SighImage,
    },
    {
      title: t('label.sign13'),
      value: calendarInfo?.sign.sign13.value,
      kana: calendarInfo?.sign.sign13.kana,
      summary2: t('text.sign13'),
      url: 'https://ja.wikipedia.org/wiki/13星座占い',
      image: SignSnakeCharmerImage,
    },
    {
      title: t('label.japanese-month'),
      value: calendarInfo?.jpMonth.value,
      kana: calendarInfo?.jpMonth.kana,
      summary1: calendarInfo?.jpMonth.summary,
      summary2: t('text.japanese-month'),
      url: 'https://www.ndl.go.jp/koyomi/chapter3/s8.html',
      image: CalendarImage,
    },
    {
      title: t('label.japanese-zodiac'),
      value: `${calendarInfo?.etoYear.jikkan.value}${calendarInfo?.etoYear.junishi.value}`,
      kana: `${calendarInfo?.etoYear.jikkan.kana} ${calendarInfo?.etoYear.junishi.kana}`,
      summary1: `${t('label.japanese-zodiac-month')}: ${calendarInfo?.etoMonth.jikkan.value}${
        calendarInfo?.etoMonth.junishi.value
      } ／ ${t('label.japanese-zodiac-day')}: ${calendarInfo?.etoDay.jikkan.value}${
        calendarInfo?.etoDay.junishi.value
      }`,
      summary2: t('text.japanese-zodiac'),
      url: 'https://www.ndl.go.jp/koyomi/chapter3/s1.html',
      image: zodiacImage,
    },
    {
      title: t('label.luna-phase'),
      value: calendarInfo?.lunaPhase.value,
      kana: calendarInfo?.lunaPhase.kana,
      summary1: `${t('label.luna-age')}: ${calendar?.lunaAge.toString()}`,
      summary2: t('text.luna-phase'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/B7EEA4CECBFEA4C1B7E7A4B1.html',
      image: MoonImage,
      icon: moonIcon,
    },
    {
      title: t('label.tide-phase'),
      value: calendarInfo?.tidePhase.value,
      kana: calendarInfo?.tidePhase.kana,
      summary2: t('text.tide-phase'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/C4ACBCAE.html',
      image: SeaImage,
    },
    {
      title: t('label.ecliptic-coordinate'),
      value: `${eclipticCoordinate.toString()}°`,
      summary2: t('text.ecliptic-coordinate'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/B2ABC6BBBAC2C9B8B7CF.html',
      image: SolarImage,
    },
    {
      title: t('label.julian-day'),
      value: julianDay.toString(),
      summary1: `${t('label.julian-day-revise')}: ${julianDayRevise.toString()} ／ ${t(
        'label.lilian-day'
      )}: ${lilianDay.toString()}`,
      summary2: t('text.julian-day'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/A5E6A5EAA5A6A5B9C6FC.html',
      image: MosesImage,
    },
  ];

  return (
    <Box>
      {date.isTokyoLocalTime() ? (
        <Alert className={classes.alert} variant="standard" severity="warning">
          {t('message.warning.old-year')}
        </Alert>
      ) : null}
      <Grid container spacing={2}>
        {cardInfo.map(({ title, value, kana, summary1, summary2, balloon, url, image, icon }, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
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
                {balloon ? (
                  <Box className={classes.balloon}>
                    <Box className={classes.balloonBefore} />
                    <Typography variant="subtitle2" color="textPrimary" gutterBottom>
                      {balloon}
                    </Typography>
                  </Box>
                ) : null}
                <div style={{ flex: '1 0 0' }} />
                {url ? (
                  <Button size="small" color="secondary" href={url} target="_blank">
                    {t('label.learn-more')}
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DateResult;

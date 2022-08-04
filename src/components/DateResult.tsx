import { Box, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as util from 'util';

import AutumnImage from '../assets/images/autumn.webp';
import Autumn2Image from '../assets/images/autumn2.webp';
import Autumn3Image from '../assets/images/autumn3.webp';
import BoarImage from '../assets/images/boar.webp';
import CalendarImage from '../assets/images/calendar.webp';
import ChickenImage from '../assets/images/chicken.webp';
import ClockImage from '../assets/images/clock.webp';
import CowImage from '../assets/images/cow.webp';
import DogImage from '../assets/images/dog.webp';
import DragonImage from '../assets/images/dragon.webp';
import HorseImage from '../assets/images/horse.webp';
import JapanImage from '../assets/images/japan.webp';
import MonkeyImage from '../assets/images/monkey.webp';
import MoonImage from '../assets/images/moon.webp';
import MosesImage from '../assets/images/moses.webp';
import MouseImage from '../assets/images/mouse.webp';
import RabbitImage from '../assets/images/rabbit.webp';
import RokuyoImage from '../assets/images/rokuyo.webp';
import SeaImage from '../assets/images/sea.webp';
import SheepImage from '../assets/images/sheep.webp';
import SighImage from '../assets/images/sign.webp';
import SignSnakeCharmerImage from '../assets/images/sign-snake-charmer.webp';
import SnakeImage from '../assets/images/snake.webp';
import SolarImage from '../assets/images/solar.webp';
import SpringImage from '../assets/images/spring.webp';
import Spring2Image from '../assets/images/spring2.webp';
import Spring3Image from '../assets/images/spring3.webp';
import SummerImage from '../assets/images/summer.webp';
import Summer2Image from '../assets/images/summer2.webp';
import Summer3Image from '../assets/images/summer3.webp';
import TigerImage from '../assets/images/tiger.webp';
import WeekImage from '../assets/images/week.webp';
import WinterImage from '../assets/images/winter.webp';
import Winter2Image from '../assets/images/winter2.webp';
import Winter3Image from '../assets/images/winter3.webp';
import { moonIcons } from '../assets/moon';
import { createCalendarInfo, getEclipticCoordinate } from '../models/CalendarInfo';
import JapaneseLunisolarCalendar from '../models/JapaneseLunisolarCalendar';
import { getAge } from '../utils/date';
import { DateResultItem, DateResultItemProps } from './DateResultItem';

const useStyles = makeStyles((theme) => ({
  dateAlert: {
    marginBottom: theme.spacing(2),
  },
}));

type DateResultProps = {
  date: Date;
};

export const DateResult = ({ date }: DateResultProps) => {
  console.log('DEBUG: render DataResult');

  const [t] = useTranslation();

  const calendar = new JapaneseLunisolarCalendar(date);
  const calendarInfo = createCalendarInfo(calendar);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const eraYear = year - Math.floor((calendarInfo?.era.startAt ?? NaN) / 10000) + 1;
  const age = getAge(date);
  const julianDay = date.getJulianDay();
  const julianDayRevise = julianDay - 2400000.5;
  const lilianDay = julianDay - 2299159.5;
  const eclipticCoordinate = getEclipticCoordinate(julianDay + 1);
  const seasonImage = getSeasonImage(calendarInfo?.season.season4.value);
  const zodiacImage = getZodiacImage(calendarInfo?.etoYear.junishi.value);
  const moonIcon = moonIcons[Math.floor(calendar.lunaAge)];

  const cardInfo: DateResultItemProps[] = [
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
      balloon: 1 <= age ? util.format(t('label.age'), age) : undefined,
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
      image: seasonImage.season4Image,
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
      kana: calendarInfo?.season.season24.startAt === 0 ? calendarInfo?.season.season24.kana : undefined,
      summary1: calendarInfo?.season.season24.startAt === 0 ? calendarInfo?.season.season24.summary : undefined,
      summary2: t('text.season24'),
      url: 'https://www.ndl.go.jp/koyomi/chapter3/s7.html',
      image: seasonImage.season24Image,
    },
    {
      title: t('label.season72'),
      value: calendarInfo?.season.season72.value,
      kana: calendarInfo?.season.season72.kana,
      summary1: calendarInfo?.season.season72.summary,
      summary2: t('text.season72'),
      url: 'https://eco.mtk.nao.ac.jp/koyomi/wiki/B5A8C0E12FBCB7BDBDC6F3B8F5.html',
      image: seasonImage.season72Image,
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

  const classes = useStyles();
  return (
    <Box>
      {date.isTokyoLocalTime() && (
        <Alert className={classes.dateAlert} variant="standard" severity="warning" data-testid="dataResult__alert">
          {t('message.warning.old-year')}
        </Alert>
      )}
      <Grid container spacing={2} data-testid="dataResult__items">
        {cardInfo.map((props, i) => (
          <Grid item key={`dataResult__item${i}`} xs={12} sm={6} md={4}>
            <DateResultItem props={props} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

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
    default:
      season4Image = WinterImage;
      season24Image = Winter2Image;
      season72Image = Winter3Image;
      break;
  }
  return { season4Image, season24Image, season72Image };
};

// eslint-disable-next-line complexity
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
    default:
      zodiacImage = BoarImage;
      break;
  }
  return zodiacImage;
};

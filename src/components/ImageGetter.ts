import AutumnImage from '../assets/autumn.webp';
import Autumn2Image from '../assets/autumn2.webp';
import Autumn3Image from '../assets/autumn3.webp';
import BoarImage from '../assets/boar.webp';
import ChickenImage from '../assets/chicken.webp';
import CowImage from '../assets/cow.webp';
import DogImage from '../assets/dog.webp';
import DragonImage from '../assets/dragon.webp';
import HorseImage from '../assets/horse.webp';
import MonkeyImage from '../assets/monkey.webp';
import MouseImage from '../assets/mouse.webp';
import RabbitImage from '../assets/rabbit.webp';
import SheepImage from '../assets/sheep.webp';
import SnakeImage from '../assets/snake.webp';
import SpringImage from '../assets/spring.webp';
import Spring2Image from '../assets/spring2.webp';
import Spring3Image from '../assets/spring3.webp';
import SummerImage from '../assets/summer.webp';
import Summer2Image from '../assets/summer2.webp';
import Summer3Image from '../assets/summer3.webp';
import TigerImage from '../assets/tiger.webp';
import WinterImage from '../assets/winter.webp';
import Winter2Image from '../assets/winter2.webp';
import Winter3Image from '../assets/winter3.webp';

export const getSeasonImage = (season4?: string) => {
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

/* eslint-disable */
export const getZodiacImage = (junishi?: string) => {
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
/* eslint-enable */

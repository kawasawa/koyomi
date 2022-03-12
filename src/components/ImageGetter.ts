import AutumnImage from '../assets/autumn.jpg';
import Autumn2Image from '../assets/autumn2.jpg';
import Autumn3Image from '../assets/autumn3.jpg';
import BoarImage from '../assets/boar.jpg';
import ChickenImage from '../assets/chicken.jpg';
import CowImage from '../assets/cow.jpg';
import DogImage from '../assets/dog.jpg';
import DragonImage from '../assets/dragon.jpg';
import HorseImage from '../assets/horse.jpg';
import MonkeyImage from '../assets/monkey.jpg';
import MouseImage from '../assets/mouse.jpg';
import RabbitImage from '../assets/rabbit.jpg';
import SheepImage from '../assets/sheep.jpg';
import SnakeImage from '../assets/snake.jpg';
import SpringImage from '../assets/spring.jpg';
import Spring2Image from '../assets/spring2.jpg';
import Spring3Image from '../assets/spring3.jpg';
import SummerImage from '../assets/summer.jpg';
import Summer2Image from '../assets/summer2.jpg';
import Summer3Image from '../assets/summer3.jpg';
import TigerImage from '../assets/tiger.jpg';
import WinterImage from '../assets/winter.jpg';
import Winter2Image from '../assets/winter2.jpg';
import Winter3Image from '../assets/winter3.jpg';

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

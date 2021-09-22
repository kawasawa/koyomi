import SpringImage from '../resources/spring.jpg';
import Spring2Image from '../resources/spring2.jpg';
import Spring3Image from '../resources/spring3.jpg';
import SummerImage from '../resources/summer.jpg';
import Summer2Image from '../resources/summer2.jpg';
import Summer3Image from '../resources/summer3.jpg';
import AutumnImage from '../resources/autumn.jpg';
import Autumn2Image from '../resources/autumn2.jpg';
import Autumn3Image from '../resources/autumn3.jpg';
import WinterImage from '../resources/winter.jpg';
import Winter2Image from '../resources/winter2.jpg';
import Winter3Image from '../resources/winter3.jpg';

import BoarImage from '../resources/boar.jpg';
import ChickenImage from '../resources/chicken.jpg';
import CowImage from '../resources/cow.jpg';
import DogImage from '../resources/dog.jpg';
import DragonImage from '../resources/dragon.jpg';
import HorseImage from '../resources/horse.jpg';
import MonkeyImage from '../resources/monkey.jpg';
import MouseImage from '../resources/mouse.jpg';
import RabbitImage from '../resources/rabbit.jpg';
import SheepImage from '../resources/sheep.jpg';
import SnakeImage from '../resources/snake.jpg';
import TigerImage from '../resources/tiger.jpg';

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

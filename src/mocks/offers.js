import {getRandomArrayItem, getRandomArrayItems, getRandomBoolean, getRandomNumber} from '../utils/random.js';

import {OfferTypes} from '../const.js';
import {nanoid} from 'nanoid';

const OfferNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Nice, cozy, warm big bed apartment`,
  `Canal View Prinsengracht`
];

const Images = [
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/room.jpg`
];

const Appliences = [
  `Fridge`,
  `Microwave`,
  `Wi-Fi`,
  `Washing machine`,
  `Towels`,
  `Heating`,
  `Coffee machine`,
  `Baby seat`,
  `Kitchen`,
  `Dishwasher`,
  `Cabel TV`,
];

const CoordinatesAmsterdam = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198],
  [52.3509553943508, 4.870309666406198],
  [52.3709553943508, 4.939309666406198]
];

const CoordinatesParis = [
  [48.8466, 2.3722],
  [48.8416, 2.3392],
  [48.8596, 2.3522],
  [48.8366, 2.3592],
  [48.8666, 2.3422],
  [48.8266, 2.3622]
];

const Cities = [
  {
    name: `Amsterdam`,
    coords: [52.38333, 4.9]
  },
  {
    name: `Paris`,
    coords: [48.8566, 2.3522]
  },
  {
    name: `Cologne`,
    coords: [50.9375, 6.9603]
  },
  {
    name: `Brussels`,
    coords: [50.8503, 4.3517]
  },
  {
    name: `Hamburg`,
    coords: [53.5511, 9.9937]
  },
  {
    name: `Dusseldorf`,
    coords: [51.2277, 6.7735]
  }
];

const Host = {
  NAMES: [`Angelina`, `Max`],
  AVATARS: [`img/avatar-angelina.jpg`, `img/avatar-max.jpg`],
};

const getRandomOffer = (coordinate, city, id) => {
  return {
    appliences: getRandomArrayItems(Appliences),
    bedrooms: getRandomNumber(1, 3),
    coordinates: coordinate,
    city,
    description: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    guests: getRandomNumber(1, 8),
    host: {
      avatar: getRandomArrayItem(Host.AVATARS),
      name: getRandomArrayItem(Host.NAMES),
      super: getRandomBoolean()
    },
    id,
    imagesGallery: getRandomArrayItems(Images),
    mainImage: getRandomArrayItem(Images),
    offerType: getRandomArrayItem(OfferTypes),
    premium: getRandomBoolean(),
    price: getRandomNumber(50, 1000),
    rate: getRandomNumber(1, 5),
    reviews: [
      {
        id: nanoid(),
        user: {
          userName: `Alex`,
          avatar: `img/avatar-max.jpg`
        },
        content: `A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        rate: getRandomNumber(1, 5),
        date: `${new Date()}`
      },
      {
        id: nanoid(),
        user: {
          userName: `Angela`,
          avatar: `img/avatar-angelina.jpg`
        },
        content: `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
        rate: getRandomNumber(1, 5),
        date: `${new Date()}`
      }
    ],
    title: getRandomArrayItem(OfferNames)
  };
};

let counter = 0;

export const offers = new Array(6).fill(``).map(() => {
  const id = counter;
  counter++;
  const city = Cities[getRandomNumber(0, 1)];
  let coordinate = [];
  const coordA = CoordinatesAmsterdam;
  const coordP = CoordinatesParis;
  if (city.name === `Amsterdam`) {
    coordinate = coordA.shift();
  } else {
    coordinate = coordP.shift();
  }
  return getRandomOffer(coordinate, city, id);
});

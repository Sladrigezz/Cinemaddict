export const randomInteger = (min, max) => {
    return min + Math.floor(Math.random() * (max - min));
};

const TEXT_LOREM = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, 
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.` ,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `Aliquam erat volutpat.`,
    `In rutrum ac purus sit amet  tempus.`,
];

const IMAGES = [
    `images/posters/the-dance-of-life.jpg`,
    `images/posters/sagebrush-trail.jpg`,
    `images/posters/the-man-with-the-golden-arm.jpg`,
    `images/posters/santa-claus-conquers-the-martians.jpg`,
    `images/posters/popeye-meets-sinbad.png`,
    `images/posters/the-great-flamarion.jpg`,
    `images/posters/the-man-with-the-golden-arm.jpg`,
]

const TITLES = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad `,
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Santa Claus Conquers the Martians`,
    `Made for Each Other`,
];

const GENRES = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`,
];

const NAMES = [
    `Luciana Khan`,
    `Josh Cross`,
    `Yu Fuller`,
    `Larry Goodman`,
    `Nida Becker`,
    `Eshaal Carter`,
    `Zayn Rigby`,
    `Bill Davies`,
    `Robson Merrill`,
    `Dru Sharpe`,
];

const COUNTRIES = [
    `United States`,
    `France`,
    `China`,
    `India`,
    `United Kingdom`,
    `Nigeria`,
    `Egypt`,
    `Iran`,
    `Japan`,
    `Korea`,
    `Hong Kong`,
    `Turkey`,
    `Pakistan`,
    `Bangladesh`,
    `Indonesia`,
    `Trinidad and Tobago`,
    `Nepal`,
];

const YEARS = [
    `1929`,
    `1930`,
    `1935`,
    `1933`,
    `1940`,
    `1938`,
];

const DURIATION = [
    `1h`,
    `1h 15m`,
    `1h 45m`,
    `1h 10m`,
    `1h 50m`,
    `1h 40m`,
];

export {
    IMAGES,
    TITLES,
    TEXT_LOREM,
    GENRES,
    NAMES,
    COUNTRIES,
    YEARS,
    DURIATION,
};

export const getRandomArray = (array) => {
    const randomArray = [];
    const length = randomInteger(1, 6);
    for (let index = 0; index < length; index++) {
        randomArray[index] = array[randomInteger(0, array.length-1)];
    };
    return randomArray;
};

export const getOneRandomArray = (array) => {
    const randomArray = [];
    const length = randomInteger(1, 2);
    for (let index = 0; index < length; index++) {
        randomArray[index] = array[randomInteger(0, array.length-1)];
    };
    return randomArray;
};
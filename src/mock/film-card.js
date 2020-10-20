import { text, filmTitles, genres } from './../const';
import {
  getRandomArbitrary,
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomBooleanValue,
} from './../utils';


const generateDescription = () => {
  const sentences = text
    .trim()
    .slice(0, -1)
    .split(`. `)
    .map((sentence) => `${sentence}.`);

  const sentencesAmount = getRandomIntInclusive(1, 3);
  const result = [];

  for (let i = 0; i < sentencesAmount; i++) {
    result.push(getRandomArrayItem(sentences));
  }

  return result.join(` `);
};


const generateFilmCard = () => ({
  title: getRandomArrayItem(filmTitles),
  rate: +getRandomArbitrary(0, 10).toFixed(1),
  year: getRandomIntInclusive(1920, 1950),
  genre: getRandomArrayItem(genres),
  duration: getRandomIntInclusive(10, 180),
  description: generateDescription(),
  commentsCount: getRandomIntInclusive(0, 5),
  isInWatchlist: getRandomBooleanValue(),
  isWatched: getRandomBooleanValue(),
  isFavorite: getRandomBooleanValue(),
});


const generateFilmCards = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateFilmCard());
  }

  return result;
};

export { generateFilmCard, generateFilmCards };

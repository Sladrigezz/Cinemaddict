import { text, filmTitles, genres, users, emotions } from './../const';
import { getRandomArbitrary, getRandomIntInclusive, getRandomArrayItem, getRandomBooleanValue } from '../utils/common';


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

const generateGenres = (genres) => genres.filter(getRandomBooleanValue).slice(0, getRandomIntInclusive(1, 3));

const getRandomRating = () => +getRandomArbitrary(1, 9).toFixed(1);

const getRandomDate = () => {
  const targetDate = new Date();
  const diffYear = getRandomIntInclusive(0, 100);
  targetDate.setFullYear(targetDate.getFullYear() - diffYear);

  return targetDate;
};

const getRandomCommentDate = () => {
  const currentDate = Date.now();
  const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;
  const diffDate = getRandomIntInclusive(0, threeDaysInMs);
  return new Date(currentDate - diffDate);
};

const generateComment = () => {
  return {
    text: generateDescription(),
    emotion: getRandomArrayItem(emotions),
    author: getRandomArrayItem(users),
    date: getRandomCommentDate(),
    id: String(new Date() + Math.random()),
  };
};

const generateComments = () => {
  const commentCount = getRandomIntInclusive(0, 5);
  const result = [];

  for (let i = 0; i < commentCount; i++) {
    result.push(generateComment());
  }

  return result;
};

const generateRating = (userRating) => {
  if (getRandomBooleanValue()) {
    return getRandomRating();
  }

  return userRating || null;
};

const generateFilmCard = () => {
  const userRating = getRandomBooleanValue() ? getRandomIntInclusive(1, 9) : null;
  const rate = generateRating(userRating);

  return {
    title: getRandomArrayItem(filmTitles),
    rate,
    releaseDate: getRandomDate(),
    genres: [...new Set(generateGenres(genres))],
    duration: getRandomIntInclusive(10, 180),
    description: generateDescription(),
    isInWatchlist: getRandomBooleanValue(),
    isWatched: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
    comments: generateComments(),
    userRating: isWatched ? userRating : null,
    id: String(new Date() + Math.random()),
  };
};

const generateFilmCards = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateFilmCard());
  }

  return result;
};

export { generateFilmCard, generateFilmCards };

import {text, Emotions} from '../const';
import {
  getRandomArbitrary,
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomBooleanValue,
  getFileName,
} from '../utils/common';

const FilmTitles = [
  `Made For Each Other`,
  `Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `the Dance Of Life`,
  `the Great Flamarion`,
  `the Man With The Glden Arm`
];

const Genres = [
  `Cartoon`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Fantasy`,
  `Romance`,
  `Thriller`,
  `Western`,
];

const Users = [
  `Mike`,
  `Paul`,
  `Amiran`,
  `Lizzzza`,
  `Kate`,
  `Anna`,
  `Piter`,
  `Hulk`,
  `John`,
  `Vandie`,
];

const Countries = [
  `United States`,
  `China`,
  `India`,
  `Japan`,
  `United Kingdom`,
  `South Korea`,
  `France`,
  `Germany`,
  `Russia`,
  `Australia`,
];

const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;
const hundredYears = 100;
const yearInMs = 1000 * 60 * 60 * 24 * 365;

const getRandomRating = () => +getRandomArbitrary(1, 9).toFixed(1);

const getRandomDate = (period) => {
  const currentDate = Date.now();
  const diffDate = getRandomIntInclusive(0, period);
  return new Date(currentDate - diffDate);
};

const getRandomReleaseDate = () => {
  const targetDate = new Date();
  const diffYear = getRandomIntInclusive(0, hundredYears);
  targetDate.setFullYear(targetDate.getFullYear() - diffYear);

  return targetDate.getTime();
};


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

const generateItems = (arr) => arr
  .filter(getRandomBooleanValue)
  .slice(0, getRandomIntInclusive(1, 5));

const generateComment = () => {
  return {
    author: getRandomArrayItem(Users),
    text: generateDescription(),
    date: getRandomDate(threeDaysInMs),
    emotion: getRandomArrayItem(Emotions),
  };
};


const gererateAllComments = () => {
  const commentsAmount = 100;
  const allComments = [];

  for (let i = 0; i < commentsAmount; i++) {
    const comment = generateComment();
    comment.id = i;
    allComments.push(comment);
  }

  return allComments;
};

const allComments = gererateAllComments();
const reservedComments = [];

const generateCommentsForFilm = (amount) => {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    const commentId = getRandomArrayItem(allComments).id;
    if (!reservedComments.includes(commentId)) {
      comments.push(commentId);
      reservedComments.push(commentId);
    }
  }

  return comments;
};


const generateFilm = () => {
  const title = getRandomArrayItem(FilmTitles);
  const isWatched = getRandomBooleanValue();
  const userRating = getRandomBooleanValue() ? getRandomIntInclusive(1, 9) : null;
  const totalRating = getRandomBooleanValue() ? getRandomRating() : null;
  const commentsAmount = getRandomIntInclusive(1, 10);
  const comments = generateCommentsForFilm(commentsAmount);

  return {
    filmInfo: {
      title,
      alternativeTitle: `alternative title`,
      totalRating,
      poster: `./images/posters/${getFileName(title)}.jpg`,
      ageRating: getRandomIntInclusive(0, 21),
      director: getRandomArrayItem(Users),
      writers: [...new Set(generateItems(Users))],
      actors: [...new Set(generateItems(Users))],
      releaseDate: getRandomReleaseDate(),
      releaseCountry: getRandomArrayItem(Countries),
      duration: getRandomIntInclusive(10, 180),
      genres: [...new Set(generateItems(Genres))],
      description: generateDescription(),
    },
    userRating: isWatched ? userRating : null,
    isInWatchlist: getRandomBooleanValue(),
    isWatched,
    watchingDate: isWatched ? getRandomDate(yearInMs) : null,
    isFavorite: getRandomBooleanValue(),
    comments,
  };
};


const generateFilms = (count) => {
  const films = [];

  for (let i = 0; i < count; i++) {
    const film = generateFilm();
    film.id = i;
    films.push(film);
  }

  return films;
};

export {generateFilm, generateFilms, allComments, Users};

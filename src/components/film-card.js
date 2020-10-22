import AbstractComponent from './abstract-smart-component';
import { formatDuration, formatYear, getFileName } from '../utils/common';

const createButtonMarkup = (name, isActive) =>
  `<button class="film-card__controls-item button film-card__controls-item--${name}
    ${isActive ? `film-card__controls-item--active` : ``} ">${name}</button>`;

const createCommentsTitleText = (comments) => {
  switch (comments.length) {
    case 0:
      return `no comments`;
    case 1:
      return `1 comment`;
    default:
      return `${comments.length} comments`;
  }
};

const createFilmCardTemplate = (film) => {
  const {
    title,
    rate,
    releaseDate,
    duration,
    genres,
    description,
    comments,
    isInWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, isInWatchlist);
  const watchedButton = createButtonMarkup(`mark-as-watched`, isWatched);
  const favoriteButton = createButtonMarkup(`favorite`, isFavorite);
  const formattedDuration = formatDuration(duration);
  const fileName = getFileName(title);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rate}</p>
    <p class="film-card__info">
      <span class="film-card__year">${formatYear(releaseDate)}</span>
      <span class="film-card__duration">${formattedDuration}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="./images/posters/${fileName}.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${createCommentsTitleText(comments)}</a>
    <form class="film-card__controls">
      ${watchlistButton}
      ${watchedButton}
      ${favoriteButton}
    </form>
  </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  filmCardClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  watchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  watchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  favoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }
}
import UserRankComponent from './components/user-rank';
import MainNavigationComponent from './components/main-navigation';
import SortListComponent from './components/sort-list';
import FilmsComponent from './components/films';
import FilmPopupComponent from './components/film-details';
import FilmListComponent from './components/films-list';
import FilmListTitleComponent from './components/film-list-title';
import FilmListContainerComponent from './components/film-list-container';
import ShowMoreButtonComponent from './components/load-more-button';
import FilmListExtraComponent from './components/films-list-extra';
import FilmCardComponent from './components/film-card';
import { generateFilmCards } from './mock/film-card';
import { RenderPosition, render } from './utils';

const FILM_CARD_COUNT = 20;
const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;

// Рендер фильма и попапа к нему 
const renderFilm = (filmElement, film) => {
  const FilmCard = new FilmCardComponent(film);
  const FilmPopup = new FilmPopupComponent(film);

  const filmCardPoster = FilmCard.getElement().querySelector(`.film-card__poster`)
  const PopupCloseBtn = FilmPopup.getElement().querySelector(`.film-details__close-btn`)

  const onEscKeyDown = (evt) => {
    const escKeyCode = evt.keyCode === 27

    if (escKeyCode) {
      closeFilmPopup(evt);
    }
  };

  const openFilmPopup = (evt) => {
    evt.preventDefault();
    render(mainElement, FilmPopup.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeFilmPopup = (evt) => {
    evt.preventDefault();
    FilmPopup.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  filmCardPoster.addEventListener(`click`, openFilmPopup);
  PopupCloseBtn.addEventListener(`click`, closeFilmPopup);

  render(filmElement, FilmCard.getElement(), RenderPosition.BEFOREEND);
}

// Генерация 20-ти фильмов (FILM_CARD_COUNT)
const filmCards = generateFilmCards(FILM_CARD_COUNT);

const filmsListExtraTitles = [`Top rated`, `Most commented`];

const filmsWatchList = filmCards.filter(({ isInWatchlist }) => isInWatchlist);
const filmsWatched = filmCards.filter(({ isWatched }) => isWatched);
const filmFavorite = filmCards.filter(({ isFavorite }) => isFavorite);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics p`);

// Сколько всего фильмов
footerStatisticsElement.textContent = `${filmCards.length} movies inside`;

// Рендер навигации, сортировка и прочее
render(headerElement, new UserRankComponent(filmsWatchList.length).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new MainNavigationComponent(filmsWatchList.length, filmsWatched.length, filmFavorite.length).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new SortListComponent().getElement(), RenderPosition.BEFOREEND);

render(mainElement, new FilmsComponent().getElement(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, new FilmListComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListElement = filmsElement.querySelector(`.films-list`);

render(filmsListElement, new FilmListTitleComponent(filmCards).getElement(), RenderPosition.BEFOREEND);


// Показ первых пяти фильмов (SHOWING_FILM_CARD_COUNT_ON_START)
render(filmsListElement, new FilmListContainerComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

filmCards.slice(0, showingFilmCardsCount).forEach((card) => renderFilm(filmsListContainerElement, card));

// Рендер кнопки и показ по 5 фильмов за нажатие. После показа всех фильмов кнопка пропадает
render(filmsListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmCardsCount = showingFilmCardsCount;
  showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

  filmCards
    .slice(prevFilmCardsCount, showingFilmCardsCount)
    .forEach((card) => renderFilm(filmsListContainerElement, card));

  if (showingFilmCardsCount >= filmCards.length) {
    showMoreButton.remove();
  }
})


// Рендер и показ двух фильмов с максимальными оценками
render(filmsElement, new FilmListExtraComponent(filmsListExtraTitles[0]).getElement(), RenderPosition.BEFOREEND);

const sortedFilmCardsByRate = filmCards.slice().sort((a, b) => {
  return b.rate - a.rate;
});

const topRatedContainerElements = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

sortedFilmCardsByRate.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA).forEach((card) => renderFilm(topRatedContainerElements, card));


// Рендер и показ двух фильмов с максимальным количеством комментариев
render(filmsElement, new FilmListExtraComponent(filmsListExtraTitles[1]).getElement(), RenderPosition.BEFOREEND);

const sortedFilmCardsByCommentCount = filmCards.slice().sort((a, b) => {
  return b.commentsCount - a.commentsCount;
});

const mostCommentedContainerElements = document.querySelector(`.films-list--extra:last-child .films-list__container`);

sortedFilmCardsByCommentCount.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA).forEach((card) => renderFilm(mostCommentedContainerElements, card));

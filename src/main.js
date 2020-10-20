import UserRankComponent from './components/user-rank';
import MainNavigationComponent from './components/main-navigation';
import SortListComponent from './components/sort-list';
import FilmsComponent from './components/films';
import FilmDetailsComponent from './components/film-details';
import FilmsListComponent from './components/films-list';
import ShowMoreButtonComponent from './components/load-more-button';
import FilmsListExtraComponent from './components/films-list-extra';
import FilmCardComponent from './components/film-card';
import {generateFilms} from './mock/film';
import {RenderPosition, render} from './utils';


const FILM_CARD_COUNT = 20;
const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;


const renderFilm = (filmElement, film) => {
  render(filmElement.getElement(), new )
}

const filmCards = generateFilms(FILM_CARD_COUNT);
const filmsListExtraTitles = [`Top rated`, `Most commented`];



const filmsWatchList = filmCards.filter(({ isInWatchlist }) => isInWatchlist);
const filmsWatched = filmCards.filter(({ isWatched }) => isWatched);
const filmFavorite = filmCards.filter(({ isFavorite }) => isFavorite);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics p`);

footerStatisticsElement.textContent = `${filmCards.length} movies inside`;

render(headerElement, createUserRankTemplate(filmsWatchList.length));
render(mainElement, createMainNavigationTemplate(filmsWatchList.length, filmsWatched.length, filmFavorite.length));
render(mainElement, createSortListTemplate());
render(mainElement, createFilmsTemplate());
render(mainElement, createFilmDetailsTemplate(filmCards[0]), `afterend`);

const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

renderCardsAmount(filmCards, 0, showingFilmCardsCount, filmsListContainerElement);

render(filmsListElement, createShowMoreButtonTemplate());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmCardsCount = showingFilmCardsCount;
  showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

  renderCardsAmount(filmCards, prevFilmCardsCount, showingFilmCardsCount, filmsListContainerElement);

  if (showingFilmCardsCount >= filmCards.length) {
    showMoreButton.remove();
  }
});


render(filmsElement, createFilmsListExtraTemplate(filmsListExtraTitles[0]));

const sortedFilmCardsByRate = filmCards.slice().sort((a, b) => {
  return b.rate - a.rate;
});

const topRatedContainerElements = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

renderCardsAmount(sortedFilmCardsByRate, 0, SHOWING_FILM_CARD_COUNT_BY_EXTRA, topRatedContainerElements);



render(filmsElement, createFilmsListExtraTemplate(filmsListExtraTitles[1]));

const sortedFilmCardsByCommentCount = filmCards.slice().sort((a, b) => {
  return b.commentsCount - a.commentsCount;
});

const mostCommentedContainerElements = document.querySelector(`.films-list--extra:last-child .films-list__container`);

renderCardsAmount(sortedFilmCardsByCommentCount, 0, SHOWING_FILM_CARD_COUNT_BY_EXTRA, mostCommentedContainerElements);


// const popupOpen = document.querySelectorAll(`.film-card__poster`);
// const popupClose = document.querySelector(`.film-details__close`);
// const popup = document.querySelector(`.film-details`);

// popup.classList.add(`visually-hidden`)
// popupClose.addEventListener('click', () => {
//   popup.classList.add(`visually-hidden`)
// })

// popupOpen.forEach(element => {
//   element.addEventListener('click', () => {
//     popup.classList.remove(`visually-hidden`)
//   })
// });

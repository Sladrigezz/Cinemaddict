import FilmsListTopRatedComponent from '../components/films-list-top-rated';
import FilmsListTopCommentedComponent from '../components/films-list-top-commented';
import FilmListContainerComponent from '../components/film-list-container';
import ShowMoreButtonComponent from '../components/show-more-button';
import FilmCardComponent from '../components/film-card';
import FilmPopupComponent from '../components/film-details';
import { RenderPosition, render, remove } from '../utils/render';
import { SortType } from '../components/sort-list'

const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;


const renderFilm = (cardContainer, popupContainer, film) => {
    const FilmCard = new FilmCardComponent(film);
    const FilmPopup = new FilmPopupComponent(film);

    const onEscKeyDown = (evt) => {
        const escKeyCode = evt.keyCode === 27 || evt.key === `Esc`;

        if (escKeyCode) {
            closeFilmPopup(evt);
        }
    };

    const openFilmPopup = (evt) => {
        evt.preventDefault();
        render(popupContainer, FilmPopup, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closeFilmPopup = (evt) => {
        evt.preventDefault();
        remove(FilmPopup);
        document.removeEventListener(`keydown`, onEscKeyDown);
    };

    FilmCard.filmCardClickHandler(openFilmPopup);
    FilmPopup.closePopupButtonClickHandler(closeFilmPopup);

    render(cardContainer, FilmCard, RenderPosition.BEFOREEND);
};

const renderFilms = (cardContainer, popupContainer, films) => films
    .forEach((film) => renderFilm(cardContainer, popupContainer, film));


export default class PageController {
    constructor(filmsComponent, sortComponent) {
        this._filmsComponent = filmsComponent;
        this._sortComponent = sortComponent;
        this._filmListContainerComponent = new FilmListContainerComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();
        this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
        this._filmsListTopCommentedComponent = new FilmsListTopCommentedComponent();
    }

    render(films) {
        if (films.length) {
            const filmsElement = this._filmsComponent.getElement();
            const filmsListElement = filmsElement.querySelector(`.films-list`);
            const filmsListContainerElement = this._filmListContainerComponent.getElement();
            const sortedFilmsByRating = this._filmsListTopRatedComponent.getSortedFilmsByRate(films);
            const sortedFilmsByComments = this._filmsListTopCommentedComponent.getFilmsByCommentCount(films);
            let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;


            const renderShowMoreButton = (Films) => {
                if (showingFilmCardsCount >= Films.length) {
                    return;
                }

                render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

                this._showMoreButtonComponent.setClickHandler(() => {
                    const prevFilmCardsCount = showingFilmCardsCount;
                    showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

                    renderFilms(filmsListContainerElement, filmsElement, Films.slice(prevFilmCardsCount, showingFilmCardsCount));

                    if (showingFilmCardsCount >= Films.length) {
                        remove(this._showMoreButtonComponent);
                    }
                });
            };


            render(filmsListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);
            renderFilms(filmsListContainerElement, filmsElement, films.slice(0, showingFilmCardsCount));
            renderShowMoreButton(films);


            this._sortComponent.sortTypeChangeHandler((sortType) => {
                let sortedFilms = [];

                switch (sortType) {
                    case SortType.DATE:
                        sortedFilms = films.slice().sort((a, b) => b.year - a.year);
                        break;
                    case SortType.RATING:
                        sortedFilms = sortedFilmsByRating;
                        break;
                    case SortType.DEFAULT:
                        sortedFilms = films;
                        break;
                }

                filmsListContainerElement.innerHTML = ``;
                showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

                renderFilms(filmsListContainerElement, filmsElement, sortedFilms.slice(0, showingFilmCardsCount));
                remove(this._showMoreButtonComponent);
                renderShowMoreButton(sortedFilms);
            });



            render(filmsElement, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
            const topRatedContainerElements = filmsElement.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
            renderFilms(topRatedContainerElements, filmsElement, sortedFilmsByRating.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA));




            render(filmsElement, this._filmsListTopCommentedComponent, RenderPosition.BEFOREEND);
            const mostCommentedContainerElements = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);
            renderFilms(mostCommentedContainerElements, filmsElement, sortedFilmsByComments.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA));

        }
    }
}
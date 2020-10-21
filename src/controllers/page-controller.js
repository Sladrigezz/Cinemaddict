import FilmsListTopRatedComponent from './../components/film-list-top-rated';
import FilmsListTopCommentedComponent from './../components/films-list-top-commented';
import FilmListContainerComponent from './../components/film-list-container';
import ShowMoreButtonComponent from './../components/show-more-button';
import FilmCardComponent from './../components/film-card';
import FilmDetailsComponent from './../components/film-details';
import { RenderPosition, render, remove } from './../utils/render';


const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;


const renderFilms = (cardContainer, popupContainer, film) => {
    const FilmCard = new FilmCardComponent(film);
    const FilmDetails = new FilmDetailsComponent(film);

    const onEscKeyDown = (evt) => {
        const escKeyCode = evt.key === 27;

        if (escKeyCode) {
            closeFilmDetails(evt);
        }
    };

    const openFilmDetails = (evt) => {
        evt.preventDefault();
        render(popupContainer, FilmDetails, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closeFilmDetails = (evt) => {
        evt.preventDefault();
        remove(FilmDetails);
        document.removeEventListener(`keydown`, onEscKeyDown);
    };

    FilmCard.filmCardClickHandler(openFilmDetails);
    FilmDetails.closePopupButtonClickHandler(closeFilmDetails);

    render(cardContainer, FilmCard, RenderPosition.BEFOREEND);
};


export default class PageController {
    constructor(filmsComponent) {
        this._filmsComponent = filmsComponent;
        this._filmListContainerComponent = new FilmListContainerComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();
        this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
        this._filmsListTopCommentedComponent = new FilmsListTopCommentedComponent();
    }

    render(films) {

        const filmsElement = this._filmsComponent.getElement();
        const filmsListElement = filmsElement.querySelector(`.films-list`);
        const filmsListContainerElement = this._filmListContainerComponent.getElement();

        render(filmsListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);

        let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

        films.slice(0, showingFilmCardsCount).forEach((card) => renderFilms(filmsListContainerElement, filmsElement, card));

        render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setClickHandler(() => {
            const prevFilmCardsCount = showingFilmCardsCount;
            showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

            films.slice(prevFilmCardsCount, showingFilmCardsCount).forEach((card) => renderFilms(filmsListContainerElement, filmsElement, card));

            if (showingFilmCardsCount >= films.length) {
                remove(this._showMoreButtonComponent);
            }
        });

        render(filmsElement, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);

        const sortedFilmsTopRated = this._filmsListTopRatedComponent.getFilmsByRate(films);
        const topRatedContainerElements = filmsElement.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

        sortedFilmsTopRated.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA).forEach((card) => renderFilms(topRatedContainerElements, filmsElement, card));

        render(filmsElement, this._filmsListTopCommentedComponent, RenderPosition.BEFOREEND);

        const sortedFilmsTopCommented = this._filmsListTopCommentedComponent.getFilmsByCommentCount(films);
        const mostCommentedContainerElements = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

        sortedFilmsTopCommented.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA).forEach((card) => renderFilms(mostCommentedContainerElements, filmsElement, card));


    }
}
import FilmsListTopRatedComponent from '../components/films-list-top-rated';
import FilmsListTopCommentedComponent from '../components/films-list-top-commented';
import FilmListContainerComponent from '../components/film-list-container';
import ShowMoreButtonComponent from '../components/show-more-button';
import { RenderPosition, render, remove } from '../utils/render';
import { SortType } from '../components/sort-list'
import MovieController from './movie-controller';

const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;


const renderFilms = (cardContainer, popupContainer, films, onDataChange, onViewChange) => {
    return films.map((film) => {
        const filmController = new MovieController(cardContainer, popupContainer, onDataChange, onViewChange);
        filmController.render(film);

        return filmController;
    });
};


export default class PageController {
    constructor(filmsComponent, sortComponent) {
        this._filmsComponent = filmsComponent;
        this._sortComponent = sortComponent;
        this._films = [];
        this._allFilmsControllers = [];
        this._showingFilmCardCountByButton = SHOWING_FILM_CARD_COUNT_BY_BUTTON;
        this._filmListContainerComponent = new FilmListContainerComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();
        this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();
        this._filmsListTopCommentedComponent = new FilmsListTopCommentedComponent();
        this._onSortTypeChange = this._onSortTypeChange.bind(this);
        this._onDataChange = this._onDataChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);
        // this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }

    render(films) {
        this.films = films

        if (films.length) {
            const filmsElement = this._filmsComponent.getElement();
            const filmsListElement = filmsElement.querySelector(`.films-list`);
            const filmsListContainerElement = this._filmListContainerComponent.getElement();

            render(filmsListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);

            const newFilms = renderFilms(filmsListContainerElement, filmsElement, this._films.slice(0, this._showingFilmCardCountByButton), this._onDataChange, this._onViewChange);
            this._allFilmsControllers = this._allFilmsControllers.concat(newFilms);


            render(filmsElement, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
            const sortedFilms = this._filmsListTopRatedComponent.getSortedFilmsByRate(this._films);

            const topRatedContainerElements = filmsElement.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
            const newFilmsInExtraRate = renderFilms(topRatedContainerElements, filmsElement, sortedFilms.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA), this._onDataChange, this._onViewChange);
            this._allFilmsControllers = this._allFilmsControllers.concat(newFilmsInExtraRate);



            render(filmsElement, this._filmsListTopCommentedComponent, RenderPosition.BEFOREEND);
            const topCommentedContainerElements = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

            const newFilmsInExtraCommends = renderFilms(topCommentedContainerElements, filmsElement, sortedFilms.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA), this._onDataChange, this._onViewChange);
            this._allFilmsControllers = this._allFilmsControllers.concat(newFilmsInExtraCommends);

        }
    }



    _renderShowMoreButton(films) {
        if (this._showingFilmCardCountByButton >= films.length) {
            return;
        }
        const filmsElement = this._filmsComponent.getElement();
        const filmsListElement = filmsElement.querySelector(`.films-list`);
        const filmsListContainerElement = this._filmListContainerComponent.getElement();

        render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setClickHandler(() => {
            const prevFilmCardsCount = this._showingFilmCardCountByButton;
            this._showingFilmCardCountByButton += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

            const newFilms = renderFilms(filmsListContainerElement, filmsElement, films.slice(prevFilmCardsCount, this._showingFilmCardCountByButton), this._onDataChange, this._onViewChange);
            this._allFilmsControllers = this._allFilmsControllers.concat(newFilms);
            if (this._showingFilmCardCountByButton >= films.length) {
                remove(this._showMoreButtonComponent);
            }
        });
    }

    _onDataChange(movieController, oldData, newData) {
        const index = this._films.findIndex((it) => it === oldData);
        if (index === -1) {
            return;
        }
        this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
        movieController.render(this._films[index]);
    }

    _onViewChange() {
        this._allFilmsControllers.forEach((it) => it.setDefaultView());
    }

    _onSortTypeChange(sortType) {
        let sortedFilms = [];

        switch (sortType) {
            case SortType.DATE:
                sortedFilms = this._films.slice().sort((a, b) => {
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                });
                break;
            case SortType.RATING:
                sortedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
                break;
            case SortType.DEFAULT:
                sortedFilms = this._films.slice(0, this._showingFilmCardCountByButton);
                break;
        }

        const filmsElement = this._filmsComponent.getElement();
        const filmsListContainerElement = this._filmListContainerComponent.getElement();

        filmsListContainerElement.innerHTML = ``;
        this._showingFilmCardCountByButton = SHOWING_FILM_CARD_COUNT_ON_START;

        const newFilms = renderFilms(filmsListContainerElement, filmsElement, sortedFilms.slice(0, this._showingFilmCardCountByButton), this._onDataChange, this._onViewChange);
        this._allFilmsControllers = newFilms;
        remove(this._showMoreButtonComponent);
        this._renderShowMoreButton(sortedFilms);
    }
}
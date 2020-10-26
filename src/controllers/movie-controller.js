import FilmCardComponent from './../components/film-card';
import FilmPopupComponent from './../components/film-details';
import { RenderPosition, render, replace, remove } from './../utils/render';


export const Mode = {
    DEFAULT: `default`,
    POPUP: `popup`,
};


export default class MovieController {
    constructor(cardContainer, popupContainer, onDataChange, onViewChange) {
        this._cardContainer = cardContainer;
        this._popupContainer = popupContainer;
        this._onDataChange = onDataChange;
        this._onViewChange = onViewChange;

        this._mode = Mode.DEFAULT;

        this._movieCardComponent = null;
        this._moviePopupComponent = null;
    }

    render(movie) {
        const oldMovieCardComponent = this._movieCardComponent;
        const oldMoviePopupComponent = this._moviePopupComponent;

        this._movieCardComponent = new FilmCardComponent(movie);
        this._moviePopupComponent = new FilmPopupComponent(movie);

        const onEscKeyDown = (evt) => {
            const isEscKey = evt.keyCode === 27 || evt.key === `Esc`;

            if (isEscKey) {
                closeMoviePopup(evt);
            }
        };

        const openMoviePopup = (evt) => {
            evt.preventDefault();
            this._onViewChange();
            render(this._popupContainer, this._moviePopupComponent, RenderPosition.BEFOREEND);
            this._mode = Mode.POPUP;
            document.addEventListener(`keydown`, onEscKeyDown);
        };

        const closeMoviePopup = (evt) => {
            evt.preventDefault();
            const data = this._moviePopupComponent.getData();
            this._onDataChange(this, movie, Object.assign({}, movie, data));
            document.removeEventListener(`keydown`, onEscKeyDown);
        };

        this._movieCardComponent.filmCardClickHandler(openMoviePopup);


        this._movieCardComponent.watchlistButtonClickHandler(() => {
            this._onDataChange(this, movie, Object.assign({}, movie, {
                isInWatchlist: !movie.isInWatchlist,
            }));
        });

        this._movieCardComponent.watchedButtonClickHandler(() => {
            this._onDataChange(this, movie, Object.assign({}, movie, {
                isWatched: !movie.isWatched,
            }));
        });

        this._movieCardComponent.favoriteButtonClickHandler(() => {
            this._onDataChange(this, movie, Object.assign({}, movie, {
                isFavorite: !movie.isFavorite,
            }));
        });
        this._moviePopupComponent.setSubmitHandler(closeMoviePopup);

        if (oldMovieCardComponent && oldMoviePopupComponent) {
            replace(this._movieCardComponent, oldMovieCardComponent);
            replace(this._moviePopupComponent, oldMoviePopupComponent);
            this._removePopupWithoutSaving();
        } else {
            render(this._cardContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
        }
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._removePopupWithoutSaving();
        }
    }

    _removePopupWithoutSaving() {
        this._moviePopupComponent.reset();
        remove(this._moviePopupComponent);
        this._moviePopupComponent.recoveryListeners();
        this._mode = Mode.DEFAULT;

    }
}
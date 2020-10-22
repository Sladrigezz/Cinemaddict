import FilmCardComponent from './../components/film-card';
import FilmPopupComponent from './../components/film-details';
import { RenderPosition, render, replace, remove } from './../utils/render';


const Mode = {
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

        this._onEscKeyDown = this._onEscKeyDown.bind(this);
    }

    render(movie) {
        const oldMovieCardComponent = this._movieCardComponent;
        const oldMoviePopupComponent = this._moviePopupComponent;

        this._movieCardComponent = new FilmCardComponent(movie);
        this._moviePopupComponent = new FilmDetailsComponent(movie);

        const openMoviePopup = (evt) => {
            evt.preventDefault();
            this._renderPopup();
            document.addEventListener(`keydown`, this._onEscKeyDown);
        };

        const closeMoviePopup = (evt) => {
            evt.preventDefault();
            this._removePopup();
            document.removeEventListener(`keydown`, this._onEscKeyDown);
        };

        this._movieCardComponent.filmCardClickHandler(openMoviePopup);
        this._moviePopupComponent.closePopupButtonClickHandler(closeMoviePopup);


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


        if (oldMovieCardComponent && oldMoviePopupComponent) {
            replace(this._movieCardComponent, oldMovieCardComponent);
            replace(this._moviePopupComponent, oldMoviePopupComponent);
        } else {
            render(this._cardContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
        }
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._removePopup();
        }
    }

    _removePopup() {
        this._moviePopupComponent.reset();

        remove(this._moviePopupComponent);
        this._mode = Mode.DEFAULT;
    }

    _renderPopup() {
        this._onViewChange();

        render(this._popupContainer, this._moviePopupComponent, RenderPosition.BEFOREEND);
        this._mode = Mode.POPUP;
    }

    _onEscKeyDown(evt) {
        const isEscKey = evt.keyCode === 27 || evt.key === `Esc`;

        if (isEscKey) {
            this._removePopup();
            document.removeEventListener(`keydown`, this._onEscKeyDown);
        }
    }
}
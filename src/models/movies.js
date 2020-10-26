import { getFilmsByFilter } from '../utils/filter';
import { filterType } from '../const';


export default class Movies {
    constructor() {
        this._movies = [];
        this._activeFilterType = filterType.ALL;

        this._dataChangeHandlers = [];
        this._filterChangeHandlers = [];
    }

    getMovies() {
        return getFilmsByFilter(this._movies, this._activeFilterType);
    }

    getMoviesByFilter() {
        return getFilmsByFilter(this._movies, filterType);
    }

    setMovies() {
        this._movies = Array.from(movies);
    }

    updateMovie(id, movie) {
        const index = this._movies.findIndex((it) => it.id === id);
        if (index === -1) {
            return false;
        }
        this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

        this._callHandlers(this._dataChangeHandlers);

        return true;
    }

    setFilterChangeHandler(handler) {
        this._filterChangeHandlers.push(handler);
    }

    setDataChangeHandler(handler) {
        this._dataChangeHandlers.push(handler);
    }

    hasRatings() {
        return this._movies.some(({ rating }) => !!rating);
    }

    hasComments() {
        return this._movies.some(({ comments }) => !!comments.length);
    }

    getSortedMoviesByRating() {
        return this._movies.slice().sort((a, b) => b.rating - a.rating);
    }

    getSortedMoviesByCommentsCount() {
        return this._movies.slice().sort((a, b) => b.comments.length - a.comments.length);
    }

    _callHandlers(handlers) {
        handlers.forEach((handler) => handler());
    }
}
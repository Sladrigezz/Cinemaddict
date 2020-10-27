import { nanoid } from 'nanoid';
import Movie from '../models/movie';
import MovieComment from '../models/movie-comment';
import { getRandomArrayItem } from '../utils/common';
import { Users } from '../mock/film-card';

const getSyncedMovies = (items) => items
    .filter(({ success }) => success)
    .map(({ payload }) => payload.movie);


export default class Provider {
    constructor(api, storeMovies, storeComments) {
        this._api = api;
        this._storeMovies = storeMovies;
        this._storeComments = storeComments;
        this._isSynchronized = true;
    }

    getMovies() {
        if (this._isOnLine()) {
            return this._api.getMovies()
                .then((movies) => {
                    movies.forEach((movie) => {
                        this._storeMovies.setItem(movie.id, movie.toRAW());
                    });
                    return movies;
                });
        }

        const storeMovies = Object.values(this._storeMovies.getAll());
        this._isSynchronized = false;
        return Promise.resolve(Movie.parseMovies(storeMovies));
    }

    getComments(movieId) {
        if (this._isOnLine()) {
            return this._api.getComments(movieId)
                .then((comments) => {
                    comments.forEach((comment) => {
                        this._storeComments.setItem(comment.id, Object.assign({}, comment.toRAW(), { movieId }));
                    });
                    return comments;
                });
        }

        const storeComments = this._storeComments.getCommentsByMovieId(movieId);
        return Promise.resolve(MovieComment.parseMovieComments(storeComments));
    }

    updateMovie(id, movie) {
        if (this._isOnLine()) {
            return this._api.updateMovie(id, movie)
                .then((updatedMovie) => {
                    this._storeMovies.setItem(updatedMovie.id, updatedMovie.toRAW());
                    return updatedMovie;
                });
        }

        const fakeUpdatedMovie = Movie.parseMovie(Object.assign({}, movie.toRAW(), { id }));
        this._isSynchronized = false;
        this._storeMovies.setItem(id, Object.assign({}, fakeUpdatedMovie.toRAW(), { offline: true }));

        return Promise.resolve(fakeUpdatedMovie);
    }

    createComment(comment, movieId) {
        if (this._isOnLine()) {
            return this._api.createComment(comment, movieId)
                .then((comments) => {
                    comments.forEach((updatedComment) => {
                        this._storeComments.setItem(updatedComment.id, Object.assign({}, updatedComment.toRAW(), { movieId }));
                    });
                    return comments;
                });
        }

        const fakeNewCommentId = nanoid();
        const fakeNewCommentAuthor = getRandomArrayItem(Users);

        const fakeNewComment = MovieComment.parseComment(comment.toRAW());

        this._storeComments.setItem(fakeNewCommentId, Object.assign({}, fakeNewComment.toRAW(), { id: fakeNewCommentId, author: fakeNewCommentAuthor, movieId, offline: true }));

        const storeComments = this._storeComments.getCommentsByMovieId(movieId);
        return Promise.resolve(MovieComment.parseMovieComments(storeComments));
    }

    deleteComment(id) {
        if (this._isOnLine()) {
            return this._api.deleteComment(id)
                .then(() => {
                    this._storeComments.removeItem(id);
                });
        }
        this._storeComments.removeItem(id);
        return Promise.resolve();
    }
    sync() {
        if (this._isOnLine()) {
            const storeMovies = Object.values(this._storeMovies.getAll());

            return this._api.sync(storeMovies)
                .then((response) => {
                    storeMovies
                        .filter((movie) => movie.offline)
                        .forEach((movie) => {
                            this._storeMovies.removeItem(movie.id);
                        });

                    const updatedMovies = getSyncedMovies(response.updated);
                    updatedMovies.forEach((movie) => {
                        this._storeMovies.setItem(movie.id, movie);
                    });
                    this._isSynchronized = true;
                    return Promise.resolve();
                });
        }

        return Promise.reject(new Error(`Sync data failed`));
    }

    getSynchronize() {
        return this._isSynchronized;
    }
    _isOnLine() {
        return window.navigator.onLine;
    }
}
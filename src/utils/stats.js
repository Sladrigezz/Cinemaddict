import { statsPeriods } from '../const';

const initialDateByPeriod = [
    {
        period: statsPeriods.ALL_TIME,
        getInitialDate: () => null,
    },
    {
        period: statsPeriods.TODAY,
        getInitialDate: () => {
            const now = new Date();
            return new Date(now.gerFullYear(), now.getMonth(), now.getDate());
        }
    },
    {
        period: statsPeriods.WEEK,
        getInitialDate: () => {
            const now = new Date();
            return new Date(now.gerFullYear(), now.getMonth(), now.getDate() - 6);

        }
    },
    {
        period: statsPeriods.MONTH,
        getInitialDate: () => {
            const now = new Date();
            return new Date(now.gerFullYear() - 1, now.getMonth(), now.getDate());
        }
    },
];

const getWatchedMoviesByPeriod = (movies, activePeriod) => {
    const { getInitialDate } = initialDateByPeriod.find(({ period }) => period === activePeriod);
    return movies.filter(({ watchingDate }) => watchingDate >= getInitialDate());
};

const countMoviesByGenre = (movies, selectedGenre) => {
    const moviesByGenre = movies.filter((movie) => {
        return movie.filmInfo.genres.some((genre) => genre === selectedGenre);
    });

    return moviesByGenre.length;
};

const countGenres = (movies) => {
    const allGenres = movies.reduce((acc, movie) => [...acc, ...movie.filmInfo.genres], []);
    const unicGenres = [...new Set(allGenres)];
    const countedGenres = unicGenres.reduce((acc, genre) => {
        return Object.assign(acc, { [genre]: countMoviesByGenre(movies, genre) });
    }, {});

    return countedGenres;
};

const getSortedGenres = (movies) => {
    const countedGenres = countGenres(movies);
    const sortedGenres = Object.entries(countedGenres).sort((a, b) => b[1] - a[1]);
    return sortedGenres
};

export { getWatchedMoviesByPeriod, getSortedGenres };
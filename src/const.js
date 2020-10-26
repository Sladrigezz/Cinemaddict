const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Cras aliquet varius magna, non porta ligula feugiat eget. 
Fusce tristique felis at fermentum pharetra. 
Aliquam id orci ut lectus varius viverra. 
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`,
};

const Genres = [
  `Action`,
  `Cartoon`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Fantasy`,
  `Musical`,
  `Romance`,
  `Western`,
];

const FilmTitles = [
  `Made For Each Other`,
  `Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `The Dance Of Life`,
  `The Great Flamarion`,
  `The Man With The Golden Arm`,
];


const statsPeriods = {
  ALL_TIME: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`,
};

const Emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const Users = [
  `Mike`,
  `Pasha`,
  `Amiran`,
  `Marcus`,
  `Prince`,
  `Masha`,
  `Denchik`,
  `Anna`,
  `John`,
  `Max`,
];


export { text, FilterType, statsPeriods, Emotions, Users, Genres, FilmTitles };


const createFilmCardMarcup = (name, rating, year, duration, genre, img, description, comments) => {
    return (
        `<article class="film-card">
        <h3 class="film-card__title">${name}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${img}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments} comments</a>
        <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
        </article>
        `
    );
};

export const createFilmCardTemplate = (filmCard) => {
    const filmCardMarcup = filmCard.map((it) =>
        createFilmCardMarcup(it.name, it.rating, it.year, it.duration, it.genre, it.img, it.description, it.comments)).join(`\n`);

    return (
        `<section class="films">
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

  <div class="films-list__container">
  ${filmCardMarcup}
  </div>

  <button class="films-list__show-more">Show more</button>
</section>

<section class="films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container">
  ${filmCardMarcup}
  </div>
</section>

<section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
  ${filmCardMarcup}
  </div>
</section>
</section>`
    );
};

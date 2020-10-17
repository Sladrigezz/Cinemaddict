import {createHeaderProfileTemplate} from "./components/headerprofile.js";
import {createBtnShowMoreTemplate} from "./components/button.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmsTemplate} from "./components/films.js";
import {createFooterTemplate} from "./components/footer.js";
import {createMainNavigatorTemplate} from "./components/navigator.js";
// import {createPopupTemplate} from "./components/popup.js";
import {createSortTemplate} from "./components/sort.js";
import {createTopCommentedFilmsTemplate} from "./components/top-commented-films.js";
import {createTopCommentedTemplate} from "./components/top-commented.js";
import {createTopRatedFilmsTemplate} from "./components/top-rated-films.js";
import {createTopRatedTemplate} from "./components/top-rated.js";

let FILM_CARD_COUNT = 5
let TOP_FILM_COUNT = 2
let COMMENTED_FILM_COUNT = 2

// Функция рендера
const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);

// Main
const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMainNavigatorTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const FilmCardElement = siteMainElement.querySelector(`.films-list__container`);

const FilmElement = siteMainElement.querySelector(`.films`);

for (let index = 0; index < FILM_CARD_COUNT; index++) {
    render(FilmCardElement, createFilmCardTemplate(), `beforeend`);
};

const FilmListElement = siteMainElement.querySelector(`.films-list`);


render(FilmListElement, createBtnShowMoreTemplate(), `beforeend`); // Show more кнопка

render(FilmElement, createTopRatedTemplate(), `beforeend`);  // Top rated

render(FilmElement, createTopCommentedTemplate(), `beforeend`); // Top commented

const FilmListContainerElement = siteMainElement.querySelectorAll(`.films-list__container`);
for (let index = 0; index < TOP_FILM_COUNT; index++) {
    render(FilmListContainerElement[1], createTopRatedFilmsTemplate(), `beforeend`);
};

for (let index = 0; index < COMMENTED_FILM_COUNT; index++) {
    render(FilmListContainerElement[2], createTopCommentedFilmsTemplate(), `beforeend`);
};

// Footer
const siteFooterElement = document.querySelector(`.footer`);
const FooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(FooterStatisticsElement, createFooterTemplate(), `beforeend`);

// Попап
render(siteFooterElement, createPopupTemplate(), `afterend`);
import {createHeaderProfileTemplate} from "./components/headerprofile.js";
import {createBtnShowMoreTemplate} from "./components/button.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmsTemplate} from "./components/films.js";
import {createFooterTemplate} from "./components/footer.js";
import {createMainNavigatorTemplate} from "./components/navigator.js";
import {createPopupTemplate} from "./components/popup.js";
import {createSortTemplate} from "./components/sort.js";
import {createTopCommentedTemplate} from "./components/top-commented.js";
import {createTopRatedTemplate} from "./components/top-rated.js";

import {filmCardMarcupGenerate} from "./mock/film-card"
import {navigatorMarcupGenerate} from "./mock/navigator"

let FILMS_COUNT = 27
let COMMENTED_RATED_FILM_COUNT = 2
let SHOWING_FILM_COUNT_ON_START = 5
let SHOWING_FILM_COUNT_ON_BUTTON = 5


// Функция рендера
const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);

// Main
const navigator = navigatorMarcupGenerate();
const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMainNavigatorTemplate(navigator), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const FilmCardElement = siteMainElement.querySelector(`.films-list__container`);

const FilmElement = siteMainElement.querySelector(`.films`);

const filmCard = filmCardMarcupGenerate(FILMS_COUNT);

const FilmListElement = siteMainElement.querySelector(`.films-list`);


render(FilmListElement, createBtnShowMoreTemplate(), `beforeend`); // Show more кнопка

let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

for (let index = 0; index < showingFilmCount; index++) {
    render(FilmCardElement, createFilmCardTemplate(filmCard), `beforeend`);
}

const showMoreBtn = document.querySelector(`.films-list__show-more`);

showMoreBtn.addEventListener(`click`, () => {
    const prevFilmCard = showingFilmCount;
    showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_ON_BUTTON;

    filmCard.slice(prevFilmCard, showingFilmCount).forEach((filmCard) => 
    render(FilmCardElement, createFilmCardTemplate(filmCard), `beforeend`));

    if (showingFilmCount >= filmCard.length){
        showMoreBtn.remove()
    }
});

render(FilmElement, createTopRatedTemplate(), `beforeend`);  // Top rated

render(FilmElement, createTopCommentedTemplate(), `beforeend`); // Top commented

const FilmListContainerElement = siteMainElement.querySelectorAll(`.films-list__container`);


for (let index = 0; index < COMMENTED_RATED_FILM_COUNT; index++) {
    render(FilmListContainerElement[1], createFilmCardTemplate(filmCard), `beforeend`);
};

for (let index = 0; index < COMMENTED_RATED_FILM_COUNT; index++) {
    render(FilmListContainerElement[2], createFilmCardTemplate(filmCard), `beforeend`);
};

// Footer
const siteFooterElement = document.querySelector(`.footer`);
const FooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(FooterStatisticsElement, createFooterTemplate(), `beforeend`);

// Попап
render(siteFooterElement, createPopupTemplate(), `afterend`);


const popupFilmDetails = document.querySelector(`.film-details`);
popupFilmDetails.classList.add(`visually-hidden`);

const popupFilmCardRemoveHidden = document.querySelectorAll(`.film-card > img`);
for (let index = 0; index < popupFilmCardRemoveHidden.length; index++) {;
    popupFilmCardRemoveHidden[index].addEventListener(`click`, () => {
        popupFilmDetails.classList.remove(`visually-hidden`);
    });
};

const popupFilmCardClose = document.querySelector(`.film-details__close`);
popupFilmCardClose.addEventListener(`click`, () => {
    popupFilmDetails.classList.add(`visually-hidden`);
});
import {createHeaderProfileTemplate} from "./components/headerprofile.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFooterTemplate} from "./components/footer.js";
import {createMainNavigatorTemplate} from "./components/navigator";
import {createPopupTemplate} from "./components/popup.js";

import {filmCardMarcupGenerate} from "./mock/film-card"
import {navigatorMarcupGenerate} from "./mock/navigator"

let FILMS_COUNT = 25
let COMMENTED_RATED_FILM_COUNT = 2
let SHOWING_FILM_COUNT_ON_START = 5
let SHOWING_FILM_COUNT_ON_BUTTON = 5

const navigator = navigatorMarcupGenerate();
const filmCard = filmCardMarcupGenerate(FILMS_COUNT);

// Функция рендера
const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector(`.header`);


render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);

// Main

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMainNavigatorTemplate(navigator), `beforeend`);

let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

// for (let index = 0; index < filmCard.length; index++) {
render(siteMainElement, createFilmCardTemplate(filmCard), `beforeend`);
// }

const showMoreBtn = document.querySelector(`.films-list__show-more`);

showMoreBtn.addEventListener(`click`, () => {
    const prevFilmCard = showingFilmCount;
    showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_ON_BUTTON;

    filmCard.slice(prevFilmCard, showingFilmCount).forEach((filmCard) => 
    render(siteMainElement, createFilmCardTemplate(filmCard), `beforeend`));

    if (showingFilmCount >= filmCard.length){
        showMoreBtn.remove()
    }
});

const FilmListContainerElement = siteMainElement.querySelectorAll(`.films-list__container`);


// for (let index = 0; index < COMMENTED_RATED_FILM_COUNT; index++) {
//     render(FilmListContainerElement[1], createFilmCardTemplate(filmCard), `beforeend`);
// };

// for (let index = 0; index < COMMENTED_RATED_FILM_COUNT; index++) {
//     render(FilmListContainerElement[2], createFilmCardTemplate(filmCard), `beforeend`);
// };

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
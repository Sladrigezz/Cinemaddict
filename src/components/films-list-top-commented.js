import AbstractComponent from './abstract-component';


const createFilmsTopCommentedTemplate = () =>
  `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
  </section>`;


export default class FilmsListMostCommented extends AbstractComponent {
  getTemplate() {
    return createFilmsTopCommentedTemplate();
  }

  getFilmsByCommentCount(films) {
    return films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
  }
}
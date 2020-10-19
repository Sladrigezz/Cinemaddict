const createMainNavigatorMarcup = (name, number) => {
    return (
        `<a href="#${name}" class="main-navigation__item">${name} 
        <span class="main-navigation__item-count">${number}</span></a>`
    );
};

export const createMainNavigatorTemplate = (navigator) => {
    const navigatorMarcup = navigator.map((it) =>
        createMainNavigatorMarcup(it.number, it.name)).join(`\n`);

    return `<nav class="main-navigation">
    <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${navigatorMarcup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>
        <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
        </ul>`;
};
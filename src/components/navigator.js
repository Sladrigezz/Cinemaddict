export const createMainNavigatorMarcup = (number1, number2, number3) => {
    return (
        `<nav class="main-navigation">
            <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${number1}</span></a>
                <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${number2}</span></a>
                <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${number3}</span></a>
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`
    );
};

export const createMainNavigatorTemplate = (navigator) => {
    const navigatorMarcup = navigator.map((it) => 
    createMainNavigatorMarcup (it.number1, it.number2, it.number3)).join(`\n`);

    return (
        `${navigatorMarcup}`
    );
};
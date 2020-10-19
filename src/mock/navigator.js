import { randomInteger } from "../const.js";

const navigatorMarcupGenerate = () => {
    return [{
        name: `Watchlist`,
        number: randomInteger(2, 5),
    }, {
        name: `History`,
        number: randomInteger(10, 20),
    }, {
        name: `Favorites`,
        number: randomInteger(4, 10),
    }];
};

export {navigatorMarcupGenerate};
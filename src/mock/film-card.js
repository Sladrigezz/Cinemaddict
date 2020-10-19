import {randomInteger} from "../const.js";
import {IMAGES, TITLES, TEXT_LOREM, GENRES, NAMES, COUNTRIES, YEARS, DURIATION} from "../const.js";
import {getRandomArray} from "../const.js";
import {getOneRandomArray} from "../const.js";

const filmCardMarcupGenerate = () => {
    return[{
    name: getOneRandomArray(TITLES),
    rating: randomInteger(1,10),
    year: getOneRandomArray(YEARS),
    duration: getOneRandomArray(DURIATION),
    genre: getOneRandomArray(GENRES),
    img: getOneRandomArray(IMAGES),
    description: getRandomArray(TEXT_LOREM),
    comments: randomInteger(0,5),
    }];
};

export {filmCardMarcupGenerate};
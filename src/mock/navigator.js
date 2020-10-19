import {randomInteger} from "../const.js";

const navigatorMarcupGenerate = () => [{
    number1: randomInteger(2,5),
    number2: randomInteger(10,20),
    number3: randomInteger(4,10),
}];

export {navigatorMarcupGenerate};
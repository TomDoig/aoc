import {readFileSync} from "fs";

const partOne = () => {
    return null
}

const partTwo = () => {
    return null;
}

console.log(partOne());
console.log(partTwo());

function getData() {
    return readFileSync(__dirname + '/input.txt', 'utf-8');
}
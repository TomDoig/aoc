import {readFileSync} from "fs";

function partOne() {
    const text = readFileSync(__dirname + '/input.txt', 'utf-8');

    return text
        .split("\n")
        .filter(l => !!l)
        .map((l: Readonly<string>) => {
            const halfway = l.length / 2;
            const one = l.slice(0, halfway)
            const two = l.slice(halfway)

            return one
                .split('')
                .find(c => two.indexOf(c) > -1);
        })
        .map(charToValue)
        .reduce((result, value) => result + value, 0)
}

function partTwo() {
    const text = readFileSync(__dirname + '/input.txt', 'utf-8');

    return text
        .split("\n")
        .filter(l => !!l)
        .reduce((result, value) => {
            if(result.length === 0 || result[result.length -1].length == 3) {
                result.push([]);
            }

            result[result.length -1].push(value)
            return result;
        }, [] as string[][])
        .map(members => {
           return members[0]
               .split('')
               .filter(c => members[1].indexOf(c) > -1)
               .filter(c => members[2].indexOf(c) > -1)[0]
        })
        .map(charToValue)
        .reduce((result, value) => result + value, 0);
}

function charToValue(char: Readonly<string>) {
    const isUppercase = char === char.toUpperCase();
    return char.charCodeAt(0) - (isUppercase ? 38 : 96 );
}

console.log(
    partOne(),
    partTwo()
);


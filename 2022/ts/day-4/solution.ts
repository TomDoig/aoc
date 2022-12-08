import {readFileSync} from "fs";

const getNumbers = () => {
    const data = readFileSync(__dirname + '/input.txt', 'utf-8');

    return data
        .split('\n')
        .filter(l => !!l)
        .map(i => {
            const [a, b] = i.split(',')
            return [...a.split('-'), ...b.split('-')].map(Number);
        })
}

const partOne = () => {
    return getNumbers()
        .filter(([a1, a2, b1, b2]) => {
            return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
        })
        .length
}

const partTwo = () => {
    return getNumbers()
        .filter(([a1, a2, b1, b2]) => {
            return (a1 >= b1 && a1 <= b2)
                || (a2 >= b1 && a2 <= b2)
                || (b1 >= a1 && b1 <= a2)
                || (b2 >= a1 && b2 <= a2)
        })
        .length;
}

console.log(partOne());
console.log(partTwo());
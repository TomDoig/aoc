import {readFileSync} from "fs";

const partOne = () => {
    return detectUniqueStringOfLength(getData(), 4);
}

const partTwo = () => {
    return detectUniqueStringOfLength(getData(), 14);
}

console.log(partOne());
console.log(partTwo());

function getData() {
    return readFileSync(__dirname + '/input.txt', 'utf-8');
}

function detectUniqueStringOfLength(input: string, requiredLength: number): [string, number] {
    const buffer: string[] = []

    for(let x = 0; x < input.length; x++) {
        const c = input.charAt(x);
        buffer.push(c);

        if(buffer.length > requiredLength) {
            buffer.shift()
        }

        if(buffer.length === requiredLength && allUnique(buffer)) {
            return [buffer.join(''), x + 1]
        }
    }
}

function allUnique(check: string[]): boolean {
    for(let x = 0; x < check.length; x++) {
        if(check.lastIndexOf(check[x]) > x) {
            return false;
        }
    }
    return true;
}

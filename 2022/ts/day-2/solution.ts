import {readFileSync} from "fs";

function partOne() {
    const text = readFileSync(__dirname + '/input.txt', 'utf-8');

    const scoreMap: {[key: string]: number} = {
        "A X": 3 + 1, // Draw
        "A Y" : 6 + 2, // Win
        "A Z" : 0 + 3, // Loss
        "B X" : 0 + 1, // Loss
        "B Y" : 3 + 2, // Draw
        "B Z" : 6 + 3, // Win
        "C X" : 6 + 1, // Win
        "C Y" : 0 + 2, // Loss
        "C Z" : 3 + 3 // Draw
    }

    const total =
        Object
            .keys(scoreMap)
            .reduce(
                (result, key) => {
                    const pattern = new RegExp(key, "g")
                    const count = text.match(pattern).length ?? 0;
                    return result + (count * scoreMap[key])
                },
            0);

    return total
}
 function partTwo() {
     const text = readFileSync(__dirname + '/input.txt', 'utf-8');

     const moveMap = {
         "X" : {"A" : 3, "B" : 1, "C" : 2, value: 0 }, // Loss,
         "Y" : {"A" : 1, "B": 2, "C" : 3, value : 3}, // Draw
         "Z" : {"A" : 2, "B": 3, "C": 1, value: 6 } // Win
      } as const

     const score = text.split('\n')
         .filter(round => !!round)
         .reduce((result, round) => {
             const [move, outcome] = round.split(" ")
             return result + moveMap[outcome][move] + moveMap[outcome].value
         }, 0);

     return score;
 }

console.log(
    partOne(),
    partTwo()
);






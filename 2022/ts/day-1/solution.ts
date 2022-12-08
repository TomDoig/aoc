import * as fs from 'fs';

const loadData = () => {
    return fs.readFileSync('input.txt', 'utf-8');
}

const main = () => {
    const lines = loadData().split('\n')

    let currentElf = 0;
    let elfTotals: {[key: number] : number} = {};

    for(var l = 0; l < lines.length; l++) {
        if(lines[l] === '') {
            currentElf++;
            continue;
        }

        elfTotals[currentElf] = (elfTotals[currentElf] ?? 0) + parseInt(lines[l]);
    }

    const orderedTotals: ReadonlyArray<number> = Object.values(elfTotals).sort().reverse();

    console.log(
        orderedTotals[0] ?? null,
        orderedTotals.slice(0,3),
        orderedTotals.slice(0,3).reduce((result, current) => result + current, 0)
    );
}

main();
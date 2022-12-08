import {readFileSync} from "fs";

const partOne = () => {
    const data = getData();
    const grid: boolean[][] = [];

    for (var y = 0; y < data.length; y++) {
        grid[y] = checkSequence(data[y])
    }

    for (var x = 0; x <= data[0].length; x++) {
        let columnVisibility = checkSequence(data.map(r => r[x]))

        for (let y = 0; y < data.length; y++) {
            grid[y][x] ||= columnVisibility[y];
        }
    }

    const countVisible = grid
        .reduce((result, row) => [...result, ...row])
        .filter(v => v)
        .length;

    return [countVisible];
}

const partTwo = () => {
    const data = getData();
    const width = data[0].length;
    const height = data.length;
    let maxScenicScore = 0;

    const col = (x: number) => {
        return data.map(y => y[x]);
    }

    for (var y = 1; y < height - 1; y++) {
        for(var x = 1; x < width - 1; x++) {
            const currentHeight = data[y][x];
            const findBlockingTrees = h => h >= currentHeight

            const scores = {
                top: col(x).slice(0, y).reverse(),
                left: data[y].slice(0,x).reverse(),
                bottom: col(x).slice(y + 1, height),
                right: data[y].slice(x + 1, width)
            };

            const scenicScore = Object.values(scores)
                .map(a => {
                    const index = a.findIndex(findBlockingTrees);
                    return index > -1 ? index + 1 : a.length
                })
                .reduce((result, value) => result * value, 1)

            if(scenicScore > maxScenicScore) {
                maxScenicScore = scenicScore;
                console.log("New max scenic score at", x, y);
            }
        }
    }

   return maxScenicScore;
}

const checkSequence = (input: number[]): boolean[] => {
    let maxL = -1, maxT = -1;
    let results: boolean[] = []

    for (let i = 0; i < input.length; i++) {
        if (input[i] > maxL) {
            results[i] = true
            maxL = input[i]
            continue;
        }

        results[i] = false
    }

    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i] > maxT) {
            results[i] = true;
            maxT = input[i]
        }
    }

    return results;
}

function getData(): number[][] {
    const data = readFileSync(__dirname + '/input.txt', 'utf-8')
        .split("\n")
        .filter(l => !!l)
        .map(s => {
            return s.split('').map(Number)
        });

    return data;
}

console.log(partOne());
console.log(partTwo());

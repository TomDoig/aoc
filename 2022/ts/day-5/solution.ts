import {readFileSync} from "fs";

type Stack = string[][]
type Instruction = [number, number, number]

const partOne = () => {
    const stack = executeInstructions((stack, [move, from, to]) => {
        for(let m = 0; m < move; m++) {
            stack[to - 1].push(stack[from - 1].pop())
        }
    })

    return getTopValues(stack).join('');
}

const partTwo = () => {
    const stack = executeInstructions((stack, [move, from, to]) => {
        const movePile = [];
        for(let m = 0; m < move; m++) {
            movePile.push(stack[from - 1].pop())
        }

        stack[to -1].push(...movePile.reverse())
    })

    return getTopValues(stack).join('');
}

console.log(partOne());
console.log(partTwo());

function parseStackData(data: string): Stack {
    let rows = data.split("\n");

    const stack = rows.pop().split('  ').map(c => [] as string[])

    rows = rows.filter(r => !!r).reverse()
    for(let x = 0; x < rows.length; x++) {
        for(let y = 0; y < stack.length; y++) {
            const target = (y * 4) + 1
            const value = rows[x].substring(target, target + 1)

            if(value !== " ") {
                stack[y].push(value)
            }
        }
    }
    return stack;
}

function parseInstructionsData(data: string): Instruction[]
{
    const exp = new RegExp(/move ([\d]+) from ([\d]+) to ([\d]+)/ig)

    return data.split("\n")
        .map(i => {
            exp.lastIndex = 0
            return exp.exec(i).slice(1,4).map(Number) as Instruction
        })
}

function executeInstructions(fn: (stack: Stack, instruction: Instruction) => void) {
    const input = readFileSync(__dirname + '/input.txt', 'utf-8');
    const [stackData, instructionsData] = input.split("\n\n")

    const stack = parseStackData(stackData);
    const instructions = parseInstructionsData(instructionsData)

    instructions.forEach(i => fn(stack, i))

    return stack;
}

function getTopValues(stack: Stack): string[]
{
    return stack.map(c => c[c.length - 1]);
}

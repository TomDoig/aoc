import {readFileSync} from "fs";

type SizeRegistry = {[key:string]: number}

type BaseNode = {
    parent?: DirectoryNode
    size: number;
    name: string;
}

type DirectoryNode = BaseNode & {
    type: "directory"
    path: string
    children: { [key: string] : TreeNode}
}

type FileNode = BaseNode & {
    type: "file"
}

type TreeNode = DirectoryNode | FileNode;

const partOne = () => {
    const [tree, sizeRegistry] = parseTree(getInstructions());

    return Object.values(sizeRegistry)
        .filter(v => v <= 100000)
        .reduce((r,v) => r += v, 0)
}

const partTwo = () => {
    const [tree, sizeRegistry] = parseTree(getInstructions());

    const usedSpace = sizeRegistry["/"];
    const availableSpace = 70_000_000 - usedSpace;
    const requiredSpace = 30_000_000 - availableSpace

    const smallDirectories = [...Object.values(sizeRegistry)]
        .filter(v => Number(v) >= requiredSpace)
        .sort((a, b) => a - b)

    return smallDirectories[0]
}

console.log(partOne()); // 1844187
console.log(partTwo()); // 4978279

function parseTreeV2(instructions: string[]): SizeRegistry
{
    let sizeRegistry: SizeRegistry = {
        "/" : 0
    }

    for(let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i].split(' ');
        const currentPath = "/";

        switch(true) {
            case instruction[0] == "$":
                if(instruction[1] == "cd") {
                    if(instruction[2] === "/") {

                    }

                        }


                break;
            case instruction[0] == "dir":
                // register Directory
                break;
            default:
                // Assume file, add file size to all parents in curren path.
        }
    }

    return sizeRegistry;
}

function parseTree(instructions: string[]): [DirectoryNode, SizeRegistry] {
    const root: DirectoryNode = {
        type : "directory",
        name: "_root",
        path: "/",
        children: {},
        size: 0
    }

    let cwd = root;
    let sizeRegistry: SizeRegistry = {}

    const registerDirectory = (parent: DirectoryNode, name: string) => {
        const dir = {
            type: "directory",
            name: name,
            size: 0,
            children: {},
            path: cwd.path + name + "/",
            parent: cwd
        } as DirectoryNode

        cwd.children[name] = dir;
        sizeRegistry[dir.path] = 0;
    }

    function registerFile(parent: DirectoryNode, name: string, size: number)
    {
        parent.children[name] = {
            type: "file",
            name: name,
            size: size
        }

        adjustDirectorySize(parent, size);
    }

    const adjustDirectorySize = (directory: DirectoryNode, size: number) => {
        directory.size += size;
        sizeRegistry[directory.path] = directory.size;

        //Recursively move up the tree to update all ancestors.
        directory.parent && adjustDirectorySize(directory.parent, size);
    }

    for(let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];

        let cmd = instruction.match(/^\$ cd[ ]?(.*)/);
        if(cmd) {
            if(cmd[1] === "/") {
                cwd = root
                continue;
            }

            if(cmd[1] === "..") {
                cwd = cwd.parent || root;
                continue;
            }

            cwd = cwd.children[cmd[1]] as DirectoryNode
            continue;
        }

        let node = instruction.match(/^(dir|\d+) (.+)/);
        if(node) {
            if(node[1] === "dir") {
                registerDirectory(cwd, node[2])
            } else {
                registerFile(cwd, node[2], Number(node[1]))
            }
        }

    }

    return [root, sizeRegistry];
}

function getInstructions(): string[] {
    return readFileSync(__dirname + '/input.txt', 'utf-8')
        .split('\n')
        .filter(l => !!l);
}
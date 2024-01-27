import fs from "fs";

const citasFile = "./citas.json";

export function read() {
    return fs.readFileSync(citasFile, { encoding: 'utf8', flag: 'r' });
}

export function write(content: string) {
    fs.writeFileSync(citasFile, content,  { encoding: 'utf8', flag: 'w' })
}
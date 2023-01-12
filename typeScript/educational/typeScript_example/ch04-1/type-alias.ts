//type stringNumberFunc = (string, number?) => void
type stringNumberFunc = (arg0: string, arg1?: number) => void
let f: stringNumberFunc = function (a: string, b?: number): void {}
let g: stringNumberFunc = function (c: string, d?: number): void {}

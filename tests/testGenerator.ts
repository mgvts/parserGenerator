function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

const digit: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const oper: string[] = ["+", "-", "*", "/"]
const getDigit = (): number => {
    return digit[getRandomInt(10)] ?? 1
}
/**
 * @return random number contains {@param max} digits
 */
const getNumber = (max = 5): number => +(Array.from({length: max}, getDigit).join(''))
/**
 * @return random operation from {@code oper}
 */
const getOper = () => oper[getRandomInt(4)]
const generateString = (numberOper: number, maxNumber: number = 5) => {
    let s = getNumber(maxNumber) + ""
    for (let i = 0; i < numberOper; i++) {
        s += getOper()
        s += getNumber(maxNumber)
    }
    return s
}
const getBrackets = (s: string) => '(' + s + ")"
const getRandomBrackets = (numberOper: number, maxNumber: number = 5) =>  {
    const s = generateString(numberOper, maxNumber)
    return getRandomInt(10) < 7 ? s : getBrackets(s)
}
export function generateListString(lenght: number, numberOperEach: number, maxNumberLength: number = 5): string[] {
    let s: string[] = new Array<string>()
    for (let i = 0; i < lenght; i++) {
        s.push(generateString(numberOperEach, maxNumberLength))
    }
    return s
}

export function generateListStringWithBrackets(lenght: number,
                                               numberOperEach: number,
                                               maxNumberLength: number = 5): string[] {
    let s: string[] = new Array<string>()
    for (let i = 0; i < lenght; i++) {
        s.push(getRandomBrackets(numberOperEach, maxNumberLength))
    }
    return s
}

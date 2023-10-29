/**
 * Takes in any number and return an array containing
 * all of the numbers between one and that number.
 *
 * The number passed in cannot be less than one. This will
 * result in an empty array being returned.
 */
export function generateNumberArray(num: number) {
    if (num < 1) return [];

    const result = [];

    for (let i = 1; i <= num; i++) {
        result.push(i);
    }

    return result;
}

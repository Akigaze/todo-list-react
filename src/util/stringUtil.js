export const firstLetterUpper = (word) => {
    const first = word[0].toUpperCase();
    const rest = word.slice(1).toLowerCase();
    return `${first}${rest}`;
}

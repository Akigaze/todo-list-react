export const toBool = (param) => {
    return Boolean(param && param !== "false").valueOf();
};
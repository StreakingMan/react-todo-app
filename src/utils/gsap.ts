export const classSelector: (className: string) => string = (className) => {
    return `.${className}`;
};
export const idSelector: (id: string) => string = (id) => {
    return `#${id}`;
};

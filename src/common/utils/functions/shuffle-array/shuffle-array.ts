export const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //get random index
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // swap elements
    }
    return newArray;
};

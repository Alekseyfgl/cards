export const truncateText = (text: string, maxLength: number) => {
    if (maxLength <= 0 || text.length <= maxLength) return text;

    let truncatedText: string = text.substring(0, maxLength);
    const lastSpaceIndex: number = truncatedText.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
        // cut text by last gap, that not to break the word
        truncatedText = truncatedText.substring(0, lastSpaceIndex);
    }

    return truncatedText + '...';
};
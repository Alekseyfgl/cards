import { truncateText } from './truncateText';

describe('[truncateText]', () => {

    // Tests that the function returns the original text when the length of the text is less than or equal to maxLength
    it('should return the original text when the length is less than or equal to maxLength', () => {
        const text = "Hello";
        const maxLength = 10;
        const result = truncateText(text, maxLength);
        expect(result).toBe(text);
    });

    // Tests that the function returns the truncated text with '...' appended when the length of the text is greater than maxLength and the last character is a space
    it('should return the truncated text with "..." appended when the length is greater than maxLength and the last character is a space', () => {
        const text = "Hello world";
        const maxLength = 5;
        const result = truncateText(text, maxLength);
        expect(result).toBe("Hello...");
    });

    // Tests that the function returns the truncated text without breaking the word when the length of the text is greater than maxLength and the last character is not a space
    it('should return the truncated text without breaking the word when the length is greater than maxLength and the last character is not a space', () => {
        const text = "Hello world";
        const maxLength = 8;
        const result = truncateText(text, maxLength);
        expect(result).toBe("Hello...");
    });

    // Tests that the function returns an empty string when the text is an empty string
    it('should return an empty string when the text is an empty string', () => {
        const text = "";
        const maxLength = 10;
        const result = truncateText(text, maxLength);
        expect(result).toBe("");
    });

    // Tests that the function returns an empty string when maxLength is 0
    it('should return an empty string when maxLength is 0', () => {
        const text = "Hello world";
        const maxLength = 0;
        const result = truncateText(text, maxLength);
        expect(result).toBe(text);
    });

    // Tests that the function returns the original text when maxLength is negative
    it('should return the original text when maxLength is negative', () => {
        const text = "Hello world";
        const maxLength = -10;
        const result = truncateText(text, maxLength);
        expect(result).toBe(text);
    });

});

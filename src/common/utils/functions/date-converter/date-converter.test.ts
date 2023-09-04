import { formatISODate } from './date-converter';

describe('formatISODate', () => {

    // Tests that the function returns a formatted date string for a valid ISO date input
    it('should return a formatted date string for a valid ISO date input', () => {
        const isoDate = '2022-01-01T00:00:00.000Z';
        const result = formatISODate(isoDate);
        expect(result).toBe('01 January 2022');
    });

    // Tests that the function handles different valid ISO date formats
    it('should handle different valid ISO date formats', () => {
        const isoDate1 = '2022-01-01T00:00:00.000Z';
        const isoDate2 = '2022-01-01';
        const isoDate3 = '2022-01-01T00:00:00';
        const result1 = formatISODate(isoDate1);
        const result2 = formatISODate(isoDate2);
        const result3 = formatISODate(isoDate3);
        expect(result1).toBe('01 January 2022');
        expect(result2).toBe('01 January 2022');
        expect(result3).toBe('01 January 2022');
    });

    // Tests that the function handles different timezones for ISO date input
    it('should handle different timezones for ISO date input', () => {
        const isoDate1 = '2022-01-01T00:00:00.000Z';
        const isoDate2 = '2022-01-01T00:00:00.000-05:00';
        const result1 = formatISODate(isoDate1);
        const result2 = formatISODate(isoDate2);
        expect(result1).toBe('01 January 2022');
        expect(result2).toBe('01 January 2022');
    });

    // Tests that the function returns an error message for an invalid ISO date input
    it('should return an error message for an invalid ISO date input', () => {
        const isoDate = '2022-01-01T00:00:00.000X';
        const result = formatISODate(isoDate);
        expect(result).toBe('This date is wrong!');
    });

    // Tests that the function handles an empty string input
    it('should handle an empty string input', () => {
        const isoDate = '';
        const result = formatISODate(isoDate);
        expect(result).toBe('This date is wrong!');
    });

    // Tests that the function handles a null input
    it('should handle a null input', () => {
        const isoDate = 'null';
        const result = formatISODate(isoDate);
        expect(result).toBe('This date is wrong!');
    });

});

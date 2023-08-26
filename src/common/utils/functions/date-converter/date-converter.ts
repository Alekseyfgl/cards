import { DateTime } from 'luxon';


export const formatISODate = (isoDate: string) => {
    if (!DateTime.fromISO(isoDate).isValid) return 'This date is wrong!'
    const date: DateTime = DateTime.fromISO(isoDate);
    return date.toFormat('dd MMMM yyyy, HH:mm:ss');
};
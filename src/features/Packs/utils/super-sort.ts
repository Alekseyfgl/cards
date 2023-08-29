import { SortTypes } from '../../../common/utils/optionalTypes/sort.types';

/**
 * change sort with direction(asc|desc)
 * @param sortByName - criteria for sorts
 * @param currentSort - current sort with direction 0 | 1
 */
export const superSortCreator = <SortByType extends string, CurrentRequestType extends string>(
    sortByName: SortByType,
    currentSort: CurrentRequestType
): `1${SortByType}` | `0${SortByType}` => {
    const direction = currentSort[0] as SortByType;
    return direction === '0' ? `${1}${sortByName}` : `${0}${sortByName}`;
};

/**
 * return type sorting asc| desc
 * @param currentSort
 */
export const getDirectionSort = (currentSort: string): 'asc' | 'desc' => {
    const direction = currentSort[0] as SortTypes;
    return direction === '0' ? 'asc' : 'desc';
};

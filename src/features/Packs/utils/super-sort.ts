import {PackSortRequestTypes, PackSortTypes} from "../packs.interfaces";


/**
 * change sort with direction(asc|desc)
 * @param criterion - criteria for sorts
 * @param currentSort - current sort with direction 0 | 1
 */
export const superSortCreator = (criterion: PackSortTypes, currentSort: PackSortRequestTypes): PackSortRequestTypes => {
    const direction = currentSort[0] as "0" | "1";
    return direction === "0" ? `${1}${criterion}` : `${0}${criterion}`;
};


/**
 * return type sorting asc| desc
 * @param currentSort
 */
export const getDirectionSort = (currentSort: PackSortRequestTypes): "asc" | "desc" => {
    const direction = currentSort[0] as "0" | "1";
    return direction === "0" ? "asc" : "desc";
};


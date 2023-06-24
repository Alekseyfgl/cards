import {PackSortRequestTypes, PackSortTypes} from "../packs.interfaces";


/**
 * change sort with direction(asc|desc)
 * @param newCriterionSort - criteria for sorts
 * @param currentSort - current sort with direction 0 | 1
 */
export const superSortCreator = (newCriterionSort: PackSortTypes, currentSort: PackSortRequestTypes): PackSortRequestTypes => {
    const direction = currentSort[0] as "0" | "1";

    
    if (currentSort === '') {
        return `${0}${newCriterionSort}`
    } else if (direction === '0') {
        return `${1}${newCriterionSort}`
    } else if (direction === '1') {
        return ''
    } else {
        return ''
    }
    // return direction === "0" ? `${1}${newCriterionSort}` : `${0}${newCriterionSort}`;
};


/**
 * return type sorting asc| desc
 * @param currentSort
 */
export const getDirectionSort = (currentSort: PackSortRequestTypes): "asc" | "desc" => {
    const direction = currentSort[0] as "0" | "1";
    return direction === "0" ? "asc" : "desc";
};


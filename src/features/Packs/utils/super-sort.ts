import {PackSortRequestTypes, PackSortTypes} from "../packs.interfaces";


export const superSortCreator = (criterion: PackSortTypes, currentSort: PackSortRequestTypes): PackSortRequestTypes => {
    const direction = currentSort[0] as "0" | "1";
    return direction === "0" ? `${1}${criterion}` : `${0}${criterion}`;
};

export const getDirectionSort = (currentSort: PackSortRequestTypes): "asc" | "desc" => {
    const direction = currentSort[0] as "0" | "1";
    return direction === "0" ? "asc" : "desc";
};


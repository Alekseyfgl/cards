import {PackSortRequestTypes, PackSortTypes} from "../../packs.interfaces";
import {superSortCreator} from "../super-sort";

export const createPackQuery = (page: number, pageCount: number, sortPacks: PackSortRequestTypes) => {
    return {
        page: page.toString(),
        pageCount: pageCount.toString(),
        sortPacks: superSortCreator(sortPacks.slice(1) as PackSortTypes, sortPacks)
    }
}
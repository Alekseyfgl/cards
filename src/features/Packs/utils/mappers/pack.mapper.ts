import { IPack, PackSortRequestTypes, PacksRow } from '../../packs.interfaces';
import { buttonRowConst } from '../constans/button-row.const';

export const createPackQuery = (page: number, pageCount: number, sortPacks: PackSortRequestTypes) => ({
    page: page.toString(),
    pageCount: pageCount.toString(),
    sortPacks: sortPacks
});

export const createRowPack = (packs: IPack[]): PacksRow[] => {
    return packs.map((p) => ({
        _id: p._id,
        name: p.name,
        cards: p.cardsCount,
        created: p.created,
        updated: p.updated,
        actions: buttonRowConst
    }));
};
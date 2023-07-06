import { IPack, PackSortRequestTypes, PacksRow } from '../../packs.interfaces';
import { buttonRowConst } from '../constans/button-row.const';

export const createPackQuery = (
    page: number,
    pageCount: number,
    sortPacks: PackSortRequestTypes,
    packName: string = '',
    user_id: string = '',
    amountCards?: number[]
) => {
    return {
        page: page.toString(),
        pageCount: pageCount.toString(),
        sortPacks: sortPacks,
        packName: packName,
        user_id: user_id,
        min: amountCards ? amountCards[0].toString() : '1',
        max: amountCards ? amountCards[1].toString() : '100',
    };
};

export const createRowPack = (packs: IPack[]): PacksRow[] => {
    return packs.map((p) => ({
        _id: p._id,
        name: p.name,
        cards: p.cardsCount,
        created: p.created,
        updated: p.updated,
        actions: buttonRowConst,
    }));
};

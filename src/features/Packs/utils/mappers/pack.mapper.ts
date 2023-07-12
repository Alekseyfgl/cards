import { IPack, PackSortRequestTypes, PacksRow } from '../../packs.interfaces';
import { buttonRowConst } from '../constans/button-row.const';

export const createPackQuery = (
    page: string = '1',
    pageCount: string = '5',
    sortPacks: PackSortRequestTypes = '0name',
    packName: string = '',
    user_id: string = '',
    amountCards?: number[]
) => {
    return {
        page,
        pageCount,
        sortPacks,
        packName,
        user_id,
        min: amountCards ? amountCards[0].toString() : '1',
        max: amountCards ? amountCards[1].toString() : '100'
    };
};

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

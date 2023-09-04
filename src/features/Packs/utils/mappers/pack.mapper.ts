import { IAddPack, IChangePack, IPack, PackSortRequestTypes, PacksRow } from '../../packs.interfaces';
import { buttonRowConst } from '../constans/button-row.const';
import { AddPackFormValues } from '../../Modals/AddPackModal/AddPackModal';
import { ChangePackFormValues } from '../../Modals/ChangePackModal/ChangePackModal';
import { formatISODate } from '../../../../common/utils/functions/date-converter/date-converter';

export const createPackQuery = (
    page: string = '1',
    pageCount: string = '5',
    sortPacks: PackSortRequestTypes = '0created',
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
        min: amountCards ? amountCards[0].toString() : '0',
        max: amountCards ? amountCards[1].toString() : '100',
    };
};

export const createRowPack = (packs: IPack[]): PacksRow[] => {
    return packs.map((p) => ({
        _id: p._id,
        name: p.name,
        cards: p.cardsCount,
        created: formatISODate(p.created),
        updated: formatISODate(p.updated),
        actions: buttonRowConst,
        user_id: p.user_id,
        private: p.private,
    }));
};

export const addPackMapper = (dto: AddPackFormValues): IAddPack => {
    return { cardsPack: { name: dto.name, deckCover: 'url or base64', private: dto.private } };
};

export const changePackMapper = (dto: ChangePackFormValues): IChangePack => {
    return { cardsPack: { ...dto } };
};

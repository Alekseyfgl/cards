import { Nullable } from '../../common/utils/optionalTypes/optional.types';
import { instance } from '../../common/api/common.api';
import { ICardQuery, ICardsByPack } from './cards.interfaces';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const cardsApi = {
    getAllCardsByPack: (query: ICardQuery) => {
        //cancel request
        if (abortController) abortController.abort();
        abortController = new AbortController();

        return instance.get<ICardsByPack>(`${base}/card`, { params: query });
    },
};

import { Nullable } from '../../common/utils/optionalTypes/optional.types';
import { instance } from '../../common/api/common.api';
import { CardQueryTypes, ICardsByPack } from './cards.interfaces';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const cardsApi = {
    getAllCardsByPack: (query: CardQueryTypes) => {
        return instance.get<ICardsByPack>(`${base}/card`, { params: query });
    },
};

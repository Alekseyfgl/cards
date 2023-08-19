import { Nullable } from '../../common/utils/optionalTypes/optional.types';
import { instance } from '../../common/api/common.api';
import { ICardsByPack } from './cards.interfaces';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const cardsApi = {
    getAllCardsByPack: () => {
        return instance.get<ICardsByPack>(`${base}/card`);
    },
};

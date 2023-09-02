import { Nullable } from '../../common/utils/types/optional.types';
import { instance } from '../../common/api/common.api';
import { ICardDto, ICardQuery, ICardsByPack } from './cards.interfaces';
import { AxiosResponse } from 'axios';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const cardsApi = {
    getAllCardsByPack: (query: ICardQuery) => {
        //cancel request
        if (abortController) abortController.abort();
        abortController = new AbortController();

        return instance.get<ICardsByPack>(`${base}/card`, { params: query });
    },
    addCard: (payload: ICardDto) => {
        //I added unknown, because response from server isn't interesting me, I use getAllCardsByPack
        return instance.post<{}, AxiosResponse<unknown>, ICardDto>(`${base}/pack`, payload);
    },
};

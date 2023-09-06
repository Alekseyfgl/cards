import { Nullable } from '../../common/utils/types/optional.types';
import { instance } from '../../common/api/common.api';
import { AddCardDto, CardQueryTypes, ChangeCardDto, ICardsByPack } from './cards.interfaces';
import { AxiosResponse } from 'axios';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const cardsApi = {
    getAllCardsByPack: (query: CardQueryTypes) => {
        //cancel request
        if (abortController) abortController.abort();
        abortController = new AbortController();

        return instance.get<ICardsByPack>(`${base}/card`, { params: query });
    },
    addCard: (payload: AddCardDto) => {
        //I added unknown, because response from server isn't interesting me, I use getAllCardsByPack
        return instance.post<{}, AxiosResponse<unknown>, AddCardDto>(`${base}/card`, payload);
    },
    removeCard: (params: { id: string }) => {
        return instance.delete<{}, AxiosResponse<unknown>, AddCardDto>(`${base}/card`, { params });
    },
    changeCard: (payload: ChangeCardDto) => {
        return instance.put<{}, AxiosResponse<unknown>, ChangeCardDto>(`${base}/card`, payload);
    },
};

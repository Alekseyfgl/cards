import { instance } from '../../common/api/common.api';
import { IAddPack, ICardsPackRes, IPacks, PackQueryTypes } from './packs.interfaces';
import { Nullable } from '../../common/utils/optionalTypes/optional.types';
import { AxiosResponse } from 'axios';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const packsApi = {
    allPacks: (query: PackQueryTypes) => {
        //cancel request
        if (abortController) abortController.abort();
        abortController = new AbortController();

        return instance.get<IPacks>(`${base}/pack`, { params: query, signal: abortController.signal });
    },
    addPack: (payload: IAddPack) => {
        return instance.post<{}, AxiosResponse<ICardsPackRes>, IAddPack>(`${base}/pack`, payload);
    },
    removePack: (query: { id: string }) => {
        return instance.delete<{}, AxiosResponse<ICardsPackRes>>(`${base}/pack`, { params: query });
    },
};

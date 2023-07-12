import { instance } from '../../common/api/common.api';
import { IPacks, PackQueryTypes } from './packs.interfaces';
import { Nullable } from '../../common/utils/optionalTypes/optional.types';

const base = 'cards';
let abortController: Nullable<AbortController> = null;
export const packsApi = {
    allPacks: (query: PackQueryTypes) => {
        //cancel request
        if (abortController) abortController.abort();
        abortController = new AbortController();

        return instance.get<IPacks>(`${base}/pack`, { params: query, signal: abortController.signal });
    },
};

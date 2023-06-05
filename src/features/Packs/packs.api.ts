import { instance } from '../../common/api/common.api';
import { IPacks } from './packs.interfaces';

const base = 'cards';
export const packsApi = {
    allPacks: () => {
        return instance.get<IPacks>(`${base}/pack`);
    },
};

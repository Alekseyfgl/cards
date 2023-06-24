import {instance} from "../../common/api/common.api";
import {IPacks, PackQueryTypes} from "./packs.interfaces";

const base = "cards";
export const packsApi = {
    allPacks: (query: PackQueryTypes) => {
        return instance.get<IPacks>(`${base}/pack`, {params: query});
    }
};

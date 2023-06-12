import { instance } from "../../common/api/common.api";
import { IPacks } from "./packs.interfaces";

const base = "cards";
export const packsApi = {
  allPacks: (query: any) => {
    return instance.get<IPacks>(`${base}/pack`, { params: query });
  }
};

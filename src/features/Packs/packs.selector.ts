import { RootState } from "../../store/store";
import { Nullable, Optional } from "../../common/utils/optionalTypes/optional.types";
import { IPack, IPacks } from "./packs.interfaces";

export const selectorPacks = (state: RootState): Nullable<IPacks> => state?.packs?.packs;
export const selectorCardPacks = (state: RootState): Optional<IPack[]> => state?.packs?.packs?.cardPacks;
export const selectorPage = (state: RootState): Optional<number> => state?.packs?.packs?.page;
export const selectorCardPacksTotalCount = (state: RootState): Optional<number> => state?.packs?.packs?.cardPacksTotalCount;

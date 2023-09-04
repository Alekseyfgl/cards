import { RootState } from '../../store/store';
import { Nullable, Optional } from '../../common/utils/types/optional.types';
import { IPacks } from './packs.interfaces';
import { createSelector } from '@reduxjs/toolkit';
import { createRowPack } from './utils/mappers/pack.mapper';

export const selectorPacks = (state: RootState): Nullable<IPacks> => state?.packs?.packs;
// export const getPacks = (state: RootState): Optional<IPack[]> => state?.packs?.packs?.cardPacks;

export const selectorCardPacks = createSelector(
    (state: RootState) => state?.packs?.packs?.cardPacks,
    (packs) => (packs ? createRowPack(packs) : [])
);

export const selectorPage = (state: RootState): Optional<number> => state?.packs?.packs?.page;
export const selectorCardPacksTotalCount = (state: RootState): Optional<number> => state?.packs?.packs?.cardPacksTotalCount;

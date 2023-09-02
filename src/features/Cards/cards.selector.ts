import { RootState } from '../../store/store';
import { Nullable, Optional } from '../../common/utils/types/optional.types';
import { ICard } from './cards.interfaces';

export const currentPackTitleSelector = (state: RootState): Optional<string> => state?.cards?.currentPack?.packName;
export const packUserIdSelector = (state: RootState): Optional<string> => state?.cards?.currentPack?.packUserId;
export const cardsByPackSelector = (state: RootState): Nullable<ICard[]> => state.cards.cards;
export const cardsTotalCountSelector = (state: RootState): Optional<number> => state?.cards?.currentPack?.cardsTotalCount;

// export const currentPackIdSelector = (state: RootState): Optional<number> => state?.cards.currentPack.
export const maxGradeSelector = (state: RootState): Optional<number> => state?.cards?.currentPack?.maxGrade;
export const minGradeSelector = (state: RootState): Optional<number> => state?.cards?.currentPack?.minGrade;

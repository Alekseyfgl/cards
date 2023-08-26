import { RootState } from '../../store/store';
import { Nullable, Optional } from '../../common/utils/optionalTypes/optional.types';
import { CurrentPackType, ICard } from './cards.interfaces';

export const currentPackTitleSelector = (state: RootState):  Optional<string> => state?.cards?.currentPack?.packName;
export const packUserIdSelector = (state: RootState):  Optional<string>=> state?.cards?.currentPack?.packUserId;
export const cardsByPackSelector = (state: RootState): Nullable<ICard[]> => state.cards.cards
export const cardsTotalCountSelector = (state: RootState):Optional<number> => state?.cards?.currentPack?.cardsTotalCount

export const maxGradeSelector = (state: RootState):  Optional<number>=> state?.cards?.currentPack?.maxGrade;
export const minGradeSelector = (state: RootState):  Optional<number>=> state?.cards?.currentPack?.minGrade;


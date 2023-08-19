import { RootState } from '../../store/store';
import { IProfile } from './auth.api.interfaces';
import { Nullable, Optional } from '../../common/utils/optionalTypes/optional.types';

export const selectorProfile = (state: RootState): Nullable<IProfile> => state.auth.profile;
export const selectorProfileId = (state: RootState): Optional<string> => state?.auth?.profile?._id;
export const selectorUserName = (state: RootState): Optional<string> => state?.auth?.profile?.name;
export const selectorUserPhoto = (state: RootState): Optional<string> => state?.auth?.profile?.name;

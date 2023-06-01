import { RootState } from '../../store/store';
import { IProfile } from './auth.api.interfaces';
import { Nullable, Optional } from '../../common/utils/optionalTypes/optional.types';

export const selectorIsRegistered = (state: RootState): boolean => state.auth.isRegistered;
export const selectorProfile = (state: RootState): Nullable<IProfile> => state.auth.profile;
export const selectorUserName = (state: RootState): Optional<string> => state?.auth?.profile?.name;
export const selectorUserPhoto = (state: RootState): Optional<string> => state?.auth?.profile?.name;

import { RootState } from '../store/store';
import { Nullable } from '../common/utils/types/optional.types';

export const selectorIsLoadingApp = (state: RootState): boolean => state.app.isLoadingApp;
export const selectorIsAppInit = (state: RootState): boolean => state.app.isAppInit;
export const selectorErrorApp = (state: RootState): Nullable<string> => state.app.error;
export const selectorDoneApp = (state: RootState): Nullable<string> => state.app.done;

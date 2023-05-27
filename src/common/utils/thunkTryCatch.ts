import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AxiosError, isAxiosError } from 'axios';
import { appActions } from '../../app/app.slice';
import { AppDispatch, RootState } from '../../store/store';

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, logic: Function) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        return await logic();
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (isAxiosError(err)) {
            dispatch(appActions.setError({ error: err?.response?.data?.error || err.message }));
        } else {
            dispatch(appActions.setError({ error: `Native error ${err.message}` }));
        }
        return rejectWithValue(null);
    }
};

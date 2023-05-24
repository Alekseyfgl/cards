import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../features/Auth/auth.slice';

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as string | null,
        isLoadingApp: true,
        isAppInit: false
    },
    reducers: {
        setIsLoadingApp: (state, action: PayloadAction<{ isLoadingApp: boolean }>) => {
            // console.log(current(state));
            state.isLoadingApp = action.payload.isLoadingApp;
        },
        initialiseApp: (state, action: PayloadAction<{ isAppInit: boolean }>) => {
            state.isAppInit = action.payload.isAppInit;
        },
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAppInit = true;
        });
    }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

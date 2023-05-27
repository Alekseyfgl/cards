import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, me } from '../features/Auth/auth.slice';

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as string | null,
        isLoadingApp: true,
        isAppInit: false,
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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAppInit = true;
        });
        builder.addCase(me.fulfilled, (state, action) => {
            state.isAppInit = true;
            state.isLoadingApp = false;
        });
        builder.addCase(me.rejected, (state, action) => {
            state.isAppInit = false;
            state.isLoadingApp = false;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAppInit = false;
        });
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as string | null,
        isLoadingApp: true,
        isAppInitialized: false,
    },
    reducers: {
        setIsLoadingApp: (state, action: PayloadAction<{ isLoadingApp: boolean }>) => {
            // console.log(current(state));
            state.isLoadingApp = action.payload.isLoadingApp;
        },
        initialiseApp: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
            state.isAppInitialized = action.payload.isAppInitialized;
        },
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

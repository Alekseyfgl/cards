import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk, thunkTryCatch } from '../../common/utils/thunks';
import { packsApi } from './packs.api';
import { IAddPack, IPacks, PackQueryTypes } from './packs.interfaces';
import { Nullable } from '../../common/utils/optionalTypes/optional.types';

const getAllPacks = createAppAsyncThunk<
    {
        packs: IPacks;
    },
    PackQueryTypes
>('packs/getAllPacks', async (arg: PackQueryTypes, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await packsApi.allPacks(arg);
        return { packs: res.data };
    });
});

const addPack = createAppAsyncThunk<{ packs: IPacks }, { dto: IAddPack; queryParams: PackQueryTypes; signal: AbortSignal }>(
    'packs/addPack',
    async (arg: { dto: IAddPack; queryParams: PackQueryTypes; signal: AbortSignal }, thunkAPI) => {
        const { dispatch, getState, rejectWithValue } = thunkAPI;

        return thunkTryCatch(thunkAPI, async () => {
            await packsApi.addPack(arg.dto, arg.signal);
            const res: { packs: IPacks } = await dispatch(packThunks.getAllPacks(arg.queryParams)).unwrap();
            return { packs: res.packs };
        });
    }
);

const slice = createSlice({
    name: 'packs',
    initialState: {
        packs: null as Nullable<IPacks>,
        isLoadingPacks: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPacks.fulfilled, (state, action) => {
            state.packs = action.payload.packs;
        });
    },
});

export const packReducer = slice.reducer;
export const packActions = slice.actions;
export const packThunks = { getAllPacks, addPack };

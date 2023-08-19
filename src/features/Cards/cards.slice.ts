import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk, thunkTryCatch } from '../../common/utils/thunks';
import { CurrentPackType, ICard } from './cards.interfaces';
import { cardsApi } from './cards.api';
import { Nullable } from '../../common/utils/optionalTypes/optional.types';

const slice = createSlice({
    name: 'card',
    initialState: {
        cards: null as Nullable<ICard[]>,
        currentPack: null as Nullable<CurrentPackType>,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCardsByPack.fulfilled, (state, action) => {
            state.cards = action.payload.cards;
            state.currentPack = action.payload.pack;
        });
    },
});

const getAllCardsByPack = createAppAsyncThunk<
    {
        cards: ICard[];
        pack: CurrentPackType;
    },
    {}
>('card/getAllCardsByPack', async (arg: {}, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await cardsApi.getAllCardsByPack();
        const currentPack = res.data;
        delete currentPack.cards;
        return { cards: res.data.cards, currentPack };
    });
});

export const cardReducer = slice.reducer;
export const cardActions = slice.actions;
export const cardThunks = { getAllCardsByPack };

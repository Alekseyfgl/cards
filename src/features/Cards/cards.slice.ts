import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk, thunkTryCatch } from '../../common/utils/thunks';
import { CurrentPackType, ICard, ICardQuery, ICardsByPackDomain } from './cards.interfaces';
import { cardsApi } from './cards.api';
import { Nullable } from '../../common/utils/optionalTypes/optional.types';
import { getAllCardsMapper } from './utils/mappers/card.mapper';
import { logout } from '../Auth/auth.slice';

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
            state.currentPack = action.payload.currentPack;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.cards = null;
            state.currentPack = null;
        });
    },
});

const getAllCardsByPack = createAppAsyncThunk<ICardsByPackDomain, ICardQuery>('card/getAllCardsByPack', async (arg: ICardQuery, thunkAPI) => {
    return thunkTryCatch(
        thunkAPI,
        async () => {
            const res = await cardsApi.getAllCardsByPack(arg);
            return getAllCardsMapper(res.data);
        },
        false
    );
});

export const cardReducer = slice.reducer;
export const cardActions = slice.actions;
export const cardThunks = { getAllCardsByPack };

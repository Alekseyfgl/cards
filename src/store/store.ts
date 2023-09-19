import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../app/app.slice';
import { authReducer } from '../features/Auth/auth.slice';
import { packReducer } from '../features/Packs/packs.slice';
import { cardReducer } from '../features/Cards/cards.slice';
import { baseApi } from '../services/base-api/base-api';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        packs: packReducer,
        cards: cardReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

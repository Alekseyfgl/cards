import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { appReducer } from "../app/app.slice";
import { authReducer } from "../features/auth/auth.slice";
import logger from 'redux-logger'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

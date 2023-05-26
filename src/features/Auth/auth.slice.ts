import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { ILoginDto, IProfile, IRegisterDto, IUser } from './auth.api.interfaces';
import { createAppAsyncThunk } from '../../common/utils/appAsyncThunk';
import { appActions } from '../../app/app.slice';
import { thunkTryCatch } from '../../common/utils/thunkTryCatch';

const register = createAppAsyncThunk<
    {
        addedUser: IUser;
    },
    IRegisterDto
>('Auth/register', async (arg: IRegisterDto, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.register(arg);
        return { addedUser: res.data.addedUser };
    });
});
//первый параметр то что Thunk возвращает, второй параметр то что принимает
export const login = createAppAsyncThunk<
    {
        profile: IProfile;
    },
    ILoginDto
>('Auth/login', async (arg: ILoginDto, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.login(arg);
        return { profile: res.data };
    });
});

export const me = createAppAsyncThunk<{ profile: IProfile }, {}>('Auth/me', async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.me({});
        return { profile: res.data };
    });
});

export const logout = createAppAsyncThunk<{ info: string }, {}>('Auth/logout', async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.logout({});
        return { profile: res.data };
    });
});

const slice = createSlice({
    name: 'auth',
    initialState: {
        profile: null as IProfile | null,
        isRegistered: false,
    },
    reducers: {
        setIsMadeRegister: (state, action: PayloadAction<{ isRegistered: boolean }>) => {
            state.isRegistered = action.payload.isRegistered;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
            appActions.initialiseApp({ isAppInit: true });
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isRegistered = true;
        });
        builder.addCase(me.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.profile = null;
        });
    },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, me, logout };

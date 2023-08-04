import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { ILoginDto, IProfile, IRegisterDto, IUser } from './auth.api.interfaces';
import { createAppAsyncThunk, thunkTryCatch } from '../../common/utils/thunks';
import { appActions } from '../../app/app.slice';

const register = createAppAsyncThunk<{ addedUser: IUser }, IRegisterDto>('Auth/register', async (arg: IRegisterDto, thunkAPI) => {
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
    return thunkTryCatch(
        thunkAPI,
        async () => {
            const res = await authApi.me({});
            return { profile: res.data };
        },
        //this boolean turn off global errors for this thunk
        //in other cases global errors are enabled by default
        false
    );
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
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
            appActions.initialiseApp({ isAppInit: true });
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

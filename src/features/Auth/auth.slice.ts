import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { ILoginDto, IProfile, IRegisterDto, IUser } from './auth.api.interfaces';
import { createAppAsyncThunk } from '../../store/appAsyncThunk';
import { appActions } from '../../app/app.slice';

const register = createAppAsyncThunk<{ addedUser: IUser }, IRegisterDto>(
    'Auth/register',
    async (arg: IRegisterDto, thunkAPI) => {
        const { dispatch, getState, rejectWithValue } = thunkAPI;
        const res = await authApi.register(arg);
        return { addedUser: res.data.addedUser };
    }
);
//первый параметр то что Thunk возвращает, второй параметр то что принимает
export const login = createAppAsyncThunk<
    {
        profile: IProfile;
    },
    ILoginDto
>('Auth/login', async (arg: ILoginDto, thunkAPI) => {
    const {dispatch, getState, rejectWithValue} = thunkAPI;
    const res = await authApi.login(arg);
    return {profile: res.data};
});

const slice = createSlice({
    name: 'auth',
    initialState: {
        profile: null as IProfile | null,
        isMadeRegister: false,
    },
    reducers: {
        setIsMadeRegister: (state, action: PayloadAction<{ isMadeRegister: boolean }>) => {
            state.isMadeRegister = action.payload.isMadeRegister;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
            appActions.initialiseApp({ isAppInit: true });
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isMadeRegister = true;
        });
    },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };

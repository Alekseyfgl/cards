import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { ILoginDto, IUser, IRegisterDto, IProfile } from './auth.api.interfaces';
import { createAppAsyncThunk } from '../../store/appAsyncThunk';



const register = createAppAsyncThunk<{ addedUser: IUser }, IRegisterDto>(
    'auth/register',
    async (arg: IRegisterDto, thunkAPI) => {
        const { dispatch, getState, rejectWithValue } = thunkAPI;
        const res = await authApi.register(arg);
        return { addedUser: res.data.addedUser };
    }
);
//первый параметр то что Thunk возвращает, второй параметр то что принимает
const login = createAppAsyncThunk<{ profile: IProfile }, ILoginDto>('auth/login', async (arg: ILoginDto, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;

    const res = await authApi.login(arg);
    return { profile: res.data };
});

const slice = createSlice({
    name: 'auth',
    initialState: {
        profile: null as IProfile | null,
        isMadeRegister: false,
    },
    reducers: {
        // setProfile: (state, action: PayloadAction<{ profile: IProfile }>) => {
        //     state.profile = action.payload.profile;
        // },
        setIsMadeRegister: (state, action:PayloadAction<{isMadeRegister: boolean}>) => {
            state.isMadeRegister = action.payload.isMadeRegister
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isMadeRegister = true;
        });
    },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const authThunks = { register, login };

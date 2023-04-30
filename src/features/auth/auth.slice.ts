import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { ILoginDto, IUser, IRegisterDto, IProfile } from './auth.api.interfaces';
import { AppDispatch, RootState } from '../../store/store';
import { createAppAsyncThunk } from '../../store/appAsyncThunk';

// const _register = createAsyncThunk(
//     // 1 - prefix
//     'auth/register',
//     // 2 - callback (условно наша старая санка), в которую:
//     // - первым параметром (arg) мы передаем аргументы необходимые для санки
//     // (если параметров больше чем один упаковываем их в объект)
//     // - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
//     // https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
//     (arg: IRegisterDto, thunkAPI) => {
//         const { dispatch, getState, rejectWithValue } = thunkAPI;
//         authApi.register(arg).then((r) => {
//             console.log(r.data);
//         });
//     }
// );

const register = createAppAsyncThunk<void, IRegisterDto>('auth/register', async (arg: IRegisterDto, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    await authApi.register(arg);
});
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
    },
    reducers: {
        // setProfile: (state, action: PayloadAction<{ profile: IProfile }>) => {
        //     state.profile = action.payload.profile;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
        });
        builder.addCase(register.rejected, (state, action) => {});
    },
});

export const authReducer = slice.reducer;
// export const authActions = slice.actions;

export const authThunks = { register, login };




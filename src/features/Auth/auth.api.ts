import { instance } from '../../common/api/common.api';
import { AxiosResponse } from 'axios';
import { ILoginDto, IProfile, IRegisterDto, IRegisterRes } from './auth.api.interfaces';

const base = 'auth';
export const authApi = {
    register: (payload: IRegisterDto) => {
        return instance.post<{}, AxiosResponse<IRegisterRes>, IRegisterDto>(`${base}/register`, payload);
    },
    login: (payload: ILoginDto) => {
        return instance.post<{}, AxiosResponse<IProfile>, ILoginDto>(`${base}/login`, payload);
    },
    me: (payload: {}) => {
        return instance.post<{}, AxiosResponse<IProfile>, {}>(`${base}/me`, payload);
    },
    logout: (payload: {}) => {
        return instance.delete<{}, AxiosResponse<{ info: string }>, {}>(`${base}/me`, payload);
    },
};

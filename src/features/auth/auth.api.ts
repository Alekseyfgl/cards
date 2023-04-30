import { instance } from '../../common/api/common.api';
import { AxiosResponse } from 'axios';
import { ILoginDto, IRegisterDto, IRegisterRes, IProfile } from './auth.api.interfaces';

const base = 'auth' as const;

export const authApi = {
    register: (payload: IRegisterDto) => {
        return instance.post<{}, AxiosResponse<IRegisterRes>, IRegisterDto>(`${base}/register`, payload);
    },
    login: (payload: ILoginDto) => {
        return instance.post<{}, AxiosResponse<IProfile>, ILoginDto>(`${base}/login`, payload);
    },
};

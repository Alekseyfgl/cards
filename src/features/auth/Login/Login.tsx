import { ILoginDto } from '../auth.api.interfaces';
import { useAppDispatch } from '../../../app/hooks';
import { authThunks } from '../auth.slice';
import s from './styles.module.css';

export const Login = () => {
    const dispatch = useAppDispatch();

    const loginHandler = () => {
        const mockDto: ILoginDto = {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            rememberMe: true,
        };

        dispatch(authThunks.login(mockDto));
    };

    return (
        <div className={s.container}>
            <h1>Login</h1>
            <button onClick={loginHandler}>Login</button>
        </div>
    );
};

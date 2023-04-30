import { useAppDispatch } from '../../../app/hooks';
import { IRegisterDto } from '../auth.api.interfaces';
import s from './styles.module.css';
import { authThunks } from '../auth.slice';

export const Register = () => {
    const dispatch = useAppDispatch();

    const registerHandler = () => {
        const mockDto: IRegisterDto = {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
        };

        dispatch(authThunks.register(mockDto));
    };

    return (
        <div className={s.container}>
            <h1>Register</h1>
            <button onClick={registerHandler}>Register</button>
        </div>
    );
};

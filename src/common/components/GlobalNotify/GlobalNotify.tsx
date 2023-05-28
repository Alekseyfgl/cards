import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { appActions } from '../../../app/app.slice';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { Nullable } from '../../utils/optionalTypes/optional.types';

export const GlobalNotify = () => {
    const dispatch = useAppDispatch();
    const error: Nullable<string> = useAppSelector((state) => state.app.error);
    const done: Nullable<string> = useAppSelector((state) => state.app.done);

    if (error !== null) toast.error(error);
    if (done !== null) toast.success(done);

    // Данный код необходим для того, чтобы занулять ошибку в стейте
    // после того как ошибка установилась.
    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                dispatch(appActions.setError({ error: null }));
            }, 1000);
        }

        if (done !== null) {
            setTimeout(() => {
                dispatch(appActions.setDone({ done: null }));
            }, 1000);
        }
    }, [error, done]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    );
};

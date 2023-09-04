import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { selectorIsAppInit } from '../../../app/app.selector';

interface IRequireAuthProps {
    allowedRoles?: 'ADMIN' | 'USER' | 'MODERATOR';
    children: any;
}

export const RequireAuth: FC<IRequireAuthProps> = (props) => {
    const { allowedRoles, children } = props;

    const isAppInit: boolean = useAppSelector(selectorIsAppInit);
    const location = useLocation();

    return isAppInit ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

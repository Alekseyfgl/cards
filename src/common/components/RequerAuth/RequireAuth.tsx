import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { selectorIsAppInit } from '../../../app/app.selector';
import { Layout } from '../Layout/Layout';

interface IRequireAuthProps {
    allowedRoles?: 'ADMIN' | 'USER' | 'MODERATOR';
    children: any;
}

export const RequireAuth = () => {
    const isAppInit: boolean = useAppSelector(selectorIsAppInit);
    const location = useLocation();

    return isAppInit ? <Layout /> : <Navigate to="/login" state={{ from: location }} replace />;
};

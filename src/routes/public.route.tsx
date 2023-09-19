import { Navigate, NavLink, RouteObject } from 'react-router-dom';
import { Layout } from '../common/components/Layout/Layout';
import { Login } from '../features/Auth/Login/Login';
import { Register } from '../features/Auth/Register/Register';

export const publicRoutes: RouteObject[] = [
    {
        path: '/login',
        element: (
            <Layout>
                <Login />
            </Layout>
        ),
    },
    {
        path: '/register',
        element: (
            <Layout>
                <Register />
            </Layout>
        ),
    },
    {
        path: '*',
        element: <Navigate to={'/404'} />,
    },
    {
        path: '/404',
        element: (
            <div>
                <p>Not found</p>
                <NavLink to={'/packs'}>Go to the main age</NavLink>
            </div>
        ),
    },
];

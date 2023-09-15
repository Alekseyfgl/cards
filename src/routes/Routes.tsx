import { createBrowserRouter, Navigate, NavLink, RouteObject, RouterProvider } from 'react-router-dom';
import { Login } from '../features/Auth/Login/Login';
import { Register } from '../features/Auth/Register/Register';
import { ListPacks } from '../features/Packs/ListPacks/ListPacks';
import { CardsList } from '../features/Cards/Card/CardsList';
import { LearnMode } from '../features/LearnMode/LearnMode/LearnMode';
import { RequireAuth } from '../common/components/RequerAuth/RequireAuth';
import { Layout } from '../common/components/Layout/Layout';

const publicRoutes: RouteObject[] = [
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

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to={'/packs'} />,
    },
    {
        path: '/packs',
        element: <ListPacks />,
    },
    {
        path: '/card/:id',
        element: <CardsList />,
    },
    {
        path: '/packs/learn/:id',
        element: <LearnMode />,
    },
];

const router = createBrowserRouter([
    {
        element: <RequireAuth />,
        children: privateRoutes,
    },
    ...publicRoutes,
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};

import { createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from '../common/components/RequerAuth/RequireAuth';
import { privateRoutes } from './privat.route';
import { publicRoutes } from './public.route';

export const router = createBrowserRouter([
    {
        element: <RequireAuth />,
        children: privateRoutes,
    },
    ...publicRoutes,
]);

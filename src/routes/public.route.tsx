import { Navigate, NavLink, RouteObject } from 'react-router-dom';
import { Layout } from '../common/components/Layout/Layout';
import { Register } from '../features/Auth/Register/Register';
import { Login } from '../features/Auth/Login/Login';

export const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: '*',
                element: <Navigate to={'/404'} />,
            },
            {
                path: '404',
                element: (
                    <div>
                        <p>Not found</p>
                        <NavLink to={'/packs'}>Go to the main age</NavLink>
                    </div>
                ),
            },
        ],
    },
];

// export const publicRoutes: RouteObject[] = [
//     {
//         path: '/login',
//         element: (
//             <Layout>
//                 <Login />
//             </Layout>
//         ),
//     },
//     {
//         path: '/register',
//         element: (
//             <Layout>
//                 <Register />
//             </Layout>
//         ),
//     },
//     {
//         path: '*',
//         element: <Navigate to={'/404'} />,
//     },
//     {
//         path: '/404',
//         element: (
//             <div>
//                 <p>Not found</p>
//                 <NavLink to={'/packs'}>Go to the main age</NavLink>
//             </div>
//         ),
//     },
// ];

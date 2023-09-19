import { RouterProvider } from 'react-router-dom';
import { router } from './common.route';

export const Router = () => {
    return <RouterProvider router={router} />;
};

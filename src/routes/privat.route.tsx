import { Navigate, RouteObject } from 'react-router-dom';
import { ListPacks } from '../features/Packs/ListPacks/ListPacks';
import { CardsList } from '../features/Cards/Card/CardsList';
import { LearnMode } from '../features/LearnMode/LearnMode/LearnMode';

export const privateRoutes: RouteObject[] = [
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

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Register } from './features/auth/Register/Register';
import { Login } from './features/auth/Login/Login';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello world</div>,
    },
    {
        path: '*',
        element: <div>Not found</div>,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/cards',
        element: <div>Cards</div>,
    },
]);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

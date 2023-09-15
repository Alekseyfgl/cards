import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app/App';

import { store } from './store/store';

import './common/styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
    // <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    // </BrowserRouter>
);

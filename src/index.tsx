import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client';
import { App } from './app/App';

import './common/styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
);

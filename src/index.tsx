import React from 'react';
import 'leaflet/dist/leaflet.css';
import * as ReactDOMClient from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store';

import App from './components/app/app';

import HistoryRouter from './components/history-route/history-route';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browse-history/browse-history';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);



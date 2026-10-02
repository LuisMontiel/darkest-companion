import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './views/app';
import store from './store';

createRoot(document.getElementById('app-root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

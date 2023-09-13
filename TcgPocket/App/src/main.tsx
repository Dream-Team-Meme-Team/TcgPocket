import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/configureStore.tsx';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { appTheme } from './constants/theme.tsx';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
          <Notifications />
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { appStore } from './store/ConfigureStore.tsx';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { appTheme } from './constants/theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
          <Notifications />
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

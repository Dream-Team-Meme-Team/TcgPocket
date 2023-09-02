import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import { router } from './constants/router';
import { AppTheme } from './constants/AppTheme';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={AppTheme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;

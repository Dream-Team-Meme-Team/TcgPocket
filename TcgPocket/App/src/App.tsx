import { MantineProvider } from '@mantine/core';
import { Routes } from 'react-router-dom';
import { Foo } from './components/Navigation/nav-bar';
import { appTheme } from './constants/theme';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
      <Foo>
        <Routes></Routes>
      </Foo>
    </MantineProvider>
  );
}

export default App;

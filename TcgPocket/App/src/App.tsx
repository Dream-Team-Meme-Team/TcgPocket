import { AppShell, Box, CSSObject, Center } from '@mantine/core';
import {
  PrimaryNavigation,
  useNavbarHeight,
} from './navigation/PrimaryNavigation';
import { AppRoutes } from './routes/routes';

function App() {
  return (
    <>
      <AppShell layout="alt" padding={0} header={<PrimaryNavigation />}>
        <Box sx={childContainerSx}>
          <AppRoutes />
        </Box>
        <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
      </AppShell>
    </>
  );
}

export default App;

function footerSx(): CSSObject {
  return {
    height: '3.5rem',
    background: '#ffffed',
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  };
}

function childContainerSx(): CSSObject {
  const navbarHeight = useNavbarHeight();

  return {
    height: `calc(100vh - ${navbarHeight}px)`,
    paddingTop: navbarHeight,
    boxShadow: '0px 3px 8px black',
    position: 'relative',
  };
}

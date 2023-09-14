import {
  AppShell,
  Box,
  CSSObject,
  Center,
  MantineTheme,
  ScrollArea,
} from '@mantine/core';
import { PrimaryNavigation } from './navigation/PrimaryNavigation';
import { AppRoutes } from './routes/routes';
import { useNavbarHeight } from './hooks/use-navbar-height';
import { useAsync } from 'react-use';
import { useAuth } from './hooks/use-auth';

function App() {
  const { navbarHeight, remainingHeight } = useNavbarHeight();
  const scrollAreaSx = useScrollAreaSx(navbarHeight);
  const auth = useAuth();

  useAsync(async () => {
    await auth.getSignedInUser();
  });

  console.log('user: ', auth.signedInUser);

  return (
    <>
      <AppShell layout="alt" padding={0} header={<PrimaryNavigation />}>
        <ScrollArea h={remainingHeight} sx={scrollAreaSx}>
          <Box sx={useContainerSx}>
            <AppRoutes />
          </Box>
          <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
        </ScrollArea>
      </AppShell>
    </>
  );
}

export default App;

function footerSx(theme: MantineTheme): CSSObject {
  return {
    height: '3.5rem',
    background: theme.white,
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  };
}

function useContainerSx(theme: MantineTheme): CSSObject {
  const { remainingHeight } = useNavbarHeight();
  return {
    boxShadow: '0px 3px 8px black',
    position: 'relative',
    minHeight: remainingHeight,
    backgroundColor: theme.white,
  };
}

function useScrollAreaSx(navbarHeight: number): CSSObject {
  return {
    top: navbarHeight,
  };
}

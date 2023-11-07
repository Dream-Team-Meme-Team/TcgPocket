import {
  AppShell,
  Box,
  CSSObject,
  Center,
  MantineTheme,
  ScrollArea,
} from '@mantine/core';
import { PrimaryNavigation } from './navigation/PrimaryNavigation';
import { AppRoutes } from './routes/AppRoutes';
import { useNavbarHeight } from './hooks/useNavbarHeight';
import { dispatch } from './store/configureStore';
import { getSignedInUser } from './services/authServices';
import { useAsync } from 'react-use';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function App() {
  const { navbarHeight, remainingHeight } = useNavbarHeight();
  const scrollAreaSx = useScrollAreaSx(navbarHeight);
  const location = useLocation().pathname;

  const hideFooter: boolean = useMemo(() => {
    return !(
      location === '/admin-portal' ||
      location === '/inventory' ||
      location === '/deck-builder'
    );
  }, [location]);

  useAsync(async () => {
    await dispatch(getSignedInUser());
  }, []);

  return (
    <AppShell layout="alt" padding={0} header={<PrimaryNavigation />}>
      <ScrollArea h={remainingHeight} sx={scrollAreaSx}>
        <Box sx={useContainerSx}>
          <AppRoutes />
        </Box>
        {hideFooter && <Center sx={footerSx}>(≖ᴗ≖✿)</Center>}
      </ScrollArea>
    </AppShell>
  );
}

export default App;

function footerSx(theme: MantineTheme): CSSObject {
  return {
    height: '3.5rem',
    background: theme.colors.secondaryBlueColors[3],
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
    backgroundColor: theme.colors.backgroundColor[0],
  };
}

function useScrollAreaSx(navbarHeight: number): CSSObject {
  return {
    top: navbarHeight,
  };
}

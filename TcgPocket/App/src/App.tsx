import { AppShell, Box, CSSObject, Center, ScrollArea } from '@mantine/core';
import { PrimaryNavigation } from './navigation/PrimaryNavigation';
import { AppRoutes } from './routes/routes';
import { useNavbarHeight } from './hooks/use-navbar-height';

function App() {
  const { navbarHeight, remainingHeight } = useNavbarHeight();
  const scrollAreaSx = useScrollAreaSx(navbarHeight);

  return (
    <>
      <AppShell layout="alt" padding={0} header={<PrimaryNavigation />}>
        <ScrollArea h={remainingHeight} sx={scrollAreaSx}>
          <Box sx={containerSx}>
            <AppRoutes />
          </Box>
          <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
        </ScrollArea>
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

function containerSx(): CSSObject {
  return {
    boxShadow: '0px 3px 8px black',
    position: 'relative',
  };
}

function useScrollAreaSx(navbarHeight: number): CSSObject {
  return {
    top: navbarHeight,
  };
}

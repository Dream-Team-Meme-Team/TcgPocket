import { Box, CSSObject, Center } from '@mantine/core';
import { PrimaryNavigation } from './navigation/PrimaryNavigation';
import { AppRoutes } from './routes/routes';

function App() {
  return (
    <>
      <PrimaryNavigation />
      <Box sx={contentStyles}>
        <Box sx={childContainerSx}>
          <AppRoutes />
        </Box>
      </Box>
      <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
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
  };
}

function contentStyles(): CSSObject {
  return {
    paddingBottom: '3.5rem',
  };
}

function childContainerSx(): CSSObject {
  return {
    boxShadow: '0px 3px 8px black',
    position: 'relative',
    zIndex: 1,
  };
}

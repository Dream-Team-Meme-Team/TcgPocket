import { createStyles } from '@mantine/styles';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { BuilderDisplay } from './modules/DeckBuilderDisplay';
import { DeckBuilderHeader } from './modules/DeckBuilderHeader';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { ScrollArea } from '@mantine/core';

export function DeckBuilder(): React.ReactElement {
  const { classes } = useStyles();

  return (
    <ScrollArea className={classes.container}>
      <div className={classes.header}>
        <DeckBuilderHeader />
      </div>

      <div className={classes.body}>
        <InventoryDisplay />

        <BuilderDisplay />
      </div>
    </ScrollArea>
  );
}

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      height: '100vh',

      paddingTop: defaultPadding,
      paddingBottom: defaultPadding,
    },

    header: {
      display: 'flex',
      justifyContent: 'center',
    },

    body: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',

      gap: defaultGap,
      padding: defaultPadding,
    },
  };
});

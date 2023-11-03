import { createStyles, MantineTheme } from '@mantine/styles';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { BuilderDisplay } from './modules/DeckBuilderDisplay';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { DeckBuilderHeader } from './modules/DeckBuilderHeader';
import { defaultGap, defaultPadding } from '../../constants/theme';

export function DeckBuilder(): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <DeckBuilderHeader />
      </div>

      <div className={classes.body}>
        <InventoryDisplay />

        <BuilderDisplay />
      </div>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  const { remainingHeight } = useNavbarHeight();

  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      height: remainingHeight,

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
      margin: 20,
    },
  };
});

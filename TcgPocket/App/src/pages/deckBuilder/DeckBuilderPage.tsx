import { createStyles } from '@mantine/styles';
import { DeckBuilderInventory } from './modules/DeckBuilderInventory';
import { BuilderDisplay } from './modules/DeckBuilderDisplay';
import { DeckBuilderHeader } from './modules/DeckBuilderHeader';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { ScrollArea } from '@mantine/core';
import { shallowEqual, useDisclosure } from '@mantine/hooks';
import { DeckRequirementModal } from './modules/DeckRequirementModal';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { useEffect } from 'react';
import { resetDeckBuilder, untitledName } from '../../store/deckBuilderSlice';
import { resetInventorySlice } from '../../store/inventorySlice';

export function DeckBuilderPage(): React.ReactElement {
  const { classes } = useStyles();

  const [name, selectedGame] = useAppSelector(
    (state) => [state.deckBuilder.name, state.deckBuilder.selectedGame],
    shallowEqual
  );

  const [open, { toggle }] = useDisclosure(true);

  /**
   * resetting for now but ideally the user should be able
   * to navigate away and come back to the deck to continue
   * where they left off
   */
  useEffect(() => {
    return () => {
      dispatch(resetDeckBuilder());
      dispatch(resetInventorySlice());
    };
  }, []);

  return (
    <ScrollArea className={classes.container}>
      <div className={classes.header}>
        <DeckBuilderHeader />
      </div>

      <div className={classes.body}>
        <DeckBuilderInventory />

        <BuilderDisplay />
      </div>

      {name === untitledName && !selectedGame && (
        <DeckRequirementModal open={open} toggle={toggle} />
      )}
    </ScrollArea>
  );
}

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',

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

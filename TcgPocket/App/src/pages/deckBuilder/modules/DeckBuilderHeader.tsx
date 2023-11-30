import { createStyles } from '@mantine/styles';
import { useState } from 'react';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { IconEdit } from '@tabler/icons-react';
import { PrimaryIconButton } from '../../../components/buttons/PrimaryIconButton';
import { Text } from '@mantine/core';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { resetDeckBuilder, setDeckName } from '../../../store/deckBuilderSlice';
import { defaultGap } from '../../../constants/theme';
import { ConfirmDeletionModal } from './ConfirmDeletionModal';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { updateDeck } from '../../../services/DecksService';
import { shallowEqual } from 'react-redux';
import { DeckUpdateDto } from '../../../types/decks';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { MiniCardDto } from '../../../types/cards';

export function DeckBuilderHeader(): React.ReactElement {
  const { classes } = useStyles();

  const [deckName, deckId, selectedGame, deck] = useAppSelector(
    (state) => [
      state.deckBuilder.name,
      state.deckBuilder.id,
      state.deckBuilder.selectedGame,
      state.deckBuilder.deck,
    ],
    shallowEqual
  );

  const [name, setName] = useState<string>('');

  const [editMode, setEditMode] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    setEditMode(false);
    setName('');
    dispatch(setDeckName(name));
  };

  const handleReset = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    dispatch(resetDeckBuilder());
    setName('');
  };

  const handleUpdate = () => {
    const tempCards: MiniCardDto[] = [];

    deck.forEach((card) => {
      tempCards.push({
        id: card.id,
        gameId: card.game.id,
      });
    });

    const updatedDeck: DeckUpdateDto = {
      name: deckName,
      gameId: selectedGame?.id ?? 0,
      cards: tempCards,
    };

    dispatch(updateDeck({ id: deckId, body: updatedDeck })).then(
      ({ payload }) => {
        responseWrapper(payload, 'Deck Updated');
      }
    );
  };

  return editMode ? (
    <div className={classes.editName}>
      <PrimaryTextInput
        placeholder={deckName}
        value={name}
        onChange={handleNameChange}
      />

      <PrimaryButton disabled={!name} onClick={handleSave}>
        Save
      </PrimaryButton>
    </div>
  ) : (
    <div className={classes.displayName}>
      <div className={classes.name}>
        <Text> {deckName} </Text>

        <PrimaryIconButton onClick={() => setEditMode(true)}>
          <IconEdit />
        </PrimaryIconButton>
      </div>

      <div className={classes.restart}>
        <DeleteButton onClick={handleReset}>Restart</DeleteButton>

        <PrimaryButton onClick={handleUpdate}> Update </PrimaryButton>

        <ConfirmDeletionModal
          open={open}
          setOpen={handleClose}
          submitAction={handleConfirm}
        />
      </div>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    displayName: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      justifyContent: 'center',
      alignItems: 'center',

      width: '100%',
    },

    name: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      gap: defaultGap,

      fontSize: '36px',
      fontWeight: 'bolder',
    },

    restart: {
      display: 'flex',

      gap: defaultGap,

      paddingRight: '24px',
    },

    editName: {
      display: 'flex',
      alignItems: 'center',

      gap: defaultGap,
    },
  };
});

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
import { resetInventorySlice } from '../../../store/inventorySlice';

export function DeckBuilderHeader(): React.ReactElement {
  const { classes } = useStyles();

  const deckName = useAppSelector((state) => state.deckBuilder.name);

  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    setEditMode(false);
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
    dispatch(resetInventorySlice());
  };

  return editMode ? (
    <div className={classes.editName}>
      <PrimaryTextInput value={name} onChange={handleNameChange} />

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
        <PrimaryButton onClick={handleReset}>Restart</PrimaryButton>

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

      paddingRight: '24px',
    },

    editName: {
      display: 'flex',
      alignItems: 'center',

      gap: defaultGap,
    },
  };
});

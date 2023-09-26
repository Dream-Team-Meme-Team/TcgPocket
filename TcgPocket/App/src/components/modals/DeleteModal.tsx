import { useState } from 'react';
import { PrimaryModal } from './PrimaryModal';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { createStyles } from '@mantine/core';

type DeleteModalProps = {
  deleteText: string;
  open: boolean;
  setOpen: () => void;
  submitAction: () => void;
};

export function DeleteModal({
  deleteText,
  open,
  setOpen,
  submitAction,
}: DeleteModalProps): React.ReactElement {
  const { classes } = useStyles();

  const [text, setText] = useState('');

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  const handleClose = () => {
    setText('');
    setOpen();
  };

  const handleSubmit = () => {
    submitAction();
    handleClose();
  };

  return (
    <PrimaryModal
      opened={open}
      onClose={setOpen}
      title={'Are you sure you want to delete?'}
    >
      <div>
        <i> Type '{deleteText}' to submit.</i>
      </div>

      <PrimaryTextInput
        value={text}
        onChange={handleText}
        error={text !== deleteText}
      />

      <div className={classes.buttonsContainer}>
        <SecondaryButton onClick={handleClose}> Cancel </SecondaryButton>
        <PrimaryButton onClick={handleSubmit} disabled={text !== deleteText}>
          Submit
        </PrimaryButton>
      </div>
    </PrimaryModal>
  );
}

const useStyles = createStyles(() => {
  return {
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',

      gap: '8px',
      paddingTop: '8px',
    },
  };
});

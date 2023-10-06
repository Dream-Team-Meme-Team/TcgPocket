import { PrimaryModal } from './PrimaryModal';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { createStyles } from '@mantine/core';
import { DeleteButton } from '../buttons/DeleteButton';

type DeleteModalProps = {
  open: boolean;
  setOpen: () => void;
  submitAction: () => void;
};

export function DeleteModal({
  open,
  setOpen,
  submitAction,
}: DeleteModalProps): React.ReactElement {
  const { classes } = useStyles();

  const handleClose = () => {
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
      <div className={classes.buttonsContainer}>
        <SecondaryButton onClick={handleClose}> Cancel </SecondaryButton>
        <DeleteButton onClick={handleSubmit}>Delete</DeleteButton>
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

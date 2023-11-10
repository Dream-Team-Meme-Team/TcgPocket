import { createStyles } from '@mantine/core';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryModal } from '../../../components/modals/PrimaryModal';

type ConfirmDeletionModalProps = {
  open: boolean;
  setOpen: () => void;
  submitAction: () => void;
};

export function ConfirmDeletionModal({
  open,
  setOpen,
  submitAction,
}: ConfirmDeletionModalProps): React.ReactElement {
  const { classes } = useStyles();

  const handleSubmit = () => {
    submitAction();
    setOpen();
  };

  return (
    <PrimaryModal
      opened={open}
      onClose={setOpen}
      title={'Are you sure you want to restart?'}
    >
      <div className={classes.buttonsContainer}>
        <SecondaryButton onClick={setOpen}> Cancel </SecondaryButton>
        <DeleteButton onClick={handleSubmit}> Restart </DeleteButton>
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

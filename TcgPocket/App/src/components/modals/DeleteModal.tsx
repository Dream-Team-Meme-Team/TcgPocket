import { PrimaryModal } from './PrimaryModal';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { createStyles } from '@mantine/core';
import { DeleteButton } from '../buttons/DeleteButton';

type DeleteModalProps = {
  open: boolean;
  setOpen: () => void;
  submitAction: () => void;
  valueName?: string;
};

export function DeleteModal({
  open,
  setOpen,
  submitAction,
  valueName,
}: DeleteModalProps): React.ReactElement {
  const { classes } = useStyles();

  const handleSubmit = () => {
    submitAction();
    setOpen();
  };

  return (
    <PrimaryModal
      opened={open}
      onClose={setOpen}
      title={`Are you sure you want to delete ${valueName ?? ''}?`}
    >
      <div className={classes.buttonsContainer}>
        <SecondaryButton onClick={setOpen}> Cancel </SecondaryButton>
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

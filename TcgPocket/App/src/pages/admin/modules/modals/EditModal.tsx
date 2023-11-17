import { GameGetDto } from '../../../../types/games';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { SecondaryButton } from '../../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SetGetDto } from '../../../../types/sets';

type EditModalProps = {
  value: GameGetDto | SetGetDto;
  open: boolean;
  setOpen: () => void;
  submitAction: (arg: any) => void;
};

export function EditModal({
  value,
  open,
  setOpen,
  submitAction,
}: EditModalProps): React.ReactElement {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: value.name,
    },
  });

  const handleClose = () => {
    form.reset();
    setOpen();
  };

  const handleSubmit = () => {
    submitAction({ id: value.id, name: form.values.name });
    handleClose();
  };

  return (
    <PrimaryModal opened={open} onClose={setOpen} title={`Edit ${value.name}`}>
      <PrimaryTextInput {...form.getInputProps('name')} />

      <form
        className={classes.buttonsContainer}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <SecondaryButton type="reset" onClick={handleClose}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit"> Submit </PrimaryButton>
      </form>
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

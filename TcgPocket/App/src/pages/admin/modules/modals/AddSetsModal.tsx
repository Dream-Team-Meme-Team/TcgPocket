import { useDisclosure } from '@mantine/hooks';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { IconPlus } from '@tabler/icons-react';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { useForm } from '@mantine/form';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  createSet,
  getAllSets,
} from '../../../../services/dataServices/SetServices';
import { responseWrapper } from '../../../../services/responseWrapper';
import { SetDto } from '../../../../types/sets';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { SecondaryButton } from '../../../../components/buttons/SecondaryButton';
import { createStyles } from '@mantine/core';

const initialValues = {
  name: '',
  gameId: 0,
} as const;

export function AddSetsModal(): React.ReactElement {
  const { classes } = useStyles();

  const [open, { toggle }] = useDisclosure();

  const selectedGameId = useAppSelector((state) => state.data.selectedGameId);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const loadSets = async () => {
    const { payload } = await dispatch(getAllSets());
    console.log(payload);
    responseWrapper(payload);

    if (payload && !payload.hasErrors) {
      handleCancel();
    }
  };

  const handleAdd = async (newSet: SetDto) => {
    const updateGameId: SetDto = {
      name: newSet.name,
      gameId: selectedGameId,
    };

    const { payload } = await dispatch(createSet(updateGameId));
    responseWrapper(payload, 'Successfully added Set');

    if (payload && !payload.hasErrors) {
      loadSets();
    }
  };

  return (
    <div>
      <PrimaryButton leftIcon={<IconPlus />} onClick={toggle}>
        Add Set
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Set">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Sets"
            {...form.getInputProps('name')}
          />

          <div className={classes.buttonsContainer}>
            <SecondaryButton type="reset" onClick={handleCancel}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit"> Add </PrimaryButton>
          </div>
        </form>
      </PrimaryModal>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',

      paddingTop: '8px',
      gap: '8px',
    },
  };
});

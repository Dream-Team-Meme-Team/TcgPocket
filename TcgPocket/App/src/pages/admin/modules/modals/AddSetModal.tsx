import { useDisclosure } from '@mantine/hooks';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { IconPlus } from '@tabler/icons-react';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { useForm } from '@mantine/form';
import { dispatch, useAppSelector } from '../../../../store/ConfigureStore';
import {
  createSet,
  getAllSets,
} from '../../../../services/dataServices/SetServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { SetDto } from '../../../../types/sets';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { AdminButtons } from '../AdminButtons';

const initialValues = {
  name: '',
  gameId: 0,
} as const;

export function AddSetModal(): React.ReactElement {
  const [open, { toggle }] = useDisclosure();

  const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const loadSets = () => {
    dispatch(getAllSets()).then(({ payload }) => {
      responseWrapper(payload);

      if (payload && !payload.hasErrors) {
        handleCancel();
      }
    });
  };

  const handleAdd = (newSet: SetDto) => {
    const updateGameId: SetDto = {
      name: newSet.name,
      gameId: selectedGameId,
    };

    dispatch(createSet(updateGameId)).then(({ payload }) => {
      responseWrapper(payload, 'Set Added');

      if (payload && !payload.hasErrors) {
        loadSets();
      }
    });
  };

  const determineDisabled = selectedGameId === 0;

  return (
    <div>
      <PrimaryButton
        leftIcon={<IconPlus />}
        onClick={toggle}
        disabled={determineDisabled}
      >
        Add Set
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Set">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Set"
            {...form.getInputProps('name')}
          />

          <AdminButtons handleCancel={handleCancel} />
        </form>
      </PrimaryModal>
    </div>
  );
}

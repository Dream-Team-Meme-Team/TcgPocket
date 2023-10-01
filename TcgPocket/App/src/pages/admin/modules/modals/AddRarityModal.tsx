import { IconPlus } from '@tabler/icons-react';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { useDisclosure } from '@mantine/hooks';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import {
  createRarity,
  getAllRarities,
} from '../../../../services/dataServices/RaritiesServices';
import { responseWrapper } from '../../../../services/responseWrapper';
import { RarityDto } from '../../../../types/rarities';
import { AdminButtons } from '../../../../components/buttons/AdminButtons';

const initialValues = {
  name: '',
  gameId: 0,
} as const;

export function AddRarityModal(): React.ReactElement {
  const [open, { toggle }] = useDisclosure();

  const selectedGameId = useAppSelector((state) => state.data.selectedGameId);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const loadRarities = async () => {
    const { payload } = await dispatch(getAllRarities());
    responseWrapper(payload);

    if (payload && !payload.hasErrors) {
      handleCancel();
    }
  };

  const handleAdd = async (newRarity: RarityDto) => {
    const updatedRarity: RarityDto = {
      name: newRarity.name,
      gameId: selectedGameId,
    };

    const { payload } = await dispatch(createRarity(updatedRarity));
    responseWrapper(payload, 'Successfully added Rarity');

    if (payload && !payload.hasErrors) {
      loadRarities();
    }
  };

  const determineDisabled = selectedGameId === 0;

  return (
    <div>
      <PrimaryButton
        leftIcon={<IconPlus />}
        onClick={toggle}
        disabled={determineDisabled}
      >
        Add Rarity
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Rarity">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Rarities"
            {...form.getInputProps('name')}
          />

          <AdminButtons handleCancel={handleCancel} />
        </form>
      </PrimaryModal>
    </div>
  );
}

import { IconPlus } from '@tabler/icons-react';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { useDisclosure } from '@mantine/hooks';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { createRarity } from '../../../../services/dataServices/rarityServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { RarityDto } from '../../../../types/rarities';
import { AdminButtons } from '../AdminButtons';
import eventBus from '../../../../helpers/eventBus';

const initialValues = {
  name: '',
  gameId: 0,
} as const;

export function AddRarityModal(): React.ReactElement {
  const [open, { toggle }] = useDisclosure();

  const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const handleAdd = (newRarity: RarityDto) => {
    const updatedRarity: RarityDto = {
      name: newRarity.name,
      gameId: selectedGameId,
    };

    dispatch(createRarity(updatedRarity)).then(({ payload }) => {
      responseWrapper(payload, 'Rarity Added');

      if (payload && !payload.hasErrors) {
        eventBus.publish('rarityAdded', payload);
        handleCancel();
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
        Add Rarity
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Rarity">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Rarity"
            {...form.getInputProps('name')}
          />

          <AdminButtons handleCancel={handleCancel} />
        </form>
      </PrimaryModal>
    </div>
  );
}

import { useDisclosure } from '@mantine/hooks';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { IconPlus } from '@tabler/icons-react';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  createCardType,
  getAllCardTypes,
} from '../../../../services/dataServices/CardTypeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { CardTypeDto } from '../../../../types/card-types';
import { AdminButtons } from '../AdminButtons';

const initialValues = {
  name: '',
  gameId: 0,
} as const;

export function AddCardTypeModal(): React.ReactElement {
  const [open, { toggle }] = useDisclosure();

  const selectGameId = useAppSelector((state) => state.data.selectedGameId);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const loadCardTypes = async () => {
    const { payload } = await dispatch(getAllCardTypes());
    responseWrapper(payload);

    if (payload && !payload.hasErrors) {
      handleCancel();
    }
  };

  const handleAdd = async (newCardType: CardTypeDto) => {
    const updateGameId: CardTypeDto = {
      name: newCardType.name,
      gameId: selectGameId,
    };

    const { payload } = await dispatch(createCardType(updateGameId));
    responseWrapper(payload, 'Card Type Added');

    if (payload && !payload.hasErrors) {
      loadCardTypes();
    }
  };

  const determineDisabled = selectGameId === 0;

  return (
    <div>
      <PrimaryButton
        leftIcon={<IconPlus />}
        onClick={toggle}
        disabled={determineDisabled}
      >
        Add Card Type
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Card Type">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Card Type"
            {...form.getInputProps('name')}
          />

          <AdminButtons handleCancel={handleCancel} />
        </form>
      </PrimaryModal>
    </div>
  );
}

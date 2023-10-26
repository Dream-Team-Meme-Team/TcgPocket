import { IconPlus } from '@tabler/icons-react';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { useDisclosure } from '@mantine/hooks';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { GameDto } from '../../../../types/games';
import {
  createGame,
  getAllGames,
} from '../../../../services/dataServices/GameServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { dispatch } from '../../../../store/ConfigureStore';
import { AdminButtons } from '../AdminButtons';

const initialValues = {
  name: '',
} as const;

export function AddGameModal(): React.ReactElement {
  const [open, { toggle }] = useDisclosure();

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const loadGames = () => {
    dispatch(getAllGames()).then(({ payload }) => {
      responseWrapper(payload);

      if (payload && !payload.hasErrors) {
        handleCancel();
      }
    });
  };

  const handleAdd = (newGame: GameDto) => {
    dispatch(createGame(newGame)).then(({ payload }) => {
      responseWrapper(payload, 'Game Created');

      if (payload && !payload.hasErrors) {
        loadGames();
      }
    });
  };

  return (
    <div>
      <PrimaryButton leftIcon={<IconPlus />} onClick={toggle}>
        Add Game
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Game">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Game"
            {...form.getInputProps('name')}
          />

          <AdminButtons handleCancel={handleCancel} />
        </form>
      </PrimaryModal>
    </div>
  );
}

import { TabLabel } from '../AdminPage';
import { AddGameModal } from './modals/AddGameModal';
import { AddSetsModal } from './modals/AddSetsModal';

type AddModalRendererProps = {
  label: string;
};

export function AddModalRenderer({
  label,
}: AddModalRendererProps): React.ReactElement {
  return (
    <div>
      {label === TabLabel.GAMES && <AddGameModal />}
      {label === TabLabel.SETS && <AddSetsModal />}
    </div>
  );
}

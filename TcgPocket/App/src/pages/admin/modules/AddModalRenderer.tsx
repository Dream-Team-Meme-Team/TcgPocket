import { TabLabel } from '../AdminPage';
import { AddCardTypeModal } from './modals/AddCardTypeModal';
import { AddGameModal } from './modals/AddGameModal';
import { AddRarityModal } from './modals/AddRarityModal';
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
      {label === TabLabel.CARD_TYPES && <AddCardTypeModal />}
      {label === TabLabel.RARITIES && <AddRarityModal />}
    </div>
  );
}

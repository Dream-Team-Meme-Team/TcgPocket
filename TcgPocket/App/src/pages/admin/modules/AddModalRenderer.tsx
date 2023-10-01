import { TabLabel } from '../AdminPage';
import { AddAttributeModal } from './modals/AddAttributeModal';
import { AddCardTypeModal } from './modals/AddCardTypeModal';
import { AddGameModal } from './modals/AddGameModal';
import { AddRarityModal } from './modals/AddRarityModal';
import { AddSetModal } from './modals/AddSetModal';

type AddModalRendererProps = {
  label: string;
};

export function AddModalRenderer({
  label,
}: AddModalRendererProps): React.ReactElement {
  return (
    <div>
      {label === TabLabel.GAMES && <AddGameModal />}
      {label === TabLabel.SETS && <AddSetModal />}
      {label === TabLabel.CARD_TYPES && <AddCardTypeModal />}
      {label === TabLabel.RARITIES && <AddRarityModal />}
      {label === TabLabel.ATTRIBUTES && <AddAttributeModal />}
    </div>
  );
}

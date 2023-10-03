import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { AddAttributeModal } from '../modals/AddAttributeModal';
import { AddCardTypeModal } from '../modals/AddCardTypeModal';
import { AddGameModal } from '../modals/AddGameModal';
import { AddRarityModal } from '../modals/AddRarityModal';
import { AddSetModal } from '../modals/AddSetModal';

type AddModalRendererProps = {
  label: string;
};

export function AddModalRenderer({
  label,
}: AddModalRendererProps): React.ReactElement {
  switch (label) {
    case AdminTabLabel.GAMES:
      return <AddGameModal />;
    case AdminTabLabel.SETS:
      return <AddSetModal />;
    case AdminTabLabel.CARD_TYPES:
      return <AddCardTypeModal />;
    case AdminTabLabel.RARITIES:
      return <AddRarityModal />;
    case AdminTabLabel.ATTRIBUTES:
      return <AddAttributeModal />;
    default:
      return <div />;
  }
}

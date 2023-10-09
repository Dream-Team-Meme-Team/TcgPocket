import { AdminTabLabel } from '../../../enums/adminTabLabel';
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
  switch (label) {
    case AdminTabLabel.Games:
      return <AddGameModal />;
    case AdminTabLabel.Sets:
      return <AddSetModal />;
    case AdminTabLabel.CardTypes:
      return <AddCardTypeModal />;
    case AdminTabLabel.Rarities:
      return <AddRarityModal />;
    case AdminTabLabel.Attributes:
      return <AddAttributeModal />;
    default:
      return <div />;
  }
}

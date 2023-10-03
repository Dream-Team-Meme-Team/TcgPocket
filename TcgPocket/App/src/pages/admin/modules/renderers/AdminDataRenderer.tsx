import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { AttributeTab } from '../tabs/AttributeTab';
import { CardTypeTab } from '../tabs/CardTypeTab';
import { GameTab } from '../tabs/GameTab';
import { RarityTab } from '../tabs/RarityTab';
import { SetTab } from '../tabs/SetTab';

type AdminDataRendererProps = {
  label: string;
};

export function AdminDataRenderer({
  label,
}: AdminDataRendererProps): React.ReactElement {
  // let Tab;

  // switch (label) {
  //   case AdminTabLabel.GAMES:
  //     Tab = GameTab;
  //     break;
  //   case AdminTabLabel.SETS:
  //     Tab = SetTab;
  //     break;
  //   case AdminTabLabel.CARD_TYPES:
  //     Tab = CardTypeTab;
  //     break;
  //   case AdminTabLabel.RARITIES:
  //     Tab = RarityTab;
  //     break;
  //   case AdminTabLabel.ATTRIBUTES:
  //     Tab = AttributeTab;
  //     break;
  //   default:
  //     Tab = '';
  // }

  // return (
  //   <div>
  //     <Tab />
  //   </div>
  // );

  switch (label) {
    case AdminTabLabel.GAMES:
      return <GameTab />;
    case AdminTabLabel.SETS:
      return <SetTab />;
    case AdminTabLabel.CARD_TYPES:
      return <CardTypeTab />;
    case AdminTabLabel.RARITIES:
      return <RarityTab />;
    case AdminTabLabel.ATTRIBUTES:
      return <AttributeTab />;
    default:
      return <div />;
  }
}

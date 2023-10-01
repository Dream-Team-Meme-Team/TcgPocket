import { TabLabel } from '../../AdminPage';
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
  return (
    <div>
      {label === TabLabel.GAMES && <GameTab />}
      {label === TabLabel.SETS && <SetTab />}
      {label === TabLabel.CARD_TYPES && <CardTypeTab />}
      {label === TabLabel.RARITIES && <RarityTab />}
      {label === TabLabel.ATTRIBUTES && <AttributeTab />}
    </div>
  );
}

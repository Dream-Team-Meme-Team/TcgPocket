import { SettingTabLabel } from '../../../enums/settingTabLabel';
import { AccountTab } from './AccountTab';

type SettingTabRendererProps = {
  label: string;
};

export function SettingTabRenderer({
  label,
}: SettingTabRendererProps): React.ReactElement {
  switch (label) {
    case SettingTabLabel.ACCOUNT:
      return <AccountTab />;
    default:
      return <div />;
  }
}

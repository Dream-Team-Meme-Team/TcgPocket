import { Tabs, createStyles } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useNavbarHeight } from '../../hooks/use-navbar-height';
import { Tab } from '../../types/tabs';
import { SettingTabLabel } from '../../enums/settingTabLabel';
import { SettingTabRenderer } from './modules/SettingTabRenderer';

const tabs: Tab[] = [
  {
    label: SettingTabLabel.ACCOUNT,
    icon: <IconUser />,
  },
];

export function SettingsPage(): React.ReactElement {
  const { classes } = useStyles();

  return (
    <Tabs
      defaultValue={tabs[0].label}
      orientation="vertical"
      className={classes.settingsPageContainer}
    >
      <Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Tab key={index} value={tab.label} icon={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab, index) => (
        <Tabs.Panel key={index} value={tab.label}>
          <SettingTabRenderer label={tab.label} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

const useStyles = createStyles(() => {
  const { remainingHeight } = useNavbarHeight();
  return {
    settingsPageContainer: {
      height: `${remainingHeight}px`,
    },
  };
});

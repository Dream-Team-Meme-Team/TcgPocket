import { Tabs, createStyles } from '@mantine/core';
import { IconMoon, IconUser } from '@tabler/icons-react';
import { AccountTab } from './modules/AccountTab';
import { AppearanceTab } from './modules/AppearanceTab';
import { useNavbarHeight } from '../../hooks/use-navbar-height';

const tabs = [
  { label: 'Account', icon: <IconUser />, element: <AccountTab /> },
  { label: 'Appearance', icon: <IconMoon />, element: <AppearanceTab /> },
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
        {tabs.map((tab) => (
          <Tabs.Tab value={tab.label} icon={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel value={tab.label}> {tab.element} </Tabs.Panel>
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

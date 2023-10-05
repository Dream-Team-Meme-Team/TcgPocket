import { MantineTheme, Tabs, createStyles } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { AccountTab } from './modules/AccountTab';
import { useNavbarHeight } from '../../hooks/use-navbar-height';
import { Tab } from '../../types/tabs';

const tabs: Tab[] = [
  { label: 'Account', icon: <IconUser />, element: <AccountTab /> },
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
          <Tabs.Tab
            className={classes.tabStyle}
            key={index}
            value={tab.label}
            icon={tab.icon}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab, index) => (
        <Tabs.Panel key={index} value={tab.label}>
          {tab.element}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  const { remainingHeight } = useNavbarHeight();
  return {
    settingsPageContainer: {
      height: `${remainingHeight}px`,
    },
    tabStyle: {
      borderColor: `${theme.fn.lighten(
        theme.colors.secondaryPurpleColors[0],
        0.25
      )} !important`,

      '&:hover': {
        backgroundColor: theme.fn.rgba(
          theme.colors.secondaryPurpleColors[0],
          0.25
        ),
      },
    },
  };
});

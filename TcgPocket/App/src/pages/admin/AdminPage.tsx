import { Tabs, TabsValue, createStyles } from '@mantine/core';
import {
  IconCards,
  IconChartTreemap,
  IconCoffin,
  IconDeviceGamepad,
  IconPlayCard,
} from '@tabler/icons-react';
import { useNavbarHeight } from '../../hooks/use-navbar-height';
import { AdminTabHeader } from './modules/headers/AdminTabHeader';
import { Tab } from '../../types/tabs';
import { dispatch } from '../../store/configureStore';
import {
  setAdminSearchTerm,
  setSelectedGameId,
  setSelectedId,
} from '../../store/dataSlice';
import { useState } from 'react';
import { AdminDataRenderer } from './modules/renderers/AdminDataRenderer';

export enum TabLabel {
  GAMES = 'Games',
  SETS = 'Sets',
  CARD_TYPES = 'Card Types',
  RARITIES = 'Rarities',
  ATTRIBUTES = 'Attributes',
}

const adminTabs: Tab[] = [
  {
    label: TabLabel.GAMES,
    icon: <IconDeviceGamepad />,
  },
  {
    label: TabLabel.SETS,
    icon: <IconCards />,
  },
  {
    label: TabLabel.CARD_TYPES,
    icon: <IconPlayCard />,
  },
  {
    label: TabLabel.RARITIES,
    icon: <IconChartTreemap />,
  },
  {
    label: TabLabel.ATTRIBUTES,
    icon: <IconCoffin />,
  },
];

export function AdminPage(): React.ReactElement {
  const { remainingHeight } = useNavbarHeight();
  const { classes } = useStyles();

  const [activeTab, setActiveTab] = useState<string | null>(adminTabs[0].label);

  const handleTabChange = (value: TabsValue) => {
    setActiveTab(value);
    dispatch(setAdminSearchTerm(''));
    dispatch(setSelectedGameId(0));
    dispatch(setSelectedId(0));
  };

  return (
    <Tabs
      defaultValue={adminTabs[0].label}
      value={activeTab}
      onTabChange={handleTabChange}
      orientation="vertical"
      sx={{ height: `${remainingHeight}px` }}
    >
      <Tabs.List>
        {adminTabs.map((tab, index) => (
          <Tabs.Tab key={index} value={tab.label} icon={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {adminTabs.map((tab, index) => (
        <Tabs.Panel
          key={index}
          value={tab.label}
          className={classes.panelContainer}
        >
          <AdminTabHeader tabTitle={tab.label} />

          <AdminDataRenderer label={tab.label} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

const useStyles = createStyles(() => {
  return {
    panelContainer: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      padding: '8px',
    },

    panelHeader: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
});

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
import { AppState, dispatch, useAppSelector } from '../../store/configureStore';
import { useEffect } from 'react';
import { AdminDataRenderer } from './modules/renderers/AdminDataRenderer';
import {
  setAdminSearchTerm,
  setSelectedAdminTab,
  setSelectedGameId,
  setSelectedId,
} from '../../store/adminSlice';
import { AdminTabLabel } from '../../enums/adminTabLabel';

const adminTabs: Tab[] = [
  {
    label: AdminTabLabel.GAMES,
    icon: <IconDeviceGamepad />,
  },
  {
    label: AdminTabLabel.SETS,
    icon: <IconCards />,
  },
  {
    label: AdminTabLabel.CARD_TYPES,
    icon: <IconPlayCard />,
  },
  {
    label: AdminTabLabel.RARITIES,
    icon: <IconChartTreemap />,
  },
  {
    label: AdminTabLabel.ATTRIBUTES,
    icon: <IconCoffin />,
  },
];

export function AdminPage(): React.ReactElement {
  const { remainingHeight } = useNavbarHeight();
  const { classes } = useStyles();

  const selectedTab = useAppSelector(
    (state: AppState) => state.admin.selectedTab
  );

  const handleTabChange = (value: TabsValue) => {
    dispatch(setSelectedAdminTab(value));
    dispatch(setAdminSearchTerm(''));
    dispatch(setSelectedGameId(0));
    dispatch(setSelectedId(0));
  };

  useEffect(() => {
    dispatch(setSelectedAdminTab(AdminTabLabel.GAMES));
  }, []);

  return (
    <Tabs
      value={selectedTab}
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
          <AdminTabHeader label={tab.label} />

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

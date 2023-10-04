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
import { dispatch, useAppSelector } from '../../store/configureStore';
import { useEffect } from 'react';
import {
  setAdminSearchTerm,
  setSelectedAdminTab,
  setSelectedGameId,
  setSelectedId,
} from '../../store/adminSlice';
import { AdminTabLabel } from '../../enums/adminTabLabel';
import { GameTab } from './modules/tabs/GameTab';
import { SetTab } from './modules/tabs/SetTab';
import { CardTypeTab } from './modules/tabs/CardTypeTab';
import { RarityTab } from './modules/tabs/RarityTab';
import { AttributeTab } from './modules/tabs/AttributeTab';

const adminTabs: Tab[] = [
  {
    label: AdminTabLabel.GAMES,
    icon: <IconDeviceGamepad />,
    content: GameTab,
  },
  {
    label: AdminTabLabel.SETS,
    icon: <IconCards />,
    content: SetTab,
  },
  {
    label: AdminTabLabel.CARD_TYPES,
    icon: <IconPlayCard />,
    content: CardTypeTab,
  },
  {
    label: AdminTabLabel.RARITIES,
    icon: <IconChartTreemap />,
    content: RarityTab,
  },
  {
    label: AdminTabLabel.ATTRIBUTES,
    icon: <IconCoffin />,
    content: AttributeTab,
  },
];

export function AdminPage(): React.ReactElement {
  const { remainingHeight } = useNavbarHeight();
  const { classes } = useStyles();

  const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);
  const selectedTab = useAppSelector((state) => state.admin.selectedTab);

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

      {adminTabs.map((tab, index) => {
        const TabContent = tab.content;

        return (
          <Tabs.Panel
            key={index}
            value={tab.label}
            className={classes.panelContainer}
          >
            <AdminTabHeader label={tab.label} />

            {selectedGameId !== 0 || tab.label === AdminTabLabel.GAMES ? (
              <TabContent />
            ) : (
              <div className={classes.noSelectedGame}>Please Select a Game</div>
            )}
          </Tabs.Panel>
        );
      })}
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

    noSelectedGame: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      fontWeight: 'bold',
      fontSize: '20px',
    },
  };
});

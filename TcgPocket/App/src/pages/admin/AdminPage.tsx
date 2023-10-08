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
import { shallowEqual } from 'react-redux';

const adminTabs: Tab[] = [
  {
    label: AdminTabLabel.Games,
    icon: <IconDeviceGamepad />,
    content: GameTab,
  },
  {
    label: AdminTabLabel.Sets,
    icon: <IconCards />,
    content: SetTab,
  },
  {
    label: AdminTabLabel.CardTypes,
    icon: <IconPlayCard />,
    content: CardTypeTab,
  },
  {
    label: AdminTabLabel.Rarities,
    icon: <IconChartTreemap />,
    content: RarityTab,
  },
  {
    label: AdminTabLabel.Attributes,
    icon: <IconCoffin />,
    content: AttributeTab,
  },
];

export function AdminPage(): React.ReactElement {
  const { classes } = useStyles();

  // const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);
  // const selectedTab = useAppSelector((state) => state.admin.selectedTab);

  const [selectedGameId, selectedTab] = useAppSelector(
    (state) => [state.admin.selectedGameId, state.admin.selectedTab],
    shallowEqual
  );

  const handleTabChange = (value: TabsValue) => {
    dispatch(setSelectedAdminTab(value));
    dispatch(setAdminSearchTerm(''));
    dispatch(setSelectedGameId(0));
    dispatch(setSelectedId(0));
  };

  useEffect(() => {
    dispatch(setSelectedAdminTab(AdminTabLabel.Games));
  }, []);

  return (
    <Tabs
      value={selectedTab}
      onTabChange={handleTabChange}
      orientation="vertical"
      className={classes.tab}
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

            {selectedGameId !== 0 || tab.label === AdminTabLabel.Games ? (
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
  const { remainingHeight } = useNavbarHeight();

  return {
    tab: {
      height: `${remainingHeight}px`,
    },

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

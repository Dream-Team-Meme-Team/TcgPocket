import { Tabs, createStyles } from '@mantine/core';
import { AttributeTab } from './modules/tabs/AttributeTab';
import { CardTypeTab } from './modules/tabs/CardTypeTab';
import { GameTab } from './modules/tabs/GameTab';
import { RarityTab } from './modules/tabs/RarityTab';
import { SetTab } from './modules/tabs/SetTab';
import {
  IconCards,
  IconChartTreemap,
  IconCoffin,
  IconDeviceGamepad,
  IconPlayCard,
} from '@tabler/icons-react';
import { useNavbarHeight } from '../../hooks/use-navbar-height';
import { AdminTabHeader } from './modules/AdminTabHeader';
import { AddGameModal } from './modules/modals/AddGameModal';

const adminTabs = [
  {
    label: 'Games',
    icon: <IconDeviceGamepad />,
    element: <GameTab />,
    addModal: <AddGameModal />,
  },
  { label: 'Sets', icon: <IconCards />, element: <SetTab />, addModal: null },
  {
    label: 'Card Types',
    icon: <IconPlayCard />,
    element: <CardTypeTab />,
    addModal: null,
  },
  {
    label: 'Rarities',
    icon: <IconChartTreemap />,
    element: <RarityTab />,
    addModal: null,
  },
  {
    label: 'Attributes',
    icon: <IconCoffin />,
    element: <AttributeTab />,
    addModal: null,
  },
];

export function AdminPage(): React.ReactElement {
  const { remainingHeight } = useNavbarHeight();
  const { classes } = useStyles();

  // const handleTabChange = () => {
  //   dispatch(setAdminSearchTerm(''));
  // };

  return (
    <Tabs
      defaultValue={adminTabs[0].label}
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
          <AdminTabHeader tabTitle={tab.label} addModal={tab.addModal} />

          {tab.element}
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

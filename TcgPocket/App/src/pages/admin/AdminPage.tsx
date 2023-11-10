import { Flex, ScrollArea, Tabs, TabsValue, createStyles } from '@mantine/core';
import {
  IconCards,
  IconChartTreemap,
  IconCoffin,
  IconDeviceGamepad,
  IconPlayCard,
} from '@tabler/icons-react';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { AdminTabHeader } from './modules/headers/AdminTabHeader';
import { Tab } from '../../types/tabs';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { useEffect } from 'react';
import {
  setAdminSearchTerm,
  setCurrentPage,
  setPageCount,
  setPageSize,
  setSelectedAdminTab,
  setSelectedGameId,
  setSelectedIdInPaginatedTable,
} from '../../store/adminSlice';
import { AdminTabLabel } from '../../enums/adminTabLabel';
import { GameTab } from './modules/tabs/GameTab';
import { SetTab } from './modules/tabs/SetTab';
import { CardTypeTab } from './modules/tabs/CardTypeTab';
import { RarityTab } from './modules/tabs/RarityTab';
import { AttributeTab } from './modules/tabs/AttributeTab';
import { shallowEqual } from 'react-redux';
import { PaginationSelect } from '../../components/pagination/PaginationSelect';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { PrimarySelect } from '../../components/inputs/PrimarySelect';
import { AddModalRenderer } from './modules/AddModalRenderer';

const pageSizeOptions: string[] = ['15', '30', '45'];

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

  const [selectedGameId, selectedTab, currentPage, pageSize, pageCount] =
    useAppSelector(
      (state) => [
        state.admin.selectedGameId,
        state.admin.selectedTab,
        state.admin.currentPage,
        state.admin.pageSize,
        state.admin.pageCount,
      ],
      shallowEqual
    );

  const handleSetCurrentPage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const handleSetPageSize = (value: number) => {
    dispatch(setPageSize(value));
  };

  const handleTabChange = (value: TabsValue) => {
    dispatch(setSelectedAdminTab(value));
    dispatch(setCurrentPage(1));
    dispatch(setAdminSearchTerm(''));
    dispatch(setSelectedIdInPaginatedTable(0));
  };

  useEffect(() => {
    dispatch(setSelectedAdminTab(AdminTabLabel.Games));
    dispatch(setSelectedGameId(0));
    dispatch(setPageCount(1));
  }, []);

  return (
    <Tabs
      value={selectedTab}
      onTabChange={handleTabChange}
      orientation="vertical"
      className={classes.tab}
    >
      <Tabs.List tabIndex={0}>
        {adminTabs.map((tab, index) => (
          <Tabs.Tab
            key={index}
            value={tab.label}
            icon={tab.icon}
            className={classes.tabStyle}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <ScrollArea className={classes.contain}>
        {adminTabs.map((tab, index) => {
          const TabContent = tab.content;

          return (
            <Tabs.Panel
              key={index}
              value={tab.label}
              className={classes.panelContainer}
            >
              {selectedGameId !== 0 || tab.label === AdminTabLabel.Games ? (
                <>
                  <Flex
                    align="center"
                    justify={'space-between'}
                    className={classes.tabHeader}
                  >
                    <h3 className={classes.tabHeaderFont}>
                      Modify {tab.label}
                    </h3>
                    <text className={classes.addButton}>
                      <AddModalRenderer label={tab.label} />
                    </text>
                  </Flex>

                  <TabContent />
                </>
              ) : (
                <div className={classes.noSelectedGame}>
                  Please Select a Game
                </div>
              )}
            </Tabs.Panel>
          );
        })}
      </ScrollArea>

      <div className={classes.paginationHeader}>
        <div className={classes.pageSizeControls}>
          <span> Items Per Page </span>

          <div className={classes.select}>
            <PrimarySelect
              value={pageSize.toString()}
              data={pageSizeOptions}
              icon={<IconCards />}
              onChange={(value) => {
                if (!value) return;

                handleSetPageSize(parseInt(value.toString()));
              }}
            />
          </div>
        </div>
        <AdminTabHeader label={selectedTab ?? ''} />

        <PaginationSelect
          currentPage={currentPage}
          setCurrentPage={handleSetCurrentPage}
          total={pageCount}
        />
      </div>
    </Tabs>
  );
}

const useStyles = createStyles((theme) => {
  const { remainingHeight, navbarHeight } = useNavbarHeight();

  return {
    tab: {
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

    addButton: {
      justifyContent: 'flex-end',
    },

    tabHeader: {
      paddingLeft: '1em',
      paddingRight: '1em',
      paddingTop: '1em',
      paddingBottom: 0,
      margin: 0,
    },

    tabHeaderFont: {
      fontSize: '26px',
      padding: 0,
      margin: 0,
    },

    panelContainer: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      backgroundColor: theme.colors.secondaryBackgroundColor[0],

      padding: '8px',
    },

    panelHeader: {
      display: 'flex',
      justifyContent: 'center',
    },

    contain: {
      width: '100%',
      paddingLeft: '0.5em',
      top: navbarHeight,
      height: remainingHeight - navbarHeight,
      backgroundColor: theme.colors.secondaryBackgroundColor[0],
    },

    noSelectedGame: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '1em',

      fontWeight: 'bold',
      fontSize: '20px',
    },

    display: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      height: navbarHeight,
    },

    paginationHeader: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto auto',
      alignItems: 'center',
      gap: defaultGap,
      height: navbarHeight,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      marginLeft: 124.587,
      justifyItems: 'end',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    pageSizeControls: {
      display: 'flex',
      alignItems: 'center',

      gap: defaultGap,
      padding: defaultPadding,
    },

    select: {
      width: 100,
    },
  };
});

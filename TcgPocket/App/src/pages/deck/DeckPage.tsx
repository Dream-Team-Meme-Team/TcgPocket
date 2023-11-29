import {
  createStyles,
  MantineTheme,
  ScrollArea,
  Tabs,
  TabsValue,
} from '@mantine/core';
import { useEffectOnce } from 'react-use';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { useEffect, useMemo } from 'react';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { getAllGames } from '../../services/dataServices/gameServices';
import { shallowEqual } from 'react-redux';
import { Tab } from '../../types/tabs';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import {
  setDeckSearchTerm,
  setSelectedDeckTab,
  setSelectedDeckId,
} from '../../store/deckSlice';
import { DeckTabHeader } from './modules/DeckTabHeader';
import { DeckTab } from './modules/DeckTab';
import { IconPlayCard } from '@tabler/icons-react';
import { AllDecksTab } from './modules/AllDecksTab';

export function DeckPage(): React.ReactElement {
  const { classes } = useStyles();

  const [games] = useAppSelector((state) => [state.data.games], shallowEqual);

  const [selectedTab] = useAppSelector(
    (state) => [state.deck.selectedTab],
    shallowEqual
  );

  const gameTabs: Tab[] = useMemo(() => {
    const tabs: Tab[] = [];

    tabs.push({
      label: 'All Games',
      content: AllDecksTab,
      icon: <IconPlayCard />,
    });

    games.forEach((game) =>
      tabs.push({
        label: game.name,
        content: DeckTab,
        icon: <IconPlayCard />,
      })
    );
    return tabs;
  }, [games]);

  const handleTabChange = (value: TabsValue) => {
    dispatch(setSelectedDeckTab(value));
    dispatch(setDeckSearchTerm(''));
    dispatch(setSelectedDeckId(0));
  };

  useEffectOnce(() => {
    if (games.length === 0) {
      dispatch(getAllGames()).then(({ payload }) => responseWrapper(payload));
    }
  });

  useEffect(() => {
    dispatch(setSelectedDeckTab(gameTabs[0]?.label ?? 'Magic'));
  }, [gameTabs]);

  return (
    <Tabs
      value={selectedTab}
      onTabChange={handleTabChange}
      orientation="vertical"
      className={classes.tab}
    >
      <Tabs.List tabIndex={0}>
        {gameTabs.map((tab, index) => {
          const className =
            tab.label === selectedTab
              ? classes.tabStyleHighlighted
              : classes.tabStyle;
          return (
            <Tabs.Tab
              key={index}
              value={tab.label}
              icon={tab.icon}
              className={className}
            >
              {tab.label}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <ScrollArea className={classes.contain}>
        {gameTabs.map((tab, index) => {
          const TabContent = tab.content;

          return (
            <Tabs.Panel
              key={index}
              value={tab.label}
              className={classes.panelContainer}
            >
              <TabContent />
            </Tabs.Panel>
          );
        })}
      </ScrollArea>
      <DeckTabHeader />
    </Tabs>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  const { remainingHeight, navbarHeight } = useNavbarHeight();

  return {
    tab: {
      height: remainingHeight,
    },

    tabStyle: {
      padding: '1em',
      paddingRight: '1.25em',
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

    tabStyleHighlighted: {
      padding: '1em',
      paddingRight: '1.25em',
      borderColor: `${theme.fn.lighten(
        theme.colors.secondaryPurpleColors[0],
        0.25
      )} !important`,

      backgroundColor: theme.fn.rgba(
        theme.colors.secondaryPurpleColors[0],
        0.45
      ),

      '&:hover': {
        backgroundColor: theme.fn.rgba(
          theme.colors.secondaryPurpleColors[0],
          0.25
        ),
      },
    },

    panelContainer: {
      padding: '8px',
    },

    contain: {
      width: '100%',
      paddingLeft: '0.5em',
      top: navbarHeight,
      height: remainingHeight - navbarHeight,
      backgroundColor: theme.colors.secondaryBackgroundColor[0],
    },
  };
});

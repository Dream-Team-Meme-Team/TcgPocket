import { ScrollArea, Tabs, TabsValue, createStyles } from '@mantine/core';
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
                            <AdminTabHeader label={tab.label} />

                            {selectedGameId !== 0 ||
                            tab.label === AdminTabLabel.Games ? (
                                <TabContent />
                            ) : (
                                <div className={classes.noSelectedGame}>
                                    Please Select a Game
                                </div>
                            )}
                        </Tabs.Panel>
                    );
                })}
            </ScrollArea>
        </Tabs>
    );
}

const useStyles = createStyles((theme) => {
    const { remainingHeight } = useNavbarHeight();

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
            height: '100%',
            backgroundColor: theme.colors.secondaryBackgroundColor[0],
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

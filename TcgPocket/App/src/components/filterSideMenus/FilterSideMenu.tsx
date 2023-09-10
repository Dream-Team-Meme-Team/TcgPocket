import { useSelector } from 'react-redux';
import { AppState, dispatch } from '../../store/configureStore';
import { RenderFilterOptions } from './modules/RenderFilterOption';
import { Collapse, MantineTheme, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { PrimarySelect } from '../inputs/PrimarySelect';
import { removeAllFiltersOnInventory } from '../../store/inventorySlice';
import { useState } from 'react';
import { GameDTO } from '../../models/Game';
import { useDisclosure } from '@mantine/hooks';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { FilterBadge } from '../badges/FilterBadge';
import { GameProperty } from '../../models/GameProperty';

export type FilterSideMenuProps = {
    appliedFilters: GameDTO[];
    handleTogglingFilter: (arg: GameDTO) => void;
    handleSelectAllFilters: (arg: GameProperty[]) => void;
    handleRemoveFilter: (arg: GameDTO) => void;
};

export function FilterSideMenu({
    appliedFilters,
    handleRemoveFilter,
    handleSelectAllFilters,
    handleTogglingFilter,
}: FilterSideMenuProps): React.ReactElement {
    const { classes } = useStyles();

    const $games = useSelector((state: AppState) => state.data.games);
    const $cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const $sets = useSelector((state: AppState) => state.data.sets);
    const $rarities = useSelector((state: AppState) => state.data.rarities);

    const [opened, { toggle }] = useDisclosure();

    const [selectedGame, setSelectedGame] = useState<GameDTO>({
        id: 0,
        name: '',
    });

    const handleSelectChange = (
        game: string | React.ChangeEvent<HTMLInputElement> | null
    ) => {
        dispatch(removeAllFiltersOnInventory());

        const foundGame = $games.find((value) => value.name === game);
        if (foundGame === undefined) {
            setSelectedGame({ id: 0, name: '' });
        } else setSelectedGame(foundGame);
    };

    const appliedFiltersButtonText = !opened
        ? 'Show Applied Filters'
        : 'Hide Applied Filters';

    return (
        <div className={classes.container}>
            <div className={classes.showFiltersBtnContainer}>
                <PrimaryButton
                    onClick={toggle}
                    disabled={appliedFilters.length === 0}
                >
                    {appliedFiltersButtonText}
                </PrimaryButton>
            </div>

            <Collapse
                in={opened && appliedFilters.length !== 0}
                className={classes.appliedFiltersCollapse}
            >
                {appliedFilters.map((filter) => {
                    return (
                        <FilterBadge
                            filter={filter}
                            handleRemoveFilter={handleRemoveFilter}
                        />
                    );
                })}
            </Collapse>

            <div className={classes.gameSelectContainer}>
                <PrimarySelect
                    clearable
                    searchable
                    withinPortal
                    label="Select Game:"
                    value={selectedGame.name}
                    data={$games.map((game) => game.name)}
                    onChange={(value) => handleSelectChange(value)}
                />
            </div>

            <div className={classes.filterCategoryContainer}>
                <RenderFilterOptions
                    filterName="Card Type"
                    filterOptions={$cardTypes}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterOptions
                    filterName="Set"
                    filterOptions={$sets}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterOptions
                    filterName="Rarity"
                    filterOptions={$rarities}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => ({
    container: {
        display: 'grid',
        height: '100vh',
        alignContent: 'flex-start',

        borderRightWidth: 2,
        borderRightStyle: 'solid',
        borderRightColor: theme.colors.primaryColor[0],
    },

    showFiltersBtnContainer: {
        display: 'flex',
        justifyContent: 'center',

        paddingTop: defaultPadding,
    },

    appliedFiltersCollapse: {
        paddingTop: defaultPadding,
    },

    gameSelectContainer: {
        display: 'flex',
        justifyContent: 'center',

        gap: defaultGap,
        padding: defaultPadding,
    },

    filterCategoryContainer: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.colors.primaryColor[0],
    },

    title: {
        display: 'flex',
        justifyContent: 'center',

        fontSize: 20,
        fontWeight: 'bold',
    },

    filterBadgeContainer: {
        display: 'flex',
        justifyContent: 'center',

        gap: defaultGap,
        flexWrap: 'wrap',
    },
}));

import { useSelector } from 'react-redux';
import { AppState, dispatch } from '../../store/configureStore';
import { MantineTheme, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { PrimarySelect } from '../inputs/PrimarySelect';
import { removeAllFiltersOnInventory } from '../../store/inventorySlice';
import { useEffect, useState } from 'react';
import { GameGetDto } from '../../types/games';
import React from 'react';
import { ToggleShowAppliedFilters } from './modules/ToggleShowAppliedFilters';
import { FilterCategories } from './modules/FilterCatergories';

export type FilterSideMenuProps = {
    appliedFilters: GameGetDto[];
    handleTogglingFilter: (arg: GameGetDto) => void;
    handleSelectAllFilters: (arg: GameGetDto[]) => void;
    handleRemoveFilter: (arg: GameGetDto) => void;
};

export function FilterSideMenu({
    appliedFilters,
    handleRemoveFilter,
    handleSelectAllFilters,
    handleTogglingFilter,
}: FilterSideMenuProps): React.ReactElement {
    const { classes } = useStyles();

    const $games = useSelector((state: AppState) => state.data.games);

    const [selectedGame, setSelectedGame] = useState<GameGetDto>({
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

    // useEffect(() => {
    //     // this is WRONG and im working on it
    //     getGames();
    // }, []);

    console.log($games);

    return (
        <div className={classes.filterSideMenuContainer}>
            <ToggleShowAppliedFilters
                appliedFilters={appliedFilters}
                handleRemoveFilter={handleRemoveFilter}
            />

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

            <FilterCategories
                appliedFilters={appliedFilters}
                handleSelectAllFilters={handleSelectAllFilters}
                handleTogglingFilter={handleTogglingFilter}
            />
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => ({
    filterSideMenuContainer: {
        display: 'grid',
        height: '100vh',
        alignContent: 'flex-start',

        borderRightWidth: 2,
        borderRightStyle: 'solid',
        borderRightColor: theme.colors.primaryColor[0],
    },

    gameSelectContainer: {
        display: 'flex',
        justifyContent: 'center',

        gap: defaultGap,
        padding: defaultPadding,
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

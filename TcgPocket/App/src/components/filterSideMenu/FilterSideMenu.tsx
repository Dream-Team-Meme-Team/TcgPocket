import { useSelector } from 'react-redux';
import { AppState, dispatch } from '../../store/configureStore';
import { MantineTheme, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { PrimarySelect } from '../inputs/PrimarySelect';
import { removeAllFiltersOnInventory } from '../../store/inventorySlice';
import { useState } from 'react';
import { GameDTO } from '../../models/Game';
import { GameProperty } from '../../models/GameProperty';
import { ToggleShowAppliedFilters } from './modules/ToggleShowAppliedFilters';
import { FilterCategories } from './modules/FilterCatergories';

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

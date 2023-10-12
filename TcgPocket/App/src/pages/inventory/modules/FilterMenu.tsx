import { MantineTheme, ScrollArea, createStyles } from '@mantine/core';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { useState } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { useEffectOnce } from 'react-use';
import { getAllGames } from '../../../services/dataServices/GameServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { GameGetDto } from '../../../types/games';
import { shallowEqual } from 'react-redux';
import { getAllAttributes } from '../../../services/dataServices/AttributeServices';
import { getAllCardTypes } from '../../../services/dataServices/CardTypeServices';
import { getAllRarities } from '../../../services/dataServices/RarityServices';
import { getAllSets } from '../../../services/dataServices/SetServices';
import { FilterCategoryAndOptions } from './FilterCategoryAndOptions';
import { useNavbarHeight } from '../../../hooks/use-navbar-height';
import { CardTypeGetDto } from '../../../types/card-types';
import { CardFilterDto } from '../../../types/cards';

type Category = {
    label: string;
    data: CardTypeGetDto[];
};

export type FilterActions = {
    handleTogglingFilter: (arg: any) => void;
    handleSelectAllFilters: (arg: any) => void;
    handleRemoveFilter: (arg: any) => void;
    setCardFilters: (arg: any) => void;
    cardFilters: CardFilterDto;
};

export type FilterMenuProps = {
    actions: FilterActions;
    appliedFilters: CardTypeGetDto[];
};

export function FilterMenu({
    appliedFilters,
    actions,
}: FilterMenuProps): React.ReactElement {
    const { classes } = useStyles();

    const [games, cardTypes, sets, rarities, attributes] = useAppSelector(
        (state) => [
            state.data.games,
            state.data.cardTypes,
            state.data.sets,
            state.data.rarities,
            state.data.attributes,
        ],
        shallowEqual
    );

    const categories: Category[] = [
        { label: 'Card Type', data: cardTypes },
        { label: 'Sets', data: sets },
        { label: 'Rarities', data: rarities },
        { label: 'Attributes', data: attributes },
    ];

    const [selectedGame, setSelectedGame] = useState<GameGetDto | null>(null);

    const handleSelectChange = (
        value: string | React.ChangeEvent<HTMLInputElement> | null
    ) => {
        const foundGame = games.find((game) => game.name === value) ?? null;
        setSelectedGame(foundGame);
    };

    useEffectOnce(() => {
        dispatch(getAllGames()).then(({ payload }) => responseWrapper(payload));
        dispatch(getAllCardTypes()).then(({ payload }) =>
            responseWrapper(payload)
        );
        dispatch(getAllSets()).then(({ payload }) => responseWrapper(payload));
        dispatch(getAllRarities()).then(({ payload }) =>
            responseWrapper(payload)
        );
        dispatch(getAllAttributes()).then(({ payload }) =>
            responseWrapper(payload)
        );
    });

    return (
        <div className={classes.menu}>
            <div className={classes.select}>
                <PrimarySelect
                    clearable
                    searchable
                    withinPortal
                    label="Select Game:"
                    value={selectedGame ? selectedGame.name : ''}
                    data={games.map((game) => game.name)}
                    labelProps={games.map((game) => game.name)}
                    onChange={handleSelectChange}
                />
            </div>

            <ScrollArea className={classes.container}>
                {categories.map((category) => (
                    <FilterCategoryAndOptions
                        {...actions}
                        label={category.label}
                        data={category.data}
                        appliedFilters={appliedFilters}
                        selectedGame={selectedGame}
                    />
                ))}
            </ScrollArea>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => {
    const { remainingHeight } = useNavbarHeight();

    return {
        menu: {
            display: 'grid',
            height: remainingHeight,
            alignContent: 'flex-start',

            borderRightWidth: 2,
            borderRightStyle: 'solid',
            borderRightColor: theme.colors.primaryPurpleColor[0],
        },

        select: {
            display: 'flex',
            justifyContent: 'center',
        },

        container: {
            display: 'grid',
            alignContent: 'flex-start',

            height: remainingHeight,
            overflow: 'auto',
        },
    };
});

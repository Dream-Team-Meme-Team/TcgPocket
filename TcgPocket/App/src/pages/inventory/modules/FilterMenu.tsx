import { MantineTheme, ScrollArea, createStyles } from '@mantine/core';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { dispatch, useAppSelector } from '../../../store/ConfigureStore';
import { useEffectOnce } from 'react-use';
import { getAllGames } from '../../../services/dataServices/GameServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { GameGetDto } from '../../../types/games';
import { shallowEqual } from 'react-redux';
import { getAllAttributes } from '../../../services/dataServices/AttributeServices';
import { getAllCardTypes } from '../../../services/dataServices/CardTypeServices';
import { getAllRarities } from '../../../services/dataServices/RarityServices';
import { getAllSets } from '../../../services/dataServices/SetServices';
import { CardTypeGetDto } from '../../../types/card-types';
import { useNavbarHeight } from '../../../hooks/useNavbarHeight';
import { CategoryAndOptions } from './CategoryAndOptions';
import { CategoryLabel } from '../../../enums/categoryLabel';

export type Category = {
    label: CategoryLabel;
    data: CardTypeGetDto[];
    appliedFilters: number[];
};

type FilterMenuProps = {
    selectedGame: GameGetDto | null;
    setSelectedGame: (arg: GameGetDto | null) => void;
};

export function FilterMenu({
    selectedGame,
    setSelectedGame,
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

    const [cardTypeFilters, setFilters, rarityFilters] = useAppSelector(
        (state) => [
            state.inventory.cardTypeFilters,
            state.inventory.setFilters,
            state.inventory.rarityFilters,
        ],
        shallowEqual
    );

    const categories: Category[] = [
        {
            label: CategoryLabel.CardTypes,
            data: cardTypes,
            appliedFilters: cardTypeFilters,
        },
        { label: CategoryLabel.Sets, data: sets, appliedFilters: setFilters },
        {
            label: CategoryLabel.Rarities,
            data: rarities,
            appliedFilters: rarityFilters,
        },
        {
            label: CategoryLabel.Attributes,
            data: attributes,
            appliedFilters: [],
        },
    ];

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
                    onChange={handleSelectChange}
                />
            </div>

            <div className={classes.container}>
                <ScrollArea>
                    {categories.map((category, index) => (
                        <CategoryAndOptions
                            key={index}
                            selectedGame={selectedGame}
                            label={category.label}
                            data={category.data}
                            appliedFilters={category.appliedFilters}
                        />
                    ))}
                </ScrollArea>
            </div>
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

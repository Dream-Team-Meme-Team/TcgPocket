import { useSelector } from 'react-redux';
import { AppState } from '../../store/configureStore';
import { RenderFilterOptions } from './modules/RenderFilterOption';
import { MantineTheme, createStyles, Text } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { FilterBadge } from './modules/FilterBadge';

export function FilterSelector(): React.ReactElement {
    const { classes } = useFilterSelectorStyles();

    const $games = useSelector((state: AppState) => state.data.games);
    const $cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const $sets = useSelector((state: AppState) => state.data.sets);
    const $rarities = useSelector((state: AppState) => state.data.rarities);

    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <Text>Applied Filters</Text>

                <FilterBadge filterName="pokemon" />
            </div>
            <div>
                <RenderFilterOptions filterName="Game" filterOptions={$games} />
                <RenderFilterOptions
                    filterName="Card Type"
                    filterOptions={$cardTypes}
                />
                <RenderFilterOptions filterName="Set" filterOptions={$sets} />
                <RenderFilterOptions
                    filterName="Rarity"
                    filterOptions={$rarities}
                />
            </div>
        </div>
    );
}

const useFilterSelectorStyles = createStyles((theme: MantineTheme) => ({
    container: {
        display: 'grid',

        borderRightWidth: 2,
        borderRightStyle: 'solid',
        borderRightColor: theme.colors.primaryColor[0],
    },

    titleContainer: {
        display: 'grid',
        justifyContent: 'center',

        gap: defaultGap,
        padding: defaultPadding,

        fontSize: 20,
        fontWeight: 'bold',

        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderColor: theme.colors.primaryColor[0],
    },

    filterOptionContainer: {
        display: 'grid',
    },
}));

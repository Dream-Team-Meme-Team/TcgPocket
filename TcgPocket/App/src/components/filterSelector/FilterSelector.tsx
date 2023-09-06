import { useSelector } from 'react-redux';
import { AppState } from '../../store/configureStore';
import { RenderFilterOptions } from './modules/RenderFilterOption';
import { MantineTheme, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { PrimarySelect } from '../mantineComponentsStyling/PrimarySelect';

export function FilterSelector(): React.ReactElement {
    const { classes } = useFilterSelectorStyles();

    // Data State
    const $games = useSelector((state: AppState) => state.data.games);
    const $cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const $sets = useSelector((state: AppState) => state.data.sets);
    const $rarities = useSelector((state: AppState) => state.data.rarities);

    return (
        <div className={classes.container}>
            <div className={classes.gameSelectContainer}>
                <PrimarySelect
                    clearable
                    data={$games.map((game) => game.name)}
                    label="Select Game:"
                />
            </div>
            <div>
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

    gameSelectContainer: {
        display: 'grid',
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

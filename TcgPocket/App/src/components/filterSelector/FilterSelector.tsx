import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/configureStore';
import { RenderFilterOptions } from './modules/RenderFilterOption';
import { MantineTheme, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { PrimartSelect } from '../inputs/PrimarySelect';
import { RootSliceName } from '../../models/RootState';
import { removeAllFiltersOnInventory } from '../../store/inventorySlice';

export interface FilterSelectorProps {
    slice: RootSliceName;
}

export function FilterSelector({
    slice,
}: FilterSelectorProps): React.ReactElement {
    const { classes } = useFilterSelectorStyles();
    const dispatch = useDispatch();

    // Data State
    const $games = useSelector((state: AppState) => state.data.games);
    const $cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const $sets = useSelector((state: AppState) => state.data.sets);
    const $rarities = useSelector((state: AppState) => state.data.rarities);

    const handleSelectChange = () => {
        dispatch(removeAllFiltersOnInventory());
    };

    return (
        <div className={classes.container}>
            <div className={classes.gameSelectContainer}>
                <PrimartSelect
                    clearable
                    label="Select Game:"
                    data={$games.map((game) => game.name)}
                    onChange={handleSelectChange}
                />
            </div>

            <div>
                <RenderFilterOptions
                    slice={slice}
                    filterName="Card Type"
                    filterOptions={$cardTypes}
                />
                <RenderFilterOptions
                    slice={slice}
                    filterName="Set"
                    filterOptions={$sets}
                />
                <RenderFilterOptions
                    slice={slice}
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

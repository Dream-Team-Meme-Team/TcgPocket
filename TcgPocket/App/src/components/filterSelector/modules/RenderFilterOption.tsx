import { Checkbox, Text, createStyles } from '@mantine/core';
import { Games } from '../../../constants/fakeData/inventoryData';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    InventoryState,
    removeAllFiltersOnInventory,
    toggleAppliedFilterOnInventory,
} from '../../../store/inventorySlice';
import { FilterSelectorProps } from '../FilterSelector';
import { useShallowEqualSelector } from '../../../models/RootState';
import { AppState, dispatch } from '../../../store/configureStore';

type RenderFilterOptionsProps = FilterSelectorProps & {
    filterName: string;
    filterOptions: Games[];
};

export function RenderFilterOptions({
    filterName,
    filterOptions,
    slice,
}: RenderFilterOptionsProps): React.ReactElement {
    const { classes } = useFilterOptionStyles();

    // const $appliedFilters = useSelector(
    //     (state: AppState) => state.inventory.appliedFilters
    // );

    const $selectedSlice = useSelector((state: AppState) => state[slice]);

    const $appliedFilters = ($selectedSlice as InventoryState).appliedFilters;

    const handleCheck = (option: Games) => {
        dispatch(toggleAppliedFilterOnInventory(option));
    };

    return (
        <div className={classes.renderFilterOptionsContainer}>
            <Text className={classes.filterNameText}> {filterName} </Text>

            <div className={classes.filterOptionsCheckboxContainer}>
                {filterOptions.map((option) => (
                    <Checkbox
                        key={option.id}
                        label={option.name}
                        onChange={() => handleCheck(option)}
                        checked={$appliedFilters.some(
                            (filter) => filter.id === option.id
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

const useFilterOptionStyles = createStyles(() => ({
    renderFilterOptionsContainer: {
        display: 'grid',
        gridTemplateRows: 'auto auto',

        gap: defaultGap,
        paddingLeft: defaultPadding,
    },

    filterOptionsCheckboxContainer: {
        display: 'grid',
        paddingLeft: defaultPadding,

        gap: defaultGap,
    },

    filterNameText: {
        fontWeight: 'bold',
    },
}));

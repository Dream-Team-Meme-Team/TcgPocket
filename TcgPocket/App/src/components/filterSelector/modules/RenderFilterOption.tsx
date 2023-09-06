import { Checkbox, Text, createStyles } from '@mantine/core';
import { Games } from '../../../constants/fakeData/inventoryData';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAppliedFilter } from '../../../store/inventorySlice';
import { AppState } from '../../../store/configureStore';

interface RenderFilterOptionsProps {
    filterName: string;
    filterOptions: Games[];
}

export function RenderFilterOptions({
    filterName,
    filterOptions,
}: RenderFilterOptionsProps) {
    const { classes } = useFilterOptionStyles();
    const dispatch = useDispatch();

    const $appliedFilters = useSelector(
        (state: AppState) => state.inventory.appliedFilters
    );

    const handleCheck = (option: Games) => {
        dispatch(toggleAppliedFilter(option));
    };

    return (
        <div className={classes.renderFilterOptionsContainer}>
            <Text className={classes.filterNameText}> {filterName} </Text>

            <div className={classes.filterOptionsCheckboxContainer}>
                {filterOptions.map((option) => (
                    <Checkbox
                        key={option.id}
                        label={option.name}
                        onClick={() => handleCheck(option)}
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

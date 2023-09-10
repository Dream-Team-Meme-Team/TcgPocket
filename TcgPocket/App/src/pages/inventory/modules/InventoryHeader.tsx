import { MantineTheme, createStyles, Text } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/configureStore';
import { FilterBadge } from '../../../components/badges/FilterBadge';

export function InventoryHeader(): React.ReactElement {
    const { classes } = useInventoryHeaderStyles();

    const $appliedFilters = useSelector(
        (state: AppState) => state.inventory.appliedFilters
    );

    return (
        <div className={classes.inventoryHeader}>
            <Text> Applied Filters: </Text>

            {$appliedFilters.map((filter) => (
                <FilterBadge key={filter.id} filter={filter} />
            ))}
        </div>
    );
}

const useInventoryHeaderStyles = createStyles((theme: MantineTheme) => ({
    inventoryHeader: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',

        padding: defaultPadding,
        gap: defaultGap,

        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderColor: theme.colors.primaryColor[0],
    },
}));

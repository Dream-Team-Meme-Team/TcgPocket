import { useSelector } from 'react-redux';
import { RenderFilterCategoryAndOptions } from './RenderFilterCategoryAndOptions';
import { AppState } from '../../../store/configureStore';
import { MantineTheme, createStyles } from '@mantine/core';
import { FilterSideMenuProps } from '../FilterSideMenu';

type FilterCategoriesProps = Omit<FilterSideMenuProps, 'handleRemoveFilter'>;

export function FilterCategories({
    appliedFilters,
    handleSelectAllFilters,
    handleTogglingFilter,
}: FilterCategoriesProps): React.ReactElement {
    const { classes } = useStyles();

    const $cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const $sets = useSelector((state: AppState) => state.data.sets);
    const $rarities = useSelector((state: AppState) => state.data.rarities);

    return (
        <div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Card Type"
                    filterOptions={$cardTypes}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Set"
                    filterOptions={$sets}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Rarity"
                    filterOptions={$rarities}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => ({
    filterCategoryContainer: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.colors.primaryColor[0],
    },
}));

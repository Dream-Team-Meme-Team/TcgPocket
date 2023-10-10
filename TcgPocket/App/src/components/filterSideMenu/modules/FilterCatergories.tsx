import { shallowEqual } from 'react-redux';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { MantineTheme, createStyles } from '@mantine/core';
import { FilterSideMenuProps } from '../FilterSideMenu';
import { RenderFilterCategoryAndOptions } from './RenderFilterCategoryAndOptions';
import { useEffect } from 'react';
import { getAllCardTypes } from '../../../services/dataServices/CardTypeServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { getAllSets } from '../../../services/dataServices/SetServices';
import { getAllRarities } from '../../../services/dataServices/RarityServices';
import { getAllAttributes } from '../../../services/dataServices/AttributeServices';

type FilterCategoriesProps = Omit<FilterSideMenuProps, 'handleRemoveFilter'> & {
    selectedGameId: number;
};

export function FilterCategories({
    appliedFilters,
    handleSelectAllFilters,
    handleTogglingFilter,
    selectedGameId,
}: FilterCategoriesProps): React.ReactElement {
    const { classes } = useStyles();

    const [cardTypes, sets, rarities, attributes] = useAppSelector(
        (state) => [
            state.data.cardTypes,
            state.data.sets,
            state.data.rarities,
            state.data.attributes,
        ],
        shallowEqual
    );

    const loadCardTypes = () => {
        dispatch(getAllCardTypes()).then(({ payload }) =>
            responseWrapper(payload)
        );
    };

    const loadSets = () => {
        dispatch(getAllSets()).then(({ payload }) => responseWrapper(payload));
    };

    const loadRarities = () => {
        dispatch(getAllRarities()).then(({ payload }) =>
            responseWrapper(payload)
        );
    };

    const loadAttributes = () => {
        dispatch(getAllAttributes()).then(({ payload }) =>
            responseWrapper(payload)
        );
    };

    useEffect(() => {
        if (selectedGameId === 0) return;

        loadCardTypes();
        loadSets();
        loadRarities();
        loadAttributes();
    }, [selectedGameId]);

    return (
        <div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Card Type"
                    filterOptions={cardTypes}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                    disabled={selectedGameId === 0}
                    selectedGameId={selectedGameId}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Set"
                    filterOptions={sets}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                    disabled={selectedGameId === 0}
                    selectedGameId={selectedGameId}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Rarity"
                    filterOptions={rarities}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                    disabled={selectedGameId === 0}
                    selectedGameId={selectedGameId}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Attributes"
                    filterOptions={attributes}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                    disabled={selectedGameId === 0}
                    selectedGameId={selectedGameId}
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

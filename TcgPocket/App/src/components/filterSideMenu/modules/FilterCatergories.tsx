import { useSelector } from 'react-redux';
import { AppState, dispatch } from '../../../store/configureStore';
import { MantineTheme, createStyles } from '@mantine/core';
import { FilterSideMenuProps } from '../FilterSideMenu';
import { RenderFilterCategoryAndOptions } from './RenderFilterCategoryAndOptions';
import { useEffect } from 'react';
import { getAllCardTypes } from '../../../services/dataServices/CardTypeServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { getAllSets } from '../../../services/dataServices/SetServices';
import { getAllRarities } from '../../../services/dataServices/RarityServices';
import { GameGetDto } from '../../../types/games';

type FilterCategoriesProps = Omit<FilterSideMenuProps, 'handleRemoveFilter'> & {
    selectedGame: GameGetDto;
};

export function FilterCategories({
    appliedFilters,
    handleSelectAllFilters,
    handleTogglingFilter,
    selectedGame,
}: FilterCategoriesProps): React.ReactElement {
    const { classes } = useStyles();

    const cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const sets = useSelector((state: AppState) => state.data.sets);
    const rarities = useSelector((state: AppState) => state.data.rarities);

    const loadCardTypes = async () => {
        const { payload } = await dispatch(getAllCardTypes());
        responseWrapper(payload);
    };

    const loadSets = async () => {
        const { payload } = await dispatch(getAllSets());
        responseWrapper(payload);
    };

    const loadRarities = async () => {
        const { payload } = await dispatch(getAllRarities());
        responseWrapper(payload);
    };

    useEffect(() => {
        loadCardTypes();
        loadSets();
        loadRarities();
    }, [selectedGame]);

    return (
        <div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Card Type"
                    filterOptions={cardTypes}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Set"
                    filterOptions={sets}
                    appliedFilters={appliedFilters}
                    handleSelectAllFilters={handleSelectAllFilters}
                    handleTogglingFilter={handleTogglingFilter}
                />
            </div>
            <div className={classes.filterCategoryContainer}>
                <RenderFilterCategoryAndOptions
                    filterName="Rarity"
                    filterOptions={rarities}
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

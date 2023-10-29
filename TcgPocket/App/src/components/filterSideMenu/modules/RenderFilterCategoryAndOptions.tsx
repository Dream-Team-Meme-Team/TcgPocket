import { Checkbox, Collapse, Text, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { useDisclosure } from '@mantine/hooks';
import { PrimaryBadge } from '../../badges/PrimaryBadge';
import { useEffect, useMemo, useState } from 'react';
import { PrimaryInput } from '../../inputs/PrimaryInput';
import {
    IconArrowBadgeDown,
    IconArrowBadgeUp,
    IconSearch,
} from '@tabler/icons-react';
import { FilterSideMenuProps } from '../FilterSideMenu';
import { CardTypeGetDto } from '../../../types/card-types';
import { CardsService } from '../../../services/cardsService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { CardFilterDto } from '../../../types/cards';

type RenderFilterOptionsProps = Omit<
    FilterSideMenuProps,
    'handleRemoveFilter'
> & {
    filterName: string;
    filterOptions: CardTypeGetDto[];
    selectedGameId: number;
};

export function RenderFilterCategoryAndOptions({
    filterName,
    filterOptions,
    appliedFilters,
    handleSelectAllFilters,
    handleTogglingFilter,
    selectedGameId,
}: RenderFilterOptionsProps): React.ReactElement {
    const { classes } = useStyles();

    const [opened, { toggle, close }] = useDisclosure();
    const [searchText, setSearchText] = useState('');

    const numOfAppliedFilters = useMemo(() => {
        const foundFilterCategory = filterOptions.filter((option) =>
            appliedFilters.find((filter) => filter.name === option.name)
        );

        return foundFilterCategory.length;
    }, [appliedFilters]);

    const filteredFilterOptions = useMemo(() => {
        return filterOptions
            .filter((option) => option.gameId === selectedGameId)
            .filter((option) =>
                option.name.toLowerCase().includes(searchText.toLowerCase())
            );
    }, [searchText, selectedGameId]);

    const getCards = async (filterId: number) => {
        const response = await CardsService.getAllCards({
            gameId: selectedGameId,
            cardTypeId: filterId,
        });
        responseWrapper(response);
        console.log(response);
    };

    useEffect(() => {
        close();
    }, [selectedGameId]);

    useEffect(() => {
        const foundAppliedFilter = filterOptions.find((option) => {
            return appliedFilters.find((filter) => filter.id === option.id);
        });

        if (!foundAppliedFilter) return;

        getCards(foundAppliedFilter.id);
    }, [appliedFilters]);

    return (
        <div className={classes.renderFilterOptionsContainer}>
            <div className={classes.filterCategoryContainer}>
                <div
                    aria-disabled={selectedGameId === 0}
                    className={
                        selectedGameId === 0
                            ? classes.disabled
                            : classes.filterCategoryNameContainer
                    }
                    onClick={() =>
                        selectedGameId === 0 ? undefined : toggle()
                    }
                >
                    {opened ? <IconArrowBadgeUp /> : <IconArrowBadgeDown />}
                    <Text>{filterName}</Text>
                </div>
                <PrimaryBadge> {numOfAppliedFilters} </PrimaryBadge>
            </div>

            <Collapse
                in={opened}
                className={classes.filterCategoryOptionsContainer}
            >
                <div className={classes.searchInputContainer}>
                    <PrimaryInput
                        className={classes.searchInput}
                        icon={<IconSearch />}
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className={classes.optionsContainer}>
                    {searchText === '' && (
                        <div className={classes.selectAllContainer}>
                            <Checkbox
                                label="Select All"
                                onChange={() =>
                                    handleSelectAllFilters(filterOptions)
                                }
                                checked={
                                    appliedFilters.length ===
                                    filterOptions.length
                                }
                            />
                        </div>
                    )}

                    <div className={classes.checkBoxContainer}>
                        {filteredFilterOptions.map((option) => (
                            <Checkbox
                                key={option.id}
                                label={option.name}
                                onChange={() => handleTogglingFilter(option)}
                                checked={appliedFilters.some(
                                    (filter) => filter.id === option.id
                                )}
                            />
                        ))}
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

const useStyles = createStyles(() => ({
    renderFilterOptionsContainer: {
        display: 'grid',
        gridTemplateRows: 'auto auto',

        gap: defaultGap,
        paddingLeft: defaultPadding,
    },

    filterCategoryContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto 50px',
        alignItems: 'center',

        paddingRight: defaultPadding,
        paddingTop: defaultPadding,
    },

    filterCategoryNameContainer: {
        display: 'flex',
        fontWeight: 'bold',

        cursor: 'pointer',
    },

    disabled: {
        display: 'flex',
        cursor: 'default',

        color: 'gray',
    },

    filterCategoryOptionsContainer: {
        display: 'grid',

        paddingBottom: defaultGap,
    },

    searchInputContainer: {
        display: 'flex',
        justifyContent: 'center',

        paddingBottom: defaultPadding,
    },

    searchInput: {
        width: '100%',
        paddingRight: defaultPadding,
    },

    optionsContainer: {
        height: 'auto',
        maxHeight: '45vh',

        overflow: 'auto',
    },

    selectAllContainer: {
        paddingBottom: defaultGap,
    },

    checkBoxContainer: {
        display: 'grid',

        gap: defaultGap,
    },
}));

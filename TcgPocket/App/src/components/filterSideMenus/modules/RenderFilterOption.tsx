import { Checkbox, Collapse, Text, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { useDisclosure } from '@mantine/hooks';
import { PrimaryBadge } from '../../badges/PrimaryBadge';
import { useMemo, useState } from 'react';
import { PrimaryInput } from '../../inputs/PrimaryInput';
import {
    IconArrowBadgeDown,
    IconArrowBadgeUp,
    IconSearch,
} from '@tabler/icons-react';
import { GameProperty } from '../../../models/GameProperty';
import { FilterSideMenuProps } from '../FilterSideMenu';

type RenderFilterOptionsProps = Omit<
    FilterSideMenuProps,
    'handleRemoveFilter'
> & {
    filterName: string;
    filterOptions: GameProperty[];
};

export function RenderFilterOptions({
    filterName,
    filterOptions,
    appliedFilters,
    handleSelectAllFilters,
    handleTogglingFilter,
}: RenderFilterOptionsProps): React.ReactElement {
    const { classes } = useStyles();

    const [opened, { toggle }] = useDisclosure();
    const [searchText, setSearchText] = useState('');

    const numOfAppliedFilters = useMemo(() => {
        const foundFilterCategory = filterOptions.filter((option) =>
            appliedFilters.find((filter) => filter.name === option.name)
        );

        return foundFilterCategory.length;
    }, [appliedFilters]);

    const filteredFilterOptions = useMemo(() => {
        return filterOptions.filter((option) =>
            option.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText]);

    return (
        <div className={classes.renderFilterOptionsContainer}>
            <div className={classes.filterNameTextContainer}>
                {!opened ? <IconArrowBadgeDown /> : <IconArrowBadgeUp />}
                <Text className={classes.filterNameText} onClick={toggle}>
                    {filterName}
                    <PrimaryBadge> {numOfAppliedFilters} </PrimaryBadge>
                </Text>
            </div>

            <Collapse in={opened} className={classes.filterCategoryContainer}>
                <div className={classes.searchInputContainer}>
                    <PrimaryInput
                        className={classes.searchInput}
                        icon={<IconSearch />}
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className={classes.selectAllContainer}>
                    <Checkbox
                        label="Select All"
                        onChange={() => handleSelectAllFilters(filterOptions)}
                        checked={appliedFilters.length === filterOptions.length}
                    />
                </div>

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
            </Collapse>
        </div>
    );
}

const useStyles = createStyles(() => ({
    renderFilterOptionsContainer: {
        display: 'grid',
        gridTemplateRows: 'auto auto',

        cursor: 'pointer',

        gap: defaultGap,
        paddingLeft: defaultPadding,
    },

    filterCategoryContainer: {
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

    selectAllContainer: {
        paddingBottom: defaultGap,
    },

    checkBoxContainer: {
        display: 'grid',
        gap: defaultGap,
    },

    filterNameTextContainer: {
        display: 'flex',
    },

    filterNameText: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingRight: defaultPadding,
        fontWeight: 'bold',
    },
}));

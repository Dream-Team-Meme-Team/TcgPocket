import { Collapse, createStyles } from '@mantine/core';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { defaultPadding } from '../../../constants/theme';
import { FilterBadge } from '../../badges/FilterBadge';
import { useDisclosure } from '@mantine/hooks';
import { FilterSideMenuProps } from '../FilterSideMenu';

type ToggleShowAppliedFiltersProps = Pick<
    FilterSideMenuProps,
    'appliedFilters' | 'handleRemoveFilter'
>;

export function ToggleShowAppliedFilters({
    appliedFilters,
    handleRemoveFilter,
}: ToggleShowAppliedFiltersProps): React.ReactElement {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure();

    const appliedFiltersButtonText = opened
        ? 'Hide Applied Filters'
        : 'Show Applied Filters';

    return (
        <div>
            <div className={classes.showFiltersBtnContainer}>
                <PrimaryButton
                    onClick={toggle}
                    disabled={appliedFilters.length === 0}
                >
                    {appliedFiltersButtonText}
                </PrimaryButton>
            </div>

            <Collapse
                in={opened && appliedFilters.length !== 0}
                className={classes.appliedFilterBadgesContainer}
            >
                {appliedFilters.map((filter) => {
                    return (
                        <FilterBadge
                            filter={filter}
                            handleRemoveFilter={handleRemoveFilter}
                        />
                    );
                })}
            </Collapse>
        </div>
    );
}

const useStyles = createStyles(() => ({
    showFiltersBtnContainer: {
        display: 'flex',
        justifyContent: 'center',

        paddingTop: defaultPadding,
    },

    appliedFilterBadgesContainer: {
        paddingTop: defaultPadding,
        paddingLeft: defaultPadding,
    },
}));

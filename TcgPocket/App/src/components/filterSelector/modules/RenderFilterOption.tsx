import { Checkbox, Text, createStyles } from '@mantine/core';
import { Games } from '../../../constants/fakeData/inventoryData';
import { defaultGap, defaultPadding } from '../../../constants/theme';

interface RenderFilterOptionsProps {
    filterName: string;
    filterOptions: Games[];
}

export function RenderFilterOptions({
    filterName,
    filterOptions,
}: RenderFilterOptionsProps) {
    const { classes } = useFilterOptionStyles();

    const handleTextClick = () => {
        console.log('filter clicked');
    };

    return (
        <div className={classes.renderFilterOptionsContainer}>
            <Text> {filterName} </Text>

            <div className={classes.filterOptionsCheckboxContainer}>
                {filterOptions.map((option) => (
                    <Checkbox key={option.id} label={option.name} />
                ))}
            </div>
            <Text onClick={handleTextClick}> Show More. . .</Text>
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
}));

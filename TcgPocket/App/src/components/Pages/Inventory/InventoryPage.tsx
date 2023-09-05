import { createStyles } from '@mantine/core';
import { FilterSelector } from '../../filterSelector/FilterSelector';

export function InventoryPage(): React.ReactElement {
    const { classes } = useInventoryStyles();

    return (
        <div className={classes.pageContainer}>
            <FilterSelector />
            <div>Uploaded Card Container</div>
        </div>
    );
}

const useInventoryStyles = createStyles(() => ({
    pageContainer: {
        display: 'grid',
        gridTemplateColumns: '20rem auto',
    },
}));

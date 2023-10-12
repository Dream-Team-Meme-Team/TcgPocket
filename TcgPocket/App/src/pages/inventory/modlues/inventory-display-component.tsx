import {
    Flex,
    Group,
    Pagination,
    ScrollArea,
    createStyles,
} from '@mantine/core';
import { CardDisplay } from '../../../components/card-display/card-display';
import { CardDisplayDto } from '../../../types/cards';
import { PagedResult } from '../../../types/shared';
import { useNavbarHeight } from '../../../hooks/use-navbar-height';

type InventoryDisplayProps = {
    paginatedCards?: PagedResult<CardDisplayDto> | null;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    isLoading: boolean;
};

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({
    paginatedCards: cards,
    setCurrentPage,
    currentPage,
    isLoading,
}) => {
    const { classes } = useStyles();

    return (
        <div className={classes.inventoryDisplayContainer}>
            <ScrollArea>
                <Group className={classes.inventoryDisplayGroup}>
                    {cards?.items.map((cards: CardDisplayDto) => (
                        <CardDisplay
                            key={cards.id}
                            isLoading={isLoading}
                            card={cards}
                        />
                    ))}
                </Group>
            </ScrollArea>

            <Pagination
                color={'violet'}
                withEdges
                siblings={2}
                boundaries={2}
                className={classes.paginationControls}
                value={currentPage}
                onChange={setCurrentPage}
                total={cards?.pageCount ?? 16}
            />

            {/* <Flex justify={'end'}></Flex> */}
        </div>
    );
};

const useStyles = createStyles(() => {
    const { remainingHeight } = useNavbarHeight();

    return {
        paginationControls: {
            display: 'flex',
            justifyContent: 'right',

            padding: '10px',
        },

        inventoryDisplayContainer: {
            display: 'grid',
            gridTemplateRows: '1fr auto',

            height: remainingHeight,
        },

        inventoryDisplayGroup: {
            backgroundColor: '#514254',
            padding: '40px',
            paddingTop: '10px',

            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
        },
    };
});

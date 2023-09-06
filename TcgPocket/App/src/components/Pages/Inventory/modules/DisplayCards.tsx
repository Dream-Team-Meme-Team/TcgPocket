import { Container, createStyles } from '@mantine/core';

export function DisplayCards(): React.ReactElement {
    const { classes } = useDisplayCardsStyling();
    return (
        <div className={classes.displayCardsContainer}>
            <Container> Container </Container>
        </div>
    );
}

const useDisplayCardsStyling = createStyles(() => ({
    displayCardsContainer: {
        display: 'flex',
    },
}));

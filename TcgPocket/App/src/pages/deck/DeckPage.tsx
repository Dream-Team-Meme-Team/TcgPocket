import { createStyles } from '@mantine/core';
import { defaultPadding } from '../../constants/theme';
import { DeckBuilderSteps } from './modules/DeckBuilderSteps';

export function DeckPage(): React.ReactElement {
    const { classes } = useStyles();

    return (
        <div className={classes.deckPageContainer}>
            <div className={classes.deckBuilderModalContainer}>
                <DeckBuilderSteps />
            </div>
            <div className={classes.currentDecksContainer}>
                View Current Decks
            </div>
        </div>
    );
}

const useStyles = createStyles(() => ({
    deckPageContainer: {
        display: 'grid',
        gridTemplateRows: 'auto auto',
    },

    deckBuilderModalContainer: {
        display: 'flex',
        justifyContent: 'center',

        paddingTop: defaultPadding,
    },

    currentDecksContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
}));

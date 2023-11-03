import { MantineTheme, createStyles } from '@mantine/core';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { Text } from '@mantine/core';
import { useState } from 'react';
import { useAppSelector } from '../../../store/configureStore';
import { GameGetDto } from '../../../types/games';

const cardTypes = [
    'Commander',
    'Artifact',
    'Creature',
    'Monster',
    'Fairy',
] as const;
const viewStyle = ['Grid', 'List'] as const;
const ruleSets = ['Any', 'Tournament', 'Standard', 'Etc'] as const;

export function BuilderDisplay(): React.ReactElement {
    const { classes } = useStyles();

    const games = useAppSelector((state) => state.data.games);

    const [view, setView] = useState<string>(viewStyle[1]);
    const [ruleSet, setRuleSet] = useState<string>(ruleSets[0]);
    const [selectedGame, setSelectedGame] = useState<GameGetDto | null>();

    const handleViewChange = (
        e: string | React.ChangeEvent<HTMLInputElement> | null
    ) => {
        if (typeof e === 'string') {
            setView(e);
        }
    };

    const handleRuleSetChange = (
        e: string | React.ChangeEvent<HTMLInputElement> | null
    ) => {
        if (typeof e === 'string') {
            setRuleSet(e);
        }
    };

    const handleGameChange = (
        e: string | React.ChangeEvent<HTMLInputElement> | null
    ) => {
        const foundGame = games.find((game) => game.name === e) ?? null;
        setSelectedGame(foundGame);
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <PrimarySelect
                    value={view}
                    data={viewStyle}
                    onChange={handleViewChange}
                />

                {/* game */}
                <PrimarySelect
                    value={selectedGame ? selectedGame.name : ''}
                    data={games.map((game) => game.name)}
                    onChange={handleGameChange}
                />

                {/* rule set */}
                <PrimarySelect
                    value={ruleSet}
                    data={ruleSets}
                    onChange={handleRuleSetChange}
                />
            </div>

            <div className={classes.body}>
                {cardTypes.map((type, index) => (
                    <div key={index}>
                        <div className={classes.groupHeading}>
                            <Text> {type} </Text>
                            <Text> (1) </Text>
                        </div>

                        <div>Cards</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => {
    return {
        container: {
            display: 'grid',
            gridTemplateRows: 'auto 1fr',

            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: theme.colors.primaryPurpleColor[0],
        },

        header: {
            display: 'grid',
            gridTemplateColumns: '1fr 4fr 3fr',

            padding: defaultPadding,
            gap: defaultGap,
        },

        body: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 250px)',
            justifyContent: 'center',
        },

        group: {
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
        },

        groupHeading: {
            display: 'flex',

            gap: defaultGap,
        },
    };
});

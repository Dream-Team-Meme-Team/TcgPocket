import { createStyles } from '@mantine/styles';
import { useState } from 'react';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { IconEdit } from '@tabler/icons-react';
import { PrimaryIconButton } from '../../../components/buttons/PrimaryIconButton';
import { MantineTheme, Text } from '@mantine/core';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { setName } from '../../../store/deckBuilderSlice';
import { defaultGap } from '../../../constants/theme';

export function DeckBuilderHeader(): React.ReactElement {
    const { classes } = useStyles();

    const name = useAppSelector((state) => state.deckBuilder.name);

    const [deckName, setDeckName] = useState<string>(name);
    const [editMode, setEditMode] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeckName(e.target.value);
    };

    const handleSave = () => {
        dispatch(setName(deckName));
        setEditMode(false);
    };

    return editMode ? (
        <div className={classes.editName}>
            <PrimaryTextInput value={deckName} onChange={handleNameChange} />

            <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        </div>
    ) : (
        <div className={classes.displayName}>
            <Text> {name} </Text>

            <PrimaryIconButton onClick={() => setEditMode(true)}>
                <IconEdit />
            </PrimaryIconButton>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => {
    const titleHeight = '7vh';

    return {
        displayName: {
            display: 'flex',
            alignItems: 'center',

            height: titleHeight,
            gap: defaultGap,

            fontSize: titleHeight,
            fontWeight: 'bolder',
        },

        editName: {
            display: 'flex',
            alignItems: 'center',

            height: titleHeight,
            gap: defaultGap,
        },
    };
});

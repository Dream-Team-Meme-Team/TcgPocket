import { MantineTheme, createStyles } from '@mantine/core';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { Text } from '@mantine/core';
import { useEffect } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { ViewStyle } from '../../../enums/viewStyle';
import { useForm } from '@mantine/form';
import { setSelectedDeckBuilderGame } from '../../../store/deckBuilderSlice';

const cardTypes = [
  'Commander',
  'Artifact',
  'Creature',
  'Monster',
  'Fairy',
] as const;

export function BuilderDisplay(): React.ReactElement {
  const { classes } = useStyles();

  const games = useAppSelector((state) => state.data.games);

  const selectedGame = useAppSelector(
    (state) => state.deckBuilder.selectedGame
  );

  const form = useForm({
    initialValues: {
      gameName: '',
      ruleSet: 'No Rules',
      view: ViewStyle.List,
    },
  });

  const viewStyle: string[] = [ViewStyle.Grid, ViewStyle.List];

  useEffect(() => {
    const foundGame = games.find((game) => game.name === form.values.gameName);

    dispatch(setSelectedDeckBuilderGame(foundGame ? foundGame : null));
  }, [form.values.gameName, games]);

  useEffect(() => {
    const name = selectedGame ? selectedGame.name : '';
    form.setValues({ gameName: name });
    // disabled because we DONT want to re-render when the form changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <PrimarySelect data={viewStyle} {...form.getInputProps('view')} />

        <PrimarySelect
          disabled={selectedGame !== null}
          data={games.map((game) => game.name)}
          {...form.getInputProps('gameName')}
        />

        <PrimarySelect
          disabled
          data={['No Rules']}
          {...form.getInputProps('ruleSet')}
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

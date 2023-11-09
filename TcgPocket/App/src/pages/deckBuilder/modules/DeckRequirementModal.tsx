import { PrimaryModal } from '../../../components/modals/PrimaryModal';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Divider, MantineTheme, Text, createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { IconArrowBack } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import {
  setDeckName,
  setSelectedDeckBuilderGame,
  setSelectedRuleSet,
} from '../../../store/deckBuilderSlice';
import { GameGetDto } from '../../../types/games';
import { useFormValidation } from '../../../helpers/useFormValidation';

type BuildDeckRequirements = {
  name: string;
  game: GameGetDto | null;
  ruleSet: string;
};

const initialValues: BuildDeckRequirements = {
  name: '',
  game: null,
  ruleSet: 'No Rules',
} as const;

type DeckRequirementModalProps = {
  open: boolean;
  toggle: () => void;
};

export function DeckRequirementModal({
  open,
  toggle,
}: DeckRequirementModalProps): React.ReactElement {
  const { classes } = useStyles();
  const { validateTextInput } = useFormValidation();

  const games = useAppSelector((state) => state.data.games);

  const form = useForm({
    initialValues: initialValues,
    validate: {
      name: (value) => (validateTextInput(value) ? 'Invalid Name' : null),
      game: (value) => (!value ? 'Invalid Game' : null),
    },
  });

  const goBack = () => {
    window.history.back();
  };

  const handleSubmit = (values: BuildDeckRequirements) => {
    dispatch(setDeckName(values.name));
    dispatch(setSelectedDeckBuilderGame(values.game));
    dispatch(setSelectedRuleSet(values.ruleSet));
    toggle();
  };

  return (
    <PrimaryModal
      opened={open}
      onClose={toggle}
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={750}
    >
      <div className={classes.body}>
        <div className={classes.leftSection}>
          <div className={classes.header}>
            <Text>Build Your </Text>
            <Text className={classes.headerDeck}> Deck </Text>
            <Text>. . .</Text>
          </div>

          <div className={classes.mainTextArea}>
            <Text>
              Get started with creating your own deck!
              <br />
              Create a name and select the game you want to build your deck for.
            </Text>

            <Text italic>
              While we are working on implementing rule sets, go crazy building
              any deck setup you want!
            </Text>
          </div>

          <div className={classes.return}>
            <Text>Not what you're looking for?</Text>
            <SecondaryButton onClick={goBack} leftIcon={<IconArrowBack />}>
              Go Back
            </SecondaryButton>
          </div>
        </div>

        <Divider orientation="vertical" color="#9d65db" size={2} />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className={classes.rightSection}>
            <div className={classes.form}>
              <PrimaryTextInput
                label="Deck Name"
                {...form.getInputProps('name')}
              />

              <PrimarySelect
                label="Game"
                data={games.map((game) => game.name)}
                {...form.getInputProps('game')}
              />

              <PrimarySelect
                label="Rule Set"
                data={['No Rules']}
                disabled
                {...form.getInputProps('ruleSet')}
              />
            </div>

            <div className={classes.bottomButtons}>
              <PrimaryButton type="submit" disabled={!form.isValid()}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </PrimaryModal>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    body: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      height: '50vh',

      gap: '24px',
    },

    leftSection: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',

      gap: defaultGap,
    },

    header: {
      display: 'flex',
      justifyContent: 'center',
      gap: defaultGap,

      fontSize: 24,
      fontWeight: 'bolder',
    },

    headerDeck: {
      color: theme.colors.primaryPurpleColor[0],
    },

    mainTextArea: {
      display: 'grid',

      gap: defaultGap,
    },

    return: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    rightSection: {
      display: 'grid',
      gridTemplateRows: '1fr auto',
      height: '100%',

      gap: defaultGap,
    },

    form: {
      display: 'flex',
      flexDirection: 'column',
    },

    bottomButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',

      paddingTop: defaultPadding,
    },
  };
});

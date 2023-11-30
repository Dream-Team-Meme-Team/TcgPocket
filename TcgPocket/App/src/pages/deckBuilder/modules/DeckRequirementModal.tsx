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
import { setSelectedRuleSet } from '../../../store/deckBuilderSlice';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { getAllGames } from '../../../services/dataServices/gameServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { useEffectOnce } from 'react-use';
import { getAllCards } from '../../../services/CardsService';
import { CardFilterDto } from '../../../types/cards';
import { createDeck } from '../../../services/DecksService';
import { DeckCreateDto } from '../../../types/decks';

export type BuildDeckRequirements = {
  deckName: string;
  gameName: string;
  ruleSet: string;
};

const initialValues: BuildDeckRequirements = {
  deckName: '',
  gameName: '',
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
      deckName: (value) => (validateTextInput(value) ? 'Invalid Name' : null),
      gameName: (value) => (value === '' ? 'Invalid Game' : null),
    },
  });

  const goBack = () => {
    window.history.back();
  };

  const handleSubmit = (values: BuildDeckRequirements) => {
    const foundGame = games.find((game) => game.name === values.gameName);

    const gameId = foundGame ? [foundGame.id] : undefined;

    const filtered: CardFilterDto = {
      gameIds: gameId,
      currentPage: 1,
      pageSize: 15,
    };

    if (!foundGame) return;

    const newDeck: DeckCreateDto = {
      name: values.deckName,
      gameId: foundGame?.id,
    };

    dispatch(createDeck(newDeck)).then(({ payload }) => {
      responseWrapper(payload, 'Deck Created');
    });

    dispatch(setSelectedRuleSet(values.ruleSet));
    dispatch(getAllCards(filtered)).then(({ payload }) => {
      responseWrapper(payload);
    });
    toggle();
  };

  useEffectOnce(() => {
    if (games.length !== 0) return;

    dispatch(getAllGames()).then(({ payload }) => {
      responseWrapper(payload);
    });
  });

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
                {...form.getInputProps('deckName')}
              />

              <PrimarySelect
                label="Game"
                data={games.map((game) => game.name)}
                {...form.getInputProps('gameName')}
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
                Create
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

import { useEffect, useMemo, useState } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { setDeckSearchTerm } from '../../../store/deckSlice';
import useDebounce from '../../../hooks/useDebounce';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Flex, MantineTheme, createStyles, Text } from '@mantine/core';
import { useNavbarHeight } from '../../../hooks/useNavbarHeight';
import { defaultGap } from '../../../constants/theme';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { routes } from '../../../routes/index';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { resetDeckBuilder } from '../../../store/deckBuilderSlice';

export function DeckTabHeader(): React.ReactElement {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [deckSearchTerm] = useAppSelector(
    (state) => [state.deck.searchTerm],
    shallowEqual
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNewDeck = () => {
    navigate(routes.deckBuilder);
    dispatch(resetDeckBuilder());
  };

  useMemo(() => {
    setSearchTerm(deckSearchTerm);
  }, [deckSearchTerm]);

  useEffect(() => {
    dispatch(setDeckSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.deckPageHeader}>
      <Flex
        align="center"
        justify={'space-between'}
        h="100%"
        className={classes.headerRow}
      >
        <Text className={classes.manageDecks}>Manage Decks</Text>
        <div className={classes.headerDivider} />

        <PrimaryTextInput
          icon={<IconSearch />}
          placeholder="Search Decks"
          value={searchTerm}
          onChange={handleInputChange}
          p="2em"
        />

        <PrimaryButton leftIcon={<IconPlus />} onClick={handleNewDeck}>
          New Deck
        </PrimaryButton>
      </Flex>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  const { navbarHeight } = useNavbarHeight();

  return {
    deckPageHeader: {
      paddingLeft: defaultGap,
      paddingRight: defaultGap,

      height: navbarHeight,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      marginLeft: 126.2,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    headerDivider: {
      height: '100%',
      width: '2px',
      margin: 0,

      backgroundColor: theme.colors.secondaryPurpleColors[0],
    },

    headerRow: {
      padding: '0.5em',
      paddingRight: '1.25em',
    },

    manageDecks: {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      paddingRight: '1.25em',

      fontSize: 'x-large',
      fontWeight: 'bolder',
    },
  };
});

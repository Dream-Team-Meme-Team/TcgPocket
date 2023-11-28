import { useEffect, useState } from 'react';
import { dispatch } from '../../../store/configureStore';
import { setDeckSearchTerm } from '../../../store/deckSlice';
import useDebounce from '../../../hooks/useDebounce';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Flex, MantineTheme, createStyles, Text } from '@mantine/core';
import { useNavbarHeight } from '../../../hooks/useNavbarHeight';
import { defaultGap } from '../../../constants/theme';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { routes } from '../../../routes/Index';
import { useNavigate } from 'react-router-dom';

export function DeckTabHeader(): React.ReactElement {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
        <Text> Manage Decks </Text>
        <div className={classes.headerDivider} />

        <PrimaryTextInput
          icon={<IconSearch />}
          placeholder="Search Decks"
          value={searchTerm}
          onChange={handleInputChange}
          w="75%"
        />

        <PrimaryButton
          leftIcon={<IconPlus />}
          onClick={() => navigate(routes.deckBuilder)}
        >
          {' '}
          New Deck{' '}
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
      marginLeft: 142.09,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    headerDivider: {
      height: '100%',
      width: '2px',
      margin: 0,
      marginRight: '0.5em',

      backgroundColor: theme.colors.secondaryPurpleColors[0],
    },

    headerRow: {
      padding: '0.5em',
      paddingRight: '1.25em',
      fontSize: 32,
      fontWeight: 'bolder',
    },
  };
});

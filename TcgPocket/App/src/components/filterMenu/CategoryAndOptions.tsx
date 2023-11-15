import {
  Box,
  Checkbox,
  Collapse,
  Group,
  MantineTheme,
  ScrollArea,
  createStyles,
  Text,
} from '@mantine/core';
import { defaultGap, defaultPadding } from '../../constants/theme';
import {
  IconArrowBadgeUp,
  IconArrowBadgeDown,
  IconSearch,
} from '@tabler/icons-react';
import { PrimaryBadge } from '../badges/PrimaryBadge';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { GameGetDto } from '../../types/games';
import { CardTypeGetDto } from '../../types/card-types';
import { CategoryLabel } from '../../enums/categoryLabel';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { FilterActions } from './FilterMenu';

type CategoryAndOptionsProps = {
  selectedGame: GameGetDto | null;
  label: CategoryLabel;
  data: CardTypeGetDto[];
  appliedFilters: number[];
  actions: FilterActions;
};

export function CategoryAndOptions({
  selectedGame,
  label,
  data,
  appliedFilters,
  actions,
}: CategoryAndOptionsProps): React.ReactElement {
  const { classes } = useStyles();

  const [opened, { toggle, close }] = useDisclosure();
  const [searchText, setSearchText] = useState<string>('');

  const filteredOptions = useMemo(() => {
    if (!selectedGame) return [];

    return data
      .filter((option) => option.gameId === selectedGame.id)
      .filter((option) =>
        option.name.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, selectedGame, data]);

  const numOfAppliedFilters = useMemo(() => {
    const foundApplied = filteredOptions.filter((option) =>
      appliedFilters.find((filterId) => filterId === option.id)
    );

    return foundApplied.length;
  }, [appliedFilters, filteredOptions]);

  const handleFilters = (option: CardTypeGetDto) => {
    switch (label) {
      case CategoryLabel.CardTypes:
        actions.toggleCardTypes(option.id);
        return;
      case CategoryLabel.Sets:
        actions.toggleSets(option.id);
        return;
      case CategoryLabel.Rarities:
        actions.toggleRarities(option.id);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    close();
  }, [close, selectedGame]);

  return (
    <div className={classes.category}>
      <Box
        onClick={() => selectedGame && toggle()}
        className={selectedGame ? classes.box : classes.boxDisabled}
      >
        <Group>
          {opened ? <IconArrowBadgeUp /> : <IconArrowBadgeDown />}

          <Text> {label} </Text>
        </Group>

        <PrimaryBadge>{numOfAppliedFilters}</PrimaryBadge>
      </Box>

      <Collapse in={opened}>
        <div className={classes.collapse}>
          <PrimaryTextInput
            icon={<IconSearch />}
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <ScrollArea mah={'50vh'}>
            <Box className={classes.options}>
              <div className={classes.data}>
                {filteredOptions.map((option, index) => (
                  <Checkbox
                    key={index}
                    label={option.name}
                    onChange={() => handleFilters(option)}
                    checked={appliedFilters.some(
                      (filter) => filter === option.id
                    )}
                  />
                ))}
              </div>
            </Box>
          </ScrollArea>
        </div>
      </Collapse>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    category: {
      padding: defaultPadding,

      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    box: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',

      cursor: 'pointer',
      fontWeight: 'bold',
    },

    boxDisabled: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',

      cursor: 'default',
      fontWeight: 'bold',
      color: theme.colors.placeholderTextColor,
    },

    collapse: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      gap: defaultGap,
    },

    options: {
      display: 'grid',
      alignContent: 'flex-start',

      gap: defaultGap,
    },

    data: {
      display: 'grid',

      gap: defaultGap,
    },
  };
});

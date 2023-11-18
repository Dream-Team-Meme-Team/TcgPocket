import { Popover, createStyles, Text } from '@mantine/core';
import { IconFilter, IconX } from '@tabler/icons-react';
import { PrimaryBadge } from '../../../components/badges/PrimaryBadge';
import { defaultGap } from '../../../constants/theme';
import { shallowEqual } from 'react-redux';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { useMemo } from 'react';
import { PrimaryIconButton } from '../../../components/buttons/PrimaryIconButton';
import {
  toggleDeckBuilderCardTypeFilters,
  toggleDeckBuilderRarityFilters,
  toggleDeckBuilderSetFilters,
} from '../../../store/deckBuilderSlice';

export function AppliedFilterBadges(): React.ReactElement {
  const { classes } = useStyles();

  const [cardTypes, sets, rarities] = useAppSelector(
    (state) => [state.data.cardTypes, state.data.sets, state.data.rarities],
    shallowEqual
  );

  const [cardTypeFilters, setFilters, rarityFilters] = useAppSelector(
    (state) => [
      state.deckBuilder.cardTypeFilters,
      state.deckBuilder.setFilters,
      state.deckBuilder.rarityFilters,
    ],
    shallowEqual
  );

  const renderCardTypeFilters = useMemo(() => {
    return cardTypes.filter((filter) =>
      cardTypeFilters.find((active) => filter.id === active)
    );
  }, [cardTypeFilters, cardTypes]);

  const renderSetFilters = useMemo(() => {
    return sets.filter((filter) =>
      setFilters.find((active) => filter.id === active)
    );
  }, [setFilters, sets]);

  const renderRarityFilters = useMemo(() => {
    return rarities.filter((filter) =>
      rarityFilters.find((active) => filter.id === active)
    );
  }, [rarityFilters, rarities]);

  const toggleCardType = (id: number) => {
    dispatch(toggleDeckBuilderCardTypeFilters(id));
  };

  const toggleSet = (id: number) => {
    dispatch(toggleDeckBuilderSetFilters(id));
  };

  const toggleRarity = (id: number) => {
    dispatch(toggleDeckBuilderRarityFilters(id));
  };

  return (
    <div className={classes.container}>
      <Popover withArrow disabled={renderCardTypeFilters.length === 0}>
        <Popover.Target>
          <div>
            <PrimaryBadge leftSection={<IconFilter />}>Card Types</PrimaryBadge>
          </div>
        </Popover.Target>

        <Popover.Dropdown>
          {renderCardTypeFilters.map((filter, index) => (
            <div key={index} className={classes.dropdown}>
              <Text> {filter.name} </Text>

              <div>
                <PrimaryIconButton
                  size={'sm'}
                  onClick={() => toggleCardType(filter.id)}
                >
                  <IconX />
                </PrimaryIconButton>
              </div>
            </div>
          ))}
        </Popover.Dropdown>
      </Popover>

      <Popover withArrow disabled={renderSetFilters.length === 0}>
        <Popover.Target>
          <div>
            <PrimaryBadge leftSection={<IconFilter />}> Sets </PrimaryBadge>
          </div>
        </Popover.Target>

        <Popover.Dropdown>
          {renderSetFilters.map((filter, index) => (
            <div key={index} className={classes.dropdown}>
              <Text> {filter.name} </Text>
              <PrimaryIconButton
                size={'sm'}
                onClick={() => toggleSet(filter.id)}
              >
                <IconX />
              </PrimaryIconButton>
            </div>
          ))}
        </Popover.Dropdown>
      </Popover>

      <Popover withArrow disabled={renderRarityFilters.length === 0}>
        <Popover.Target>
          <div>
            <PrimaryBadge leftSection={<IconFilter />}>Rarities</PrimaryBadge>
          </div>
        </Popover.Target>

        <Popover.Dropdown>
          {renderRarityFilters.map((filter, index) => (
            <div key={index} className={classes.dropdown}>
              <Text> {filter.name} </Text>
              <PrimaryIconButton
                size={'sm'}
                onClick={() => toggleRarity(filter.id)}
              >
                <IconX />
              </PrimaryIconButton>
            </div>
          ))}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',

      gap: defaultGap,
    },

    dropdown: {
      display: 'flex',
      alignItems: 'center',
    },
  };
});

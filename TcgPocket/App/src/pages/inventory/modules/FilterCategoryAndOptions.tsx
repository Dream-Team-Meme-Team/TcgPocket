import {
    Box,
    Checkbox,
    Collapse,
    Group,
    MantineTheme,
    ScrollArea,
    Text,
    createStyles,
} from '@mantine/core';
import {
    IconArrowBadgeUp,
    IconArrowBadgeDown,
    IconSearch,
} from '@tabler/icons-react';
import { PrimaryBadge } from '../../../components/badges/PrimaryBadge';
import { PrimaryInput } from '../../../components/inputs/PrimaryInput';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { CardTypeGetDto } from '../../../types/card-types';
import { GameGetDto } from '../../../types/games';
import { FilterActions } from './FilterMenu';
import { CardsService } from '../../../services/CardsService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { updatePagedFilters } from '../../../store/inventorySlice';

export type FilterCategoryAndOptionsProps = {
    label: string;
    data: CardTypeGetDto[];
    appliedFilters: CardTypeGetDto[];
    selectedGame: GameGetDto | null;
} & FilterActions;

export function FilterCategoryAndOptions({
    label,
    data,
    appliedFilters,
    selectedGame,
    handleSelectAllFilters,
    handleTogglingFilter,
    setCardFilters,
    cardFilters,
}: FilterCategoryAndOptionsProps): React.ReactElement {
    const { classes } = useStyles();

    const pagedFilters = useAppSelector(
        (state) => state.inventory.pagedFilters
    );

    const [opened, { toggle, close }] = useDisclosure();
    const [searchText, setSearchText] = useState('');

    const filteredOptions = useMemo(() => {
        if (!selectedGame) return [];

        return data
            .filter((option) => option.gameId === selectedGame.id)
            .filter((option) =>
                option.name.toLowerCase().includes(searchText.toLowerCase())
            );
    }, [searchText, selectedGame]);

    const numOfAppliedFilters = useMemo(() => {
        const foundApplied = filteredOptions.filter((option) =>
            appliedFilters.find((filter) => filter === option)
        );

        return foundApplied.length;
    }, [appliedFilters]);

    const filterCards = (filterId: number) => {
        switch (label) {
            case 'Card Type': {
                setCardFilters({
                    ...cardFilters,
                    cardTypeId: filterId,
                    gameId: selectedGame?.id,
                });
                break;
            }
            case 'Sets': {
                setCardFilters({
                    ...cardFilters,
                    setId: filterId,
                    gameId: selectedGame?.id,
                });
                break;
            }
            case 'Rarities': {
                setCardFilters({
                    ...cardFilters,
                    rarityId: filterId,
                    gameId: selectedGame?.id,
                });
                break;
            }
            default:
                break;
        }
    };

    useEffect(() => {
        close();
    }, [selectedGame]);

    useEffect(() => {
        if (appliedFilters.length === 0) return;

        const lastFilterApplied = appliedFilters[appliedFilters.length - 1];

        filterCards(lastFilterApplied.id);
    }, [appliedFilters]);

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
                    <PrimaryInput
                        icon={<IconSearch />}
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <ScrollArea mah={'50vh'}>
                        <Box className={classes.options}>
                            {!searchText && (
                                <Checkbox
                                    label="Select All"
                                    onChange={() =>
                                        handleSelectAllFilters(filteredOptions)
                                    }
                                    checked={
                                        appliedFilters.length ===
                                        filteredOptions.length
                                    }
                                />
                            )}

                            <div className={classes.data}>
                                {filteredOptions.map((option, index) => (
                                    <Checkbox
                                        key={index}
                                        label={option.name}
                                        onChange={() =>
                                            handleTogglingFilter(option)
                                        }
                                        checked={appliedFilters.some(
                                            (filter) => filter === option
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

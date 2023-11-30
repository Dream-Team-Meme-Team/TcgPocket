import {
  Group,
  Text,
  rem,
  Container,
  createStyles,
  Divider,
  Title,
  Select,
  Flex,
  SelectItem,
  MantineTheme,
  CSSObject,
  ScrollArea,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconSearch } from '@tabler/icons-react';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useAsync, useAsyncFn } from 'react-use';
import { CardReaderService } from '../../services/CardReaderService';
import { error, success } from '../../services/helpers/Notification';
import { useMemo, useState } from 'react';
import { CardDisplayDto } from '../../types/cards';
import { CardDisplay } from '../../components/cardDisplay/CardDisplay';
import { CardsService } from '../../services/CardsService';
import { dispatch } from '../../store/configureStore';
import { getOptions } from '../../services/dataServices/gameServices';
import useDebounce from '../../hooks/useDebounce';
import { UploadCardSelectItem } from './modules/UploadCardSelectItem';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';

type CardSelectType = {
  key: number;
  value: string;
  label: string;
  game: string;
  set: string;
  cardNumber: string;
  imageUrl: string;
  group: string;
  carddisplaydto: CardDisplayDto;
};

export function CardUploadPage() {
  const { classes } = useStyles();

  const [pendingCards, setPendingCards] = useState<CardDisplayDto[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [gameId, setGameId] = useState<string | undefined>(undefined);
  const [value, setValue] = useState('');

  const searchValueDebounced = useDebounce(searchValue);

  const fetchCardOptions = useAsync(async () => {
    const response = await CardsService.getAllCards({
      name: searchValueDebounced,
      gameIds: gameId ? [Number(gameId)] : [],
      currentPage: 1,
      pageSize: 15,
    });

    if (response.hasErrors) {
      response.errors.forEach((err: { message: string | undefined }) =>
        error(err.message)
      );
      return;
    }

    return response.data;
  }, [gameId, searchValueDebounced]);

  const cardOptions = useMemo(() => {
    const array: CardSelectType[] = [];

    if (searchValueDebounced.length === 0) {
      return array;
    }

    const response = fetchCardOptions.value?.items;
    response &&
      response.forEach((element: CardDisplayDto) => {
        array.push({
          key: element.id,
          value: element.id.toString(),
          label: element.name,
          game: element.game.name,
          set: element.set.name,
          cardNumber: element.cardNumber,
          imageUrl: element.imageUrl,
          group: element.game.name,
          carddisplaydto: element,
        });
      });

    return array;
  }, [fetchCardOptions, searchValueDebounced]);

  const fetchGameOptions = useAsync(async () => {
    const { payload } = await dispatch(getOptions());
    return payload?.data;
  });

  const gameOptions = useMemo(() => {
    const response = fetchGameOptions;

    return response.value as SelectItem[];
  }, [fetchGameOptions]);

  const [uploadCardState, uploadCard] = useAsyncFn(
    async (files: FileWithPath[]) => {
      if (!files) {
        return;
      }

      const response = await CardReaderService.readCard(
        await files[0].arrayBuffer()
      );

      if (response.hasErrors) {
        response.errors.forEach((err: { message: string | undefined }) =>
          error(err.message)
        );
        return;
      }

      setPendingCards((state) => [...state, response.data]);
      success('Card Uploaded');

      return response.data;
    }
  );

  const nothingFoundMessage: string | undefined = useMemo(() => {
    if (fetchCardOptions.loading) return undefined;

    return !searchValueDebounced ? undefined : 'No cards found.';
  }, [fetchCardOptions.loading, searchValueDebounced]);

  const rejectFile = () => {
    error('File must be a png or jpg');
  };

  const removeCard = (card: CardDisplayDto) => {
    const index = pendingCards.indexOf(card);
    pendingCards.splice(index, 1);
    setPendingCards([...pendingCards]);
  };

  const handleAddCards = async () => {
    const cardIds: number[] = [];

    pendingCards.forEach((cards) => cardIds.push(cards.id));

    const response = await CardsService.addCardsToInventory({
      cardIds: cardIds,
    });

    if (response.hasErrors) {
      response.errors.forEach((err: { message: string | undefined }) =>
        error(err.message)
      );
      return;
    }

    setPendingCards([]);
    success('Cards Added to Inventory');
  };

  return (
    <div>
      <ScrollArea className={classes.contain}>
        <Container fluid className={classes.uploadContainer}>
          <Dropzone
            onDrop={uploadCard}
            onReject={rejectFile}
            accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
            loading={uploadCardState.loading}
            className={classes.dropzone}
          >
            <Group
              className={classes.internalUploadContainer}
              position="center"
              spacing="xl"
            >
              <Dropzone.Accept>
                <IconUpload size="3.2rem" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="3.2rem" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag image here or click to select file
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach one file ONLY one, any more and you are not invited to
                  the mojo dojo casa house. Must be a .png or .jpeg.
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Divider label="OR" labelPosition="center" p="lg" />
          {gameOptions && (
            <Flex w="100%">
              <Select
                searchable
                clearable
                size="lg"
                w="25%"
                data={gameOptions}
                value={gameId}
                onChange={(value) => setGameId(value as string)}
                placeholder="Select Game (Optional)"
                sx={selectStylingGame}
              />
              <Select
                w="100%"
                searchable
                size="lg"
                itemComponent={UploadCardSelectItem}
                data={cardOptions ?? []}
                value={value}
                onChange={(value) => {
                  setValue(value ?? '');
                  const card = cardOptions.find((x) => x.value === value)
                    ?.carddisplaydto;
                  card && pendingCards.push(card);
                  setValue('');
                }}
                icon={<IconSearch />}
                placeholder="Search by Card Name"
                nothingFound={nothingFoundMessage}
                searchValue={searchValue}
                onSearchChange={(data) => {
                  setSearchValue(data);
                }}
                onDropdownClose={() => {
                  setSearchValue('');
                }}
                maxDropdownHeight={400}
                rightSection={<></>}
                sx={selectStylingCard}
              />
            </Flex>
          )}
        </Container>

        <div className={classes.cardDisplayContainer}>
          <Divider
            pt={10}
            pb={10}
            variant="dashed"
            label={<Title>Uploaded/Selected Cards</Title>}
            labelPosition={'center'}
          />
          {pendingCards.length > 0 ? (
            <div className={classes.cardDisplayGroup}>
              {pendingCards.map((card, index) => (
                <CardDisplay
                  key={index}
                  isLoading={false}
                  card={card}
                  clearable
                  onClear={() => removeCard(card)}
                />
              ))}
            </div>
          ) : (
            <div className={classes.noCards}>
              Upload Cards using dropzone or search by card name in search box
              to add cards
            </div>
          )}
        </div>
      </ScrollArea>
      <Flex align="center" justify="flex-end" className={classes.footer}>
        <PrimaryButton
          disabled={pendingCards.length === 0}
          onClick={handleAddCards}
        >
          Add Cards to Inventory
        </PrimaryButton>
      </Flex>
    </div>
  );
}

const selectStylingGame = (theme: MantineTheme): CSSObject => ({
  input: {
    color: theme.white,
    background: theme.colors.textBoxColor[0],
    borderColor: theme.colors.primaryPurpleColor[0],
    backgroundColor: theme.black,
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    ':focus': {
      borderColor: theme.colors.secondaryBlueColors[0],
    },
  },
  label: {
    fontWeight: 'bold',
  },
});

const selectStylingCard = (theme: MantineTheme): CSSObject => ({
  input: {
    color: theme.white,
    background: theme.colors.textBoxColor[0],
    borderColor: theme.colors.primaryPurpleColor[0],
    backgroundColor: theme.black,
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,

    ':focus': {
      borderColor: theme.colors.secondaryBlueColors[0],
    },
  },
  label: {
    fontWeight: 'bold',
  },
});

const useStyles = createStyles((theme) => {
  const { remainingHeight, navbarHeight } = useNavbarHeight();
  return {
    contain: {
      width: '100%',
      top: 0,
      height: remainingHeight - navbarHeight,
      backgroundColor: theme.colors.secondaryBackgroundColor[0],
    },

    uploadContainer: {
      padding: '25px',
      paddingLeft: '75px',
      paddingRight: '75px',

      borderBottom: `2px solid${theme.colors.primaryPurpleColor[0]}`,
      backgroundColor: theme.colors.backgroundColor[0],
    },

    dropzone: {
      backgroundColor: theme.black,
      borderColor: theme.colors.primaryPurpleColor[0],
      ':hover': {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.9
        ),
      },
    },

    internalUploadContainer: { minHeight: rem(120), pointerEvents: 'none' },

    cardDisplayContainer: {
      display: 'grid',

      backgroundColor: theme.colors.secondaryBackgroundColor[0],
    },

    cardDisplayGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 368px)',
      justifyContent: 'center',

      columnGap: '8px',
      rowGap: '20px',
      paddingTop: '10px',
      paddingBottom: '15px',
    },

    noCards: {
      fontStyle: 'italic',
      textAlign: 'center',
    },

    footer: {
      bottom: 0,
      position: 'fixed',

      height: navbarHeight,
      width: '100%',
      paddingRight: '25px',

      borderTop: `1px solid${theme.colors.primaryPurpleColor[0]}`,
      backgroundColor: theme.colors.backgroundColor[0],
    },
  };
});

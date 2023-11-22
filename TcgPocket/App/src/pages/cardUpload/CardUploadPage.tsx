import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Container,
  createStyles,
  Divider,
  ScrollArea,
  Title,
  Select,
  Button,
  Flex,
  SelectItem,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconSearch } from '@tabler/icons-react';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useAsync, useAsyncFn } from 'react-use';
import { CardReaderService } from '../../services/CardReaderService';
import { error, success } from '../../services/helpers/Notification';
import { forwardRef, useMemo, useState } from 'react';
import { CardDisplayDto } from '../../types/cards';
import { CardDisplay } from '../../components/cardDisplay/CardDisplay';
import { CardsService } from '../../services/CardsService';
import { CardImageDisplay } from '../../components/cardDisplay/modules/CardImageDisplay';
import { dispatch } from '../../store/configureStore';
import { getOptions } from '../../services/dataServices/gameServices';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  imageUrl: string;
  game: string;
  set: string;
  cardNumber: string;
}

const CardSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, imageUrl, game, set, cardNumber, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <CardImageDisplay
          clickable={false}
          height={100}
          width={70}
          imageUrl={imageUrl}
        />
        <div>
          <Text size="lg">{label}</Text>
          <Text size="md" opacity={0.65}>
            {set} | {cardNumber}
          </Text>
          <Text size="sm" opacity={0.65}>
            {game}
          </Text>
        </div>
      </Group>
    </div>
  )
);

type CardSelectType = {
  key: number;
  value: string;
  label: string;
  game: string;
  set: string;
  cardNumber: string;
  imageUrl: string;
  group: string;
  cardDisplayDto: CardDisplayDto;
};

export function CardUploadPage() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [pendingCards, setPendingCards] = useState<CardDisplayDto[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [gameId, setGameId] = useState<string | undefined>(undefined);
  const [value, setValue] = useState('');
  const [data, setData] = useState<CardSelectType[]>([]);

  const [fetchCardOptionsState, fetchCardOptions] = useAsyncFn(
    async (value: string) => {
      const response = await CardsService.getAllCards({
        name: value,
        gameIds: gameId ? [Number(gameId)] : [],
        currentPage: 1,
        pageSize: 15,
      });

      if (response.hasErrors) {
        response.errors.forEach((err) => error(err.message));
        return;
      }

      return response.data;
    },
    []
  );

  const cardOptions = useMemo(() => {
    const array: CardSelectType[] = [];

    if (value.length === 0) {
      setData([]);
      return array;
    }

    const response = fetchCardOptionsState.value?.items;
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
          cardDisplayDto: element,
        });
      });

    setData(array);
    return array;
  }, [fetchCardOptionsState.value?.items, value.length]);

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
        response.errors.forEach((err) => error(err.message));
        return;
      }

      setPendingCards((state) => [...state, response.data]);

      success('Card Uploaded to inventory');

      return response.data;
    }
  );

  const rejectFile = () => {
    error('File must be a png or jpg');
  };

  return (
    <div>
      {gameOptions && (
        <Container fluid className={classes.uploadContainer}>
          <Text>
            To upload cards, enter the name of your card in the search bar or
            upload your picture to the dropzone below.
          </Text>
          <Dropzone
            onDrop={uploadCard}
            onReject={rejectFile}
            accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
            loading={uploadCardState.loading}
          >
            <Group
              className={classes.internalUploadContainer}
              position="center"
              spacing="xl"
            >
              <Dropzone.Accept>
                <IconUpload
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === 'dark' ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                />
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
          <Divider
            label="OR"
            labelPosition="center"
            pt={10}
            pb={10}
            mt={50}
            mb={50}
            variant="dashed"
          />
          <Flex w="100%">
            <Select
              searchable
              clearable
              size="lg"
              w="40%"
              data={gameOptions}
              value={gameId}
              onChange={(value) => setGameId(value as string)}
              placeholder="Select Game (Optional)"
              styles={{
                input: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              }}

              // filter={(value, item) =>
              //   (item.label &&
              //     item.label.toLowerCase().includes(value.toLowerCase().trim())) ||
              //   (item.cardNumber &&
              //     item.cardNumber.toLowerCase().includes(value.toLowerCase().trim()))
              // }
            />
            <Select
              w="100%"
              searchable
              size="lg"
              itemComponent={CardSelectItem}
              data={cardOptions}
              value={value}
              onChange={(value) => {
                setValue(value ?? '');
                const card = cardOptions.find((x) => x.value === value)
                  ?.cardDisplayDto;
                card && pendingCards.push(card);
                setValue('');
              }}
              icon={<IconSearch />}
              placeholder="Search"
              searchValue={searchValue}
              onSearchChange={(data) => {
                setSearchValue(data);
                fetchCardOptions(data);
              }}
              onDropdownClose={() => {
                setSearchValue('');
              }}
              maxDropdownHeight={400}
              rightSection={<></>}
              styles={{
                input: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              }}

              // filter={(value, item) =>
              //   (item.label &&
              //     item.label.toLowerCase().includes(value.toLowerCase().trim())) ||
              //   (item.cardNumber &&
              //     item.cardNumber.toLowerCase().includes(value.toLowerCase().trim()))
              // }
            />
          </Flex>
        </Container>
      )}
      <Divider pt={10} pb={10} mt={50} variant="dashed" />

      {pendingCards.length > 0 && (
        <>
          <Divider
            pt={10}
            pb={10}
            variant="dashed"
            label={<Title>Cards Added To Inventory</Title>}
            labelPosition={'center'}
          />

          <div className={classes.inventoryDisplayContainer}>
            <ScrollArea>
              <div className={classes.inventoryDisplayGroup}>
                {pendingCards.map((cards, index) => (
                  <CardDisplay key={index} isLoading={false} card={cards} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  uploadContainer: {
    padding: '25px',
    width: '100%',

    borderBottom: `2px solid${theme.colors.primaryPurpleColor[0]}`,
  },
  internalUploadContainer: { minHeight: rem(120), pointerEvents: 'none' },
  inventoryDisplayContainer: {
    display: 'grid',

    overflowY: 'hidden',
  },

  inventoryDisplayGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 368px)',
    justifyContent: 'center',

    columnGap: '8px',
    rowGap: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',

    backgroundColor: theme.colors.inventoryBackgroundColor,
  },
}));

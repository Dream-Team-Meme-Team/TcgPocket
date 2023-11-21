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
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconSearch } from '@tabler/icons-react';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useAsyncFn } from 'react-use';
import { CardReaderService } from '../../services/CardReaderService';
import { error, success } from '../../services/helpers/Notification';
import { forwardRef, useState } from 'react';
import { CardDisplayDto } from '../../types/cards';
import { CardDisplay } from '../../components/cardDisplay/CardDisplay';
import { CardsService } from '../../services/CardsService';
import { CardImageDisplay } from '../../components/cardDisplay/modules/CardImageDisplay';

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
  const [cardValue, setCardValue] = useState<CardSelectType>();
  const [value, setValue] = useState('');
  const [data, setData] = useState<CardSelectType[]>([]);

  const [getCardsState, getCards] = useAsyncFn(async (value: string) => {
    if (value.length === 0) {
      setData([]);
      return;
    }

    const array: CardSelectType[] = [];
    const response = await CardsService.getAllCards({
      name: value,
      currentPage: 1,
      pageSize: 15,
    });

    if (response.hasErrors) {
      response.errors.forEach((err) => error(err.message));
      return;
    }

    response.data.items.forEach((element: CardDisplayDto) => {
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
  });

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
    <Container className={classes.uploadContainer}>
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
              Attach one file ONLY one, any more and you are not invited to the
              mojo dojo casa house. Must be a .png or .jpeg.
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Divider pt={10} pb={10} mt={50} variant="dashed" />
      <Text>Enter your card name:</Text>
      <Select
        searchable
        size="md"
        itemComponent={CardSelectItem}
        data={data}
        value={value}
        onChange={(value) => {
          setValue(value ?? '');
          const card = data.find((x) => x.value === value)?.cardDisplayDto;
          card && pendingCards.push(card);
          setValue('');
        }}
        icon={<IconSearch />}
        placeholder="Search"
        searchValue={searchValue}
        onSearchChange={(data) => {
          setSearchValue(data);
          getCards(data);
        }}
        onDropdownClose={() => {
          setSearchValue('');
        }}
        maxDropdownHeight={400}
        // filter={(value, item) =>
        //   (item.label &&
        //     item.label.toLowerCase().includes(value.toLowerCase().trim())) ||
        //   (item.cardNumber &&
        //     item.cardNumber.toLowerCase().includes(value.toLowerCase().trim()))
        // }
      />
      <Divider pt={10} pb={10} mt={50} variant="dashed" />

      <Button
        onClick={() => {
          console.log(cardValue);
        }}
      />
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
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  uploadContainer: {
    paddingTop: '50px',
  },
  internalUploadContainer: { minHeight: rem(220), pointerEvents: 'none' },
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

import {
  Flex,
  Paper,
  Image,
  Container,
  Text,
  Space,
  Title,
  Badge,
  CSSObject,
  createStyles,
} from '@mantine/core';
import { CardDisplayDto } from '../../types/cards';
import { CSSProperties } from 'react';
import { IconAlertTriangleFilled } from '@tabler/icons-react';

export const testCard: CardDisplayDto = {
  id: 1,
  name: 'Fury Sliver',
  game: {
    id: 1,
    name: 'Magic: The Gathering',
  },
  set: {
    id: 1,
    gameId: 1,
    name: 'Wilds of Elderaine',
  },
  rarity: {
    id: 1,
    gameId: 1,
    name: 'Common',
  },
  cardNumber: '#276',
  imageUrl:
    'https://cards.scryfall.io/normal/front/0/0/0000579f-7b35-4ed3-b44c-db2a538066fe.jpg?1562894979',
  attributes: [
    { id: 0, gameId: 1, name: 'Creature' },
    { id: 0, gameId: 1, name: 'Sliver' },
    { id: 0, gameId: 1, name: 'Red' },
  ],
  cardType: {
    id: 1,
    gameId: 1,
    name: 'Permanent',
  },
  description: 'yomomma',
};

type CardContainerProps = {
  card: CardDisplayDto;
  styles?: CSSProperties;
};

export const CardImageDisplay: React.FC<{ imageUrl: string }> = ({
  imageUrl,
}) => {
  const { classes } = useStyles();
  let url: URL;

  try {
    url = new URL(imageUrl);
  } catch (_) {
    return (
      <Flex className={classes.invalidUrl}>
        <IconAlertTriangleFilled
          size={'70px'}
          className={classes.invalidUrlIcon}
        />
        <Flex className={classes.invalidUrlText}>
          <br />
          Image Not Found
        </Flex>
      </Flex>
    );
  }

  return <Image src={imageUrl} fit="scale-down" radius={7} width={'152px'} />;
};

export const CardDisplay: React.FC<CardContainerProps> = ({ card }) => {
  const { classes } = useStyles();
  return (
    <Paper pl={12} sx={containerSx}>
      <Flex>
        <CardImageDisplay imageUrl={card.imageUrl} />
        <div className={classes.cardInfoDivider} />
        <Container h={'auto'} pr={0} pl={4}>
          <Text size={'15px'} color="black" ff={'Georgia'} fw={'bold'}>
            {card.game.name}
          </Text>

          <Text size={'15px'} color="black" ff={'Georgia'} fw={500}>
            {card.set.name}
          </Text>

          <Space h={'0.5rem'} />

          <Text size={'15px'} color="black" ff={'Georgia'} fw={500}>
            {card.rarity.name} | {card.cardNumber}
          </Text>

          <Space h={'s'} />
          <Title order={4}>{card.name}</Title>
          <Space h={'0.9rem'} />

          <Flex
            sx={attributesContainerSx}
            gap={'.4rem'}
            justify={'center'}
            maw={'10rem'}
            mih={'5rem'}
            wrap={'wrap'}
          >
            {card.attributes.map((x) => (
              <Badge className={classes.badgeBackground} variant="filled">
                {x.name}
              </Badge>
            ))}
          </Flex>
        </Container>
      </Flex>
    </Paper>
  );
};

const containerSx: CSSObject = {
  backgroundColor: '#8d9396',
  padding: '1rem',
  boxShadow:
    '0.1rem .2rem 0.5rem 0 rgba(0, 0, 0, .75), inset 0.1rem .1rem 10rem 2rem rgba(34, 22, 51, 0.4)',
  height: '15rem',
  width: '23rem',
  borderRadius: '7px',
  willChange: 'transform',
  transition: 'transform 550ms, box-shadow 200ms',

  ':hover': {
    boxShadow:
      '0.1rem .1rem .4rem 0 rgba(0, 0, 0, 0.7), inset 0.1rem .1rem 10rem 2rem rgba(34, 22, 51, 0.2)',
    transition: 'transform 150ms ease-out, box-shadow 200ms ease-out',
    transform: 'translate3d(0px, -5px, 0px)',
  },
};

const attributesContainerSx: CSSObject = {
  alignContent: 'space-evenly',
};

const useStyles = createStyles((theme) => ({
  cardInfoDivider: {
    backgroundColor: 'rgba(34, 22, 51, 0.6)',
    height: '150px',
    width: '1px',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    marginLeft: '7px',
  },

  badgeBackground: {
    backgroundColor: 'rgba(45, 30, 66, 1)',
  },

  invalidUrl: {
    backgroundColor: 'rgba(95, 95, 95, 0.75)',
    border: 'solid 6px rgba(46, 46, 46, 0.9)',
    width: '152px',
    height: '211px',
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap',
    alignContent: 'center',
  },

  invalidUrlText: {
    margin: 'auto',
    color: 'rgba(46, 46, 46, 1)',
    fontWeight: 500,
  },

  invalidUrlIcon: {
    color: 'rgba(46, 46, 46, 0.9)',
  },
}));

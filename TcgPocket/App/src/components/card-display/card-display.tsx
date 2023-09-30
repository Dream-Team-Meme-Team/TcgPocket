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
} from '@mantine/core';
import { CardDisplayDto } from '../../types/cards';

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
};

export const CardDisplay: React.FC<CardContainerProps> = ({ card }) => {
  return (
    <Paper sx={containerSx}>
      <Flex>
        <Image src={card.imageUrl} fit="scale-down" width={'152px'} />
        <Container pr={0}>
          <Text size={'sm'} color="#5e616c">
            {card.game.name}
          </Text>
          <Text size={'sm'} color="#5e616c">
            {card.set.name}
          </Text>

          <Space h={'0.75rem'} />

          <Text size={'sm'} color="#5e616c">
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
              <Badge color="violet" variant="filled">
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
  backgroundColor: '#E3EBEF',
  padding: '1rem',
  boxShadow: '0 .1rem .4rem 0 rgba(136, 136, 136, 0.9)',
  height: '15rem',
  width: '23rem',
  borderRadius: '7px',
  willChange: 'transform',
  transition: 'transform 550ms',

  ':hover': {
    boxShadow: '0 .2rem 0.5rem 0 rgba(136, 136, 136, 1)',
    transition: 'transform 150ms ease-out',
    transform: 'translateY(-0.25em)',
  },
};

const attributesContainerSx: CSSObject = {
  alignContent: 'space-evenly',
};

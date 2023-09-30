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
        <Container>
          <Text size={'sm'} color="#5e616c">
            {card.game.name}
          </Text>
          <Text size={'sm'} color="#5e616c">
            {card.set.name}
          </Text>

          <Space h={'1rem'} />

          <Text size={'sm'} color="#5e616c">
            {card.rarity.name} | {card.cardNumber}
          </Text>

          <Space h={'s'} />

          <Title order={4}>{card.name}</Title>

          <Space h={'1rem'} />

          <Flex gap={'.4rem'} wrap={'wrap'}>
            {card.attributes.map((x) => (
              <Badge variant="outline">{x.name}</Badge>
            ))}
          </Flex>
        </Container>
      </Flex>
    </Paper>
  );
};

const containerSx: CSSObject = {
  backgroundColor: '#fff',
  padding: '1rem',
  boxShadow: '0 .2rem .4rem 0 #888',
  transition: 'box-shadow .3s ease-out',
  height: '15rem',
  width: '23rem',

  ':hover': {
    boxShadow: '0 .2rem 1rem 0 #595959',
    transition: 'box-shadow .3s ease-out',
  },
};

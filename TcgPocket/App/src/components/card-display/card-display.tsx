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

const testCard = {
  gameName: 'Magic: The Gathering',
  setName: 'Wilds of Elderaine',
  rarity: 'Common',
  setIndex: '#276',
  cardName: 'Fury Sliver',
  uri: 'https://cards.scryfall.io/normal/front/0/0/0000579f-7b35-4ed3-b44c-db2a538066fe.jpg?1562894979',
  attributes: ['Creature', 'Sliver', 'Red', 'Creature', 'Sliver', 'Red'],
};

type CardDisplayDto = typeof testCard;

type CardContainerProps = {
  card: CardDisplayDto;
};

export const CardDisplay: React.FC<CardContainerProps> = ({ card }) => {
  return (
    <Paper sx={containerSx}>
      <Flex>
        <Image src={card.uri} fit="scale-down" width={'152px'} />
        <Container>
          <Text size={'sm'} color="#5e616c">
            {card.gameName}
          </Text>
          <Text size={'sm'} color="#5e616c">
            {card.setName}
          </Text>

          <Space h={'1rem'} />

          <Text size={'sm'} color="#5e616c">
            {card.rarity} | {card.setIndex}
          </Text>

          <Space h={'s'} />

          <Title order={4}>{card.cardName}</Title>

          <Space h={'1rem'} />

          <Flex gap={'.4rem'} wrap={'wrap'}>
            {card.attributes.map((x) => (
              <Badge variant="outline">{x}</Badge>
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

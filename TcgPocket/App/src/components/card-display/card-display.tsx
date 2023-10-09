import {
  Flex,
  Paper,
  Container,
  Text,
  Space,
  Title,
  Badge,
  CSSObject,
  createStyles,
} from '@mantine/core';
import { CardDisplayDto } from '../../types/cards';
import { CardImageDisplay } from './modules/card-image-display';

type CardContainerProps = {
  card: CardDisplayDto;
};

export const CardDisplay: React.FC<CardContainerProps> = ({ card }) => {
  const { classes } = useStyles();
  return (
    <Paper p={10} pl={11} sx={containerSx}>
      <Flex columnGap={2}>
        <CardImageDisplay imageUrl={card.imageUrl} />
        <div className={classes.cardInfoDivider} />
        <Container className={classes.cardInfo} pr={0} pl={4}>
          <Text size={'15px'} color="black" ff={'Georgia'} fw={'bold'}>
            {card.game.name}
          </Text>

          <Text size={'12px'} color="black" ff={'Georgia'} fw={500}>
            {card.set.name}
          </Text>

          <Space h={'2%'} />

          <Text size={'13px'} color="black" ff={'Georgia'} fw={500}>
            {card.rarity.name} | {card.cardNumber}
          </Text>

          <Space h={'3%'} />
          <Title color="black" ff={'Georgia'} h={52} order={4}>
            {card.name}
          </Title>
          <Space h={'3%'} />

          <Flex
            sx={attributesContainerSx}
            gap={'.4rem'}
            justify={'center'}
            maw={'10rem'}
            mih={'5rem'}
            wrap={'wrap'}
          >
            {card.attributes &&
              card.attributes.map((x) => (
                <Badge className={classes.badgeBackground} variant="filled">
                  {x.attributeName}
                </Badge>
              ))}
          </Flex>
        </Container>
      </Flex>
    </Paper>
  );
};

const containerSx: CSSObject = {
  backgroundColor: '#afaab3',
  padding: '1rem',
  boxShadow:
    '0.1rem 0.2rem 0.4rem 0 rgba(0, 0, 0, .85), inset 0.5rem 1rem 3rem 0.1rem rgba(34, 22, 51, 0.32), inset -0.5rem -1rem 3rem 0.1rem rgba(34, 22, 51, 0.32)',
  height: '15rem',
  width: '23rem',
  borderRadius: '7px',
  willChange: 'transform',
  transition: 'transform 550ms, box-shadow 250ms ease',

  ':hover': {
    boxShadow:
      '0rem 0.4rem 1rem 0 rgba(0, 0, 0, 0.9), inset 0rem 0rem 3rem 0.1rem rgba(34, 22, 51, 0.5)',
    transition: 'transform 150ms ease-out, box-shadow 300ms ease',
    transform: 'translate3d(0px, -5px, 0px)',
  },
};

const attributesContainerSx: CSSObject = {
  alignContent: 'flex-start',
};

const useStyles = createStyles(() => ({
  cardInfoDivider: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '275px',
    width: '1px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '7px',
    marginRight: '2px',
    maxHeight: '204px !important',
  },
  cardInfo: {
    height: 'auto',
    width: '11.8rem',
    marginLeft: 0,
    display: 'column',
    justifyItems: 'start',
  },

  badgeBackground: {
    backgroundColor: 'rgba(45, 30, 66, 1)',
  },
}));

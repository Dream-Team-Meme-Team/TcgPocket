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
  Box,
  Tooltip,
  Skeleton,
} from '@mantine/core';
import { CardDisplayDto } from '../../types/cards';
import { CardImageDisplay } from './modules/CardImageDisplay';

type CardContainerProps = {
  card: CardDisplayDto;
  isLoading: boolean;
};

export function CardDisplay({ card, isLoading }: CardContainerProps) {
  const { classes } = useStyles();
  return (
    <Paper p={10} pl={11} sx={containerSx}>
      <Flex columnGap={2}>
        <Skeleton radius={7} width={152} height={220} visible={isLoading}>
          <CardImageDisplay imageUrl={card.imageUrl} />
        </Skeleton>

        <div className={classes.cardInfoDivider} />
        <Container className={classes.cardInfo} pr={0} pl={4}>
          <Skeleton width={90} height={20} visible={isLoading}>
            <Text size={'15px'} color="black" ff={'Georgia'} fw={'bold'}>
              {card.game.name}
            </Text>
          </Skeleton>

          <Tooltip
            label={card.set.name}
            position="top-start"
            offset={-5}
            multiline
            w={'fit'}
            arrowSize={4}
          >
            <Skeleton width={178} height={18.5} visible={isLoading}>
              <Text
                size={'12px'}
                lineClamp={1}
                color="black"
                ff={'Georgia'}
                fw={500}
              >
                {card.set.name}
              </Text>
            </Skeleton>
          </Tooltip>

          <Space h={'2%'} />
          <Skeleton width={178} height={20.15} visible={isLoading}>
            <Tooltip
              label={`${card.rarity.name} | ${card.cardNumber}`}
              position="top-start"
              offset={-5}
              multiline
              w={'fit'}
              arrowSize={4}
            >
              <Text
                lineClamp={1}
                size={'13px'}
                color="black"
                ff={'Georgia'}
                fw={500}
              >
                {card.rarity.name} | {card.cardNumber}
              </Text>
            </Tooltip>
          </Skeleton>

          <Space h={'2%'} />
          <Skeleton width={178} height={52.17} visible={isLoading}>
            <Box h={52}>
              <Tooltip
                label={card.name}
                position="top-start"
                offset={-10}
                multiline
                w={'fit'}
                arrowSize={4}
              >
                <Title lineClamp={2} color="black" ff={'Georgia'} order={4}>
                  {card.name}
                </Title>
              </Tooltip>
            </Box>
          </Skeleton>

          <Space h={'3%'} />
          <Skeleton width={178} height={90} visible={isLoading}>
            {card.attributes && (
              <Flex
                sx={attributesContainerSx}
                gap={'.4rem'}
                justify={'center'}
                maw={'10rem'}
                wrap={'wrap'}
              >
                {card.attributes.map((cardAttributes, index) => {
                  return (
                    <Badge
                      key={index}
                      size="sm"
                      className={classes.badgeBackground}
                      variant="filled"
                    >
                      {cardAttributes.attributeName}
                    </Badge>
                  );
                })}
              </Flex>
            )}
          </Skeleton>
        </Container>
      </Flex>
    </Paper>
  );
}

const containerSx: CSSObject = {
  backgroundColor: '#c3bbc4',
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
  maxHeight: 93,
  minHeight: '2rem',
  overflow: 'hidden',
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

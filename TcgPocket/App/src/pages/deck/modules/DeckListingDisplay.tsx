import {
  ActionIcon,
  Container,
  Flex,
  Text,
  Indicator,
  Loader,
  MantineTheme,
  createStyles,
  Tooltip,
} from '@mantine/core';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconCaretDown,
  IconCaretUp,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { shallowEqual, useDisclosure } from '@mantine/hooks';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { DeleteModal } from '../../../components/modals/DeleteModal';
import { DeckDisplayDto } from '../../../types/decks';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/Index';
import { setSelectedDeckId } from '../../../store/deckSlice';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { useMemo, useState } from 'react';

export type DeckListingDisplayProps = {
  data: DeckDisplayDto[] | undefined;
  loading: boolean;
  deleteFn: () => Promise<void>;
  label: string;
  tableWidth?: string;
};

export const DeckListingDisplay = ({
  data,
  loading,
  deleteFn,
  label,
  tableWidth,
}: DeckListingDisplayProps) => {
  const { classes } = useStyles(tableWidth);
  const [allCollapsed, setAllCollapsed] = useState(true);

  const toggleCollapse = () => {
    allCollapsed ? setAllCollapsed(false) : setAllCollapsed(true);
  };

  return (
    <>
      <Container pt="0.5%" pb="1%" fluid className={classes.tableContainer}>
        <div className={classes.table}>
          <div className={classes.tableHeaderContainer}>
            <Text p="0.15em 1em" fz="22px" fw="bold" align="center">
              {label}
            </Text>
            {data?.length !== 0 && (
              <Tooltip
                label={allCollapsed ? 'Expand all decks' : 'Collapse all decks'}
              >
                <ActionIcon
                  aria-label={
                    allCollapsed ? 'Expand all decks' : 'Collapse all decks'
                  }
                  onClick={toggleCollapse}
                  className={classes.expander}
                >
                  {allCollapsed ? (
                    <IconArrowsMaximize />
                  ) : (
                    <IconArrowsMinimize />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </div>
          {data && !loading ? (
            data.map((value, index) => (
              <TableRow
                value={value}
                deleteFn={deleteFn}
                allCollapsed={allCollapsed}
                key={index}
              />
            ))
          ) : (
            <div className={classes.loaderContainer}>
              <Loader size="150px" color="#9d65db" />
            </div>
          )}
          {data?.length === 0 && !loading && (
            <Flex
              dir="row"
              gap={'lg'}
              justify="space-around"
              className={classes.noData}
            >
              <i> No decks to display </i>
            </Flex>
          )}
        </div>
      </Container>
    </>
  );
};

type TableRowProps = {
  value: DeckDisplayDto;
  allCollapsed: boolean;
  deleteFn: () => Promise<void>;
};

export const TableRow = ({ value, allCollapsed, deleteFn }: TableRowProps) => {
  const { classes } = useStyles(undefined);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useMemo(() => {
    setIsCollapsed(allCollapsed);
  }, [allCollapsed]);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();

  const selectAndOpenDelete = (value: any) => {
    toggleDelete();
    dispatch(setSelectedDeckId(value.id));
  };

  const toggleCollapse = () => {
    isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true);
  };

  return (
    <div className={classes.tableRow}>
      <Flex
        className={classes.tableRowHeader}
        dir="row"
        gap={'lg'}
        justify="space-around"
      >
        <div className={classes.tableColumnFirstItem}>
          <Tooltip label="Edit deck">
            <ActionIcon
              aria-label={`Edit deck`}
              onClick={() => navigate(routes.deckBuilder)}
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>
        </div>
        <div className={classes.tableColumnItem}>{value.name}</div>
        <div className={classes.tableColumnLastItem}>
          <Tooltip label="Delete deck">
            <ActionIcon
              aria-label={`Delete deck`}
              mr={25}
              tabIndex={10}
              onClick={() => selectAndOpenDelete(value)}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={isCollapsed ? 'Expand deck' : 'Collapse deck'}>
            <ActionIcon
              aria-label={isCollapsed ? 'Expand deck' : 'Collapse deck'}
              onClick={toggleCollapse}
            >
              {isCollapsed ? <IconCaretDown /> : <IconCaretUp />}
            </ActionIcon>
          </Tooltip>
        </div>

        <DeleteModal
          open={openDelete}
          setOpen={toggleDelete}
          submitAction={deleteFn}
          valueName={value.name}
        />
      </Flex>
      <div className={isCollapsed ? classes.hidden : classes.notHidden}>
        <div className={classes.cardDisplayContainer}>
          {value.cards.length !== 0 ? (
            <div
              className={classes.cardDisplayGroup}
              key={`${value.id}${value.name}`}
            >
              {value.cards.map((card, index) => (
                <Flex direction="column" align="center" key={index}>
                  <Indicator
                    size={18}
                    offset={7}
                    inline
                    position="top-end"
                    color="violet"
                    radius={5}
                    label={card.count}
                  >
                    <CardImageDisplay
                      key={index}
                      height={175}
                      width={125}
                      imageUrl={card.cardDisplay.imageUrl}
                    />
                  </Indicator>

                  <Text span lineClamp={1}>
                    {card.cardDisplay.name}
                  </Text>
                </Flex>
              ))}
            </div>
          ) : (
            <Flex p="1em" justify="center" className={classes.noCards}>
              Deck Does Not Contain Any Cards
            </Flex>
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = createStyles(
  (theme: MantineTheme, tableWidth: string | undefined) => {
    const [pageSize] = useAppSelector(
      (state) => [state.admin.pageSize],
      shallowEqual
    );
    return {
      hidden: {
        overflow: 'hidden',

        maxHeight: 0,
        transition: 'max-height 0.25s ease-in-out',
      },

      notHidden: {
        visibility: 'visible',
        borderCollapse: 'collapse',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-out',
        maxHeight: '300px',
      },

      tableContainer: {
        display: 'flex',
        justifyContent: 'center',
        wrap: 'wrap',
        margin: 'auto',

        backgroundColor: 'transparent',
      },

      table: {
        width: `${tableWidth ?? '100%'}`,
        marginTop: '15px',
        marginBottom: '5px',

        backgroundColor: theme.colors.secondaryBackgroundColor[0],
        border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
      },

      tableHeaderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        padding: '5px',

        border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
        backgroundColor: `${theme.fn.darken(
          theme.colors.secondaryPurpleColors[0],
          0.55
        )}`,
      },

      expander: {
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        top: '50%',
        right: '10px',
        marginRight: '0.5em',
        alignSelf: 'center',
      },

      tableRowHeader: {
        padding: 6,

        border: `solid 0.25px ${theme.fn.rgba(
          theme.colors.primaryPurpleColor[0],
          0.2
        )}`,
      },

      tableRow: {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.8
        ),

        ':hover': {
          backgroundColor: theme.fn.darken(
            theme.colors.primaryPurpleColor[0],
            0.45
          ),
        },
      },

      noData: {
        padding: 15,
        fontSize: 22,

        backgroundColor: `${theme.fn.rgba(
          theme.fn.darken(theme.colors.primaryPurpleColor[0], 0.93),
          1
        )}`,
      },

      tableColumnFirstItem: {
        width: '100%',
        padding: '0.1% 1.25%',
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'start',
        margin: 'auto',
      },

      tableColumnItem: {
        width: '100%',
        padding: '0.1% 1%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 'auto',
      },

      tableColumnLastItem: {
        width: '100%',
        padding: '0.1% 1%',
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: 'end',
        margin: 'auto',
      },

      loaderContainer: {
        backgroundColor: `${theme.fn.rgba(theme.colors.dark[9], 0.6)}`,
        height: `${pageSize * 10}px`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      },

      cardDisplayContainer: {
        display: 'grid',
        padding: 6,

        backgroundColor: `${theme.fn.rgba(
          theme.fn.darken(theme.colors.primaryPurpleColor[0], 0.9),
          0.88
        )}`,
      },

      cardDisplayGroup: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 150px)',
        justifyContent: 'center',

        columnGap: '10px',
        rowGap: '10px',
        paddingTop: '10px',
        paddingBottom: '15px',
      },

      noCards: {
        fontStyle: 'italic',
        fontSize: '22px',
        textAlign: 'center',
      },
    };
  }
);

import {
  ActionIcon,
  Container,
  Flex,
  Loader,
  MantineTheme,
  createStyles,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { shallowEqual, useDisclosure } from '@mantine/hooks';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { DeleteModal } from '../../../components/modals/DeleteModal';
import { DeckDisplayDto } from '../../../types/decks';
import { CardDisplay } from '../../../components/cardDisplay/CardDisplay';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/Index';
import { setSelectedDeckId } from '../../../store/deckSlice';

type DeckListingDisplayProps = {
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

  return (
    <>
      <Container pt={'0.5%'} pb={'1%'} fluid className={classes.tableContainer}>
        <div className={classes.table}>
          <header>
            <Flex dir="row" gap={'lg'} className={classes.tableHeader}>
              <div className={classes.tableColumnItem}>{label}</div>
            </Flex>
          </header>
          {data && !loading ? (
            data.map((value, index) => (
              <TableRow
                value={value}
                deleteFn={deleteFn}
                key={index}
                label={label}
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
              <i> No data to display </i>
            </Flex>
          )}
        </div>
      </Container>
    </>
  );
};

type TableRowProps = {
  value: DeckDisplayDto;
  label: string;
  deleteFn: () => Promise<void>;
};

export const TableRow = ({ value, label, deleteFn }: TableRowProps) => {
  const { classes } = useStyles(undefined);
  const navigate = useNavigate();

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();

  const selectAndOpenDelete = (value: any) => {
    toggleDelete();
    dispatch(setSelectedDeckId(value.id));
  };

  return (
    <div className={classes.tableRow}>
      <Flex
        className={classes.tableRowHeader}
        dir="row"
        gap={'lg'}
        justify="space-around"
        key={value.id}
      >
        <div className={classes.tableColumnFirstItem}>
          <ActionIcon
            aria-label={`Edit ${label}`}
            onClick={() => navigate(routes.deckBuilder)}
          >
            <IconEdit />
          </ActionIcon>
        </div>
        <div className={classes.tableColumnItem}>{value.name}</div>
        <div className={classes.tableColumnLastItem}>
          <ActionIcon
            aria-label={`Delete ${label}`}
            onClick={() => selectAndOpenDelete(value)}
          >
            <IconTrash />
          </ActionIcon>
        </div>
        <DeleteModal
          open={openDelete}
          setOpen={toggleDelete}
          submitAction={deleteFn}
          valueName={value.name}
        />
      </Flex>
      <div className={classes.cardDisplayContainer}>
        {value.cards.length !== 0 ? (
          <div className={classes.cardDisplayGroup}>
            {value.cards.map((card, index) => (
              <CardDisplay key={index} card={card} isLoading={false} />
            ))}
          </div>
        ) : (
          <Flex p="1em" justify="center" className={classes.noCards}>
            Deck Does Not Contain Any Cards
          </Flex>
        )}
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

      tableHeader: {
        fontWeight: 'bold',
        fontSize: '20px',
        padding: '7px',

        border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
        backgroundColor: `${theme.fn.darken(
          theme.colors.secondaryPurpleColors[0],
          0.55
        )}`,
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
      },

      tableColumnFirstItem: {
        width: '30%',
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
        padding: '0.1% 1.5%',
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: 'end',
        margin: 'auto',
      },

      loaderContainer: {
        backgroundColor: `${theme.fn.rgba(theme.colors.dark[9], 0.6)}`,
        height: `${pageSize * 44}px`,
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
        gridTemplateColumns: 'repeat(auto-fit, 368px)',
        justifyContent: 'center',

        columnGap: '20px',
        rowGap: '20px',
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

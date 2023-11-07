import {
  ActionIcon,
  Container,
  Flex,
  Loader,
  MantineTheme,
  Table,
  createStyles,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { EditModal } from './modals/EditModal';
import { PaginationSelect } from '../../../components/pagination/PaginationSelect';
import { useDisclosure } from '@mantine/hooks';
import { dispatch } from '../../../store/configureStore';
import { setSelectedId } from '../../../store/adminSlice';
import { AttributeGetDto } from '../../../types/attributes';
import { DeleteModal } from '../../../components/modals/DeleteModal';
import { RarityGetDto } from '../../../types/rarities';
import { CardTypeGetDto } from '../../../types/card-types';
import { SetGetDto } from '../../../types/sets';
import { GameGetDto } from '../../../types/games';

type AdminTableDataTypes =
  | AttributeGetDto
  | RarityGetDto
  | CardTypeGetDto
  | SetGetDto
  | GameGetDto;

type AdminTableEditTypes = AttributeGetDto &
  RarityGetDto &
  CardTypeGetDto &
  SetGetDto &
  GameGetDto;

type AdminPaginatedTableProps = {
  data: AdminTableDataTypes[] | undefined;
  loading: boolean;
  pageCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  editFn: (valueDto: AdminTableEditTypes) => Promise<void>;
  deleteFn: () => Promise<void>;
  /**Name to be used in Aria Labels */
  typeName: string;
  tableWidth?: string;
};

export const AdminPaginatedTable = ({
  data,
  loading,
  page,
  pageCount,
  setPage,
  editFn,
  deleteFn,
  typeName: ariaLabel,
  tableWidth,
}: AdminPaginatedTableProps) => {
  const { classes } = useStyles();
  const titles: string[] = ['Edit', 'Name', 'Delete'];
  return (
    <>
      <Container pt={'0.5%'} pb={'1%'} fluid className={classes.tableContainer}>
        <Table
          mt="15px"
          mb="5px"
          highlightOnHover
          className={classes.table}
          w={tableWidth ?? '100%'}
        >
          <thead>
            <Flex
              dir="row"
              gap={'lg'}
              justify="space-around"
              className={classes.tableHeader}
            >
              <div className={classes.tableColumnFirstItem}>{titles[0]}</div>
              <div className={classes.tableColumnItem}>{titles[1]}</div>
              <div className={classes.tableColumnLastItem}>{titles[2]}</div>
            </Flex>
          </thead>
          {data && !loading ? (
            data.map((value, index) => (
              <TableRow
                value={value}
                index={index}
                typeName={ariaLabel}
                editFn={editFn}
                deleteFn={deleteFn}
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
        </Table>
      </Container>

      <Flex dir="row" justify="flex-end" pb="5px" pr="25px">
        <PaginationSelect
          currentPage={page}
          setCurrentPage={setPage}
          total={pageCount}
        />
      </Flex>
    </>
  );
};

type TableRowProps = {
  value: AdminTableDataTypes;
  index: number;
  /**Name to be used in Aria Labels */
  typeName: string;
  editFn: (valueDto: AdminTableEditTypes) => Promise<void>;
  deleteFn: () => Promise<void>;
};

export const TableRow = ({
  value,
  index,
  typeName,
  editFn,
  deleteFn,
}: TableRowProps) => {
  const { classes } = useStyles();
  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const selectAndOpenDelete = (value: AdminTableDataTypes) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: AdminTableDataTypes) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

  return (
    <>
      <Flex
        dir="row"
        gap={'lg'}
        justify="space-around"
        className={index % 2 === 1 ? classes.tableRowOther : classes.tableRow}
        key={value.id}
      >
        <td className={classes.tableColumnFirstItem}>
          <ActionIcon
            aria-label={`Edit ${typeName}`}
            onClick={() => selectAndOpenEdit(value)}
          >
            <IconEdit />
          </ActionIcon>
        </td>
        <td className={classes.tableColumnItem}>{value.name}</td>
        <td className={classes.tableColumnLastItem}>
          <ActionIcon
            aria-label={`Delete ${typeName}`}
            onClick={() => selectAndOpenDelete(value)}
          >
            <IconTrash />
          </ActionIcon>
        </td>
        <EditModal
          open={openEdit}
          setOpen={toggleEdit}
          submitAction={editFn}
          value={value}
        />
        <DeleteModal
          open={openDelete}
          setOpen={toggleDelete}
          submitAction={deleteFn}
          valueName={value.name}
        />
      </Flex>
    </>
  );
};

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    tableContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      display: 'flex',
      wrap: 'wrap',
      margin: 'auto',
    },

    table: {
      backgroundColor: theme.colors.secondaryBackgroundColor[0],
      border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
    },

    noData: {
      padding: 15,
      fontSize: 22,
    },

    tableRow: {
      padding: 6,
      borderBottom: `solid 0.25px rgba(157, 101, 219, 0.25)`,

      ':hover': {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.2
        ),
      },
    },

    tableRowOther: {
      padding: 6,
      borderBottom: `solid 0.25px rgba(157, 101, 219, 0.25)`,
      backgroundColor: 'rgba(117, 55, 130, 0.1)',
      ':hover': {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.2
        ),
      },
    },

    tableHeader: {
      fontWeight: 'bold',
      padding: '7px',
      backgroundColor: 'rgba(35, 0, 43, 0.45)',
      border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
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
      justifyContent: 'flex-start',
      textAlign: 'start',
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
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: '1104px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
  };
});

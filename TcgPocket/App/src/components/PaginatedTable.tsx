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
import { EditModal } from '../pages/admin/modules/modals/EditModal';
import { PaginationSelect } from './pagination/PaginationSelect';
import { useDisclosure } from '@mantine/hooks';
import { dispatch } from '../store/configureStore';
import { setSelectedId } from '../store/adminSlice';
import { AttributeGetDto } from '../types/attributes';
import { PagedResult } from '../types/shared';

type PaginatedTableProps = {
  data: PagedResult | undefined;
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  tableWidth?: string;
};

export const PaginatedTable = ({
  data,
  loading,
  page,
  setPage,
  tableWidth,
}: PaginatedTableProps) => {
  const { classes } = useStyles();

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const selectAndOpenDelete = (value: AttributeGetDto) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: AttributeGetDto) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

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
              <div className={classes.tableColumnItem}>Edit</div>
              <div className={classes.tableColumnItem}>Name</div>
              <div className={classes.tableColumnLastItem}>Delete</div>
            </Flex>
          </thead>
          {data && !loading ? (
            data.items.map((attribute) => {
              return (
                <tbody>
                  <Flex
                    dir="row"
                    gap={'lg'}
                    justify="space-around"
                    className={classes.tableRow}
                    key={attribute.id}
                  >
                    <td className={classes.tableColumnItem}>
                      <ActionIcon
                        aria-label="Edit Attribute"
                        onClick={() => selectAndOpenEdit(attribute)}
                      >
                        <IconEdit />
                      </ActionIcon>
                    </td>
                    <td className={classes.tableColumnItem}>
                      {attribute.name}
                    </td>
                    <td className={classes.tableColumnLastItem}>
                      <ActionIcon
                        aria-label="Delete Attribute"
                        onClick={() => selectAndOpenDelete(attribute)}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </td>

                    {/* {selectedId === attribute.id && (
                      <EditModal
                        open={openEdit}
                        setOpen={toggleEdit}
                        submitAction={editSelectedAttribute}
                        value={attribute}
                      />
                    )} */}
                  </Flex>
                </tbody>
              );
            })
          ) : (
            <div className={classes.loaderContainer}>
              <Loader size="150px" color="#9d65db" />
            </div>
          )}
          {data?.items.length === 0 && !loading && (
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
          total={data?.pageCount ?? 1}
        />
      </Flex>
    </>
  );
};

const TableRowWidths = {
  1: 100,
  2: 150,
  3: 250,
  4: 400,
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

    tableHeader: {
      fontWeight: 'bold',
      padding: '7px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
    },

    tableColumnItem: {
      width: '100%',
      padding: `${TableRowWidths[4] / 250}px ${TableRowWidths[4] / 50}px`,
      display: 'flex',
      justifyContent: 'flex-start',
      textAlign: 'start',
      margin: 'auto',
    },

    tableColumnLastItem: {
      width: '100%',
      padding: `${TableRowWidths[4] / 250}px ${TableRowWidths[4] / 50}px`,
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

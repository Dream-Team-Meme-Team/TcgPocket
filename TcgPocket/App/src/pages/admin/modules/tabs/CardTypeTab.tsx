import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { TabInfoHeader } from '../headers/TabInfoHeader';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { EditModal } from '../modals/EditModal';
import { useDisclosure } from '@mantine/hooks';
import {
  deleteCardType,
  editCardType,
  getAllCardTypes,
} from '../../../../services/dataServices/CardTypeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { CardTypeGetDto } from '../../../../types/card-types';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { setSelectedId } from '../../../../store/dataSlice';

const titles: string[] = ['Name', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export function CardTypeTab(): React.ReactElement {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const cardTypes = useAppSelector((state) => state.data.cardTypes);
  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const selectedId = useAppSelector((state) => state.data.selectedId);
  const selectedGameId = useAppSelector((state) => state.data.selectedGameId);

  const renderedCardTypes = useMemo(() => {
    return cardTypes
      .filter((cardType) => cardType.gameId === selectedGameId)
      .filter((cardType) =>
        cardType.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [cardTypes, searchTerm, selectedGameId]);

  const selectAndOpenDelete = (value: CardTypeGetDto) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: CardTypeGetDto) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

  const loadCardTypes = async () => {
    const { payload } = await dispatch(getAllCardTypes());
    responseWrapper(payload);
  };

  const deleteSelectedCardType = async () => {
    const { payload } = await dispatch(deleteCardType(selectedId));
    responseWrapper(payload, 'Card Type Deleted');

    if (payload && !payload.hasErrors) {
      loadCardTypes();
    }
  };

  const editSelectedCardType = async (editedCardType: CardTypeGetDto) => {
    const updatedCardType: CardTypeGetDto = {
      id: editedCardType.id,
      name: editedCardType.name,
      gameId: selectedGameId,
    };

    const { payload } = await dispatch(editCardType(updatedCardType));
    responseWrapper(payload, 'Card Type Edited');

    if (payload && !payload.hasErrors) {
      loadCardTypes();
    }
  };

  return (
    <div className={classes.cardTypeContainer}>
      <TabInfoHeader titles={titles} />

      <div>
        {renderedCardTypes.map((cardType, index) => {
          return (
            <div key={index} className={classes.renderedCardTypeContainer}>
              <div> {cardType.name} </div>

              <ActionIcon onClick={() => selectAndOpenEdit(cardType)}>
                <IconEdit />
              </ActionIcon>

              <ActionIcon onClick={() => selectAndOpenDelete(cardType)}>
                <IconTrash />
              </ActionIcon>

              <div>
                {selectedId === cardType.id && (
                  <EditModal
                    open={openEdit}
                    setOpen={toggleEdit}
                    submitAction={editSelectedCardType}
                    value={cardType}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DeleteModal
        open={openDelete}
        setOpen={toggleDelete}
        deleteText="Permanently Delete"
        submitAction={deleteSelectedCardType}
      />
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme, numOfCol: string) => {
  return {
    cardTypeContainer: {
      paddingLeft: '8px',
    },

    renderedCardTypeContainer: {
      display: 'grid',
      gridTemplateColumns: numOfCol,

      ':hover': {
        backgroundColor: theme.colors.primaryColor[0],

        borderRadius: 7,
        paddingLeft: 8,
      },
    },
  };
});

import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Container,
  createStyles,
  Divider,
  ScrollArea,
  Title,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useAsyncFn } from 'react-use';
import { CardReaderService } from '../../services/CardReaderService';
import { error, success } from '../../services/helpers/Notification';
import { useState } from 'react';
import { CardDisplayDto } from '../../types/cards';
import { CardDisplay } from '../../components/cardDisplay/CardDisplay';

export function CardUploadPage() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [uploadedCards, setUploadedCards] = useState<CardDisplayDto[]>([]);

  const [uploadCardState, uploadCard] = useAsyncFn(
    async (files: FileWithPath[]) => {
      if (!files) {
        return;
      }

      const response = await CardReaderService.readCard(
        await files[0].arrayBuffer()
      );

      if (response.hasErrors) {
        response.errors.forEach((err) => error(err.message));
        return;
      }

      setUploadedCards((state) => [...state, response.data]);

      success('Card Uploaded to inventory');

      return response.data;
    }
  );

  const rejectFile = () => {
    error('File must be a png or jpg');
  };

  return (
    <Container className={classes.uploadContainer}>
      <Dropzone
        onDrop={uploadCard}
        onReject={rejectFile}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        loading={uploadCardState.loading}
      >
        <Group
          className={classes.internalUploadContainer}
          position="center"
          spacing="xl"
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach one file ONLY one, any more and you are not invited to the
              mojo dojo casa house. Must be a .png or .jpeg.
            </Text>
          </div>
        </Group>
      </Dropzone>
      {uploadedCards.length > 0 && (
        <>
          <Divider
            pt={10}
            pb={10}
            variant="dashed"
            label={<Title>Cards Added To Inventory</Title>}
            labelPosition={'center'}
          />

          <div className={classes.inventoryDisplayContainer}>
            <ScrollArea>
              <div className={classes.inventoryDisplayGroup}>
                {uploadedCards.map((cards, index) => (
                  <CardDisplay key={index} isLoading={false} card={cards} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  uploadContainer: {
    paddingTop: '50px',
  },
  internalUploadContainer: { minHeight: rem(220), pointerEvents: 'none' },
  inventoryDisplayContainer: {
    display: 'grid',

    overflowY: 'hidden',
  },

  inventoryDisplayGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 368px)',
    justifyContent: 'center',

    columnGap: '8px',
    rowGap: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',

    backgroundColor: theme.colors.inventoryBackgroundColor,
  },
}));

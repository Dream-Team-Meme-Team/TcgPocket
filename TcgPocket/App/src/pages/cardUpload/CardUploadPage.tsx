import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Container,
  createStyles,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useAsyncFn } from 'react-use';
import { CardReaderService } from '../../services/CardReaderService';
import { error, success } from '../../services/helpers/Notification';

export function CardUploadPage() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

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

      success('Card Uploaded to inventory');

      return response.data;
    }
  );

  const rejectFile = () => {
    error('File must be a png, jpg, or bmp');
  };

  return (
    <Container className={classes.uploadContainer}>
      <Dropzone
        onDrop={uploadCard}
        onReject={rejectFile}
        accept={IMAGE_MIME_TYPE}
        loading={uploadCardState.loading}
      >
        <Group className={classes.foo} position="center" spacing="xl">
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
              mojo dojo casa house
            </Text>
          </div>
        </Group>
      </Dropzone>
    </Container>
  );
}

const useStyles = createStyles(() => ({
  uploadContainer: {
    paddingTop: '50px',
  },
  foo: { minHeight: rem(220), pointerEvents: 'none' },
}));

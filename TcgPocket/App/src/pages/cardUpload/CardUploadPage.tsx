import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Container,
  Paper,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useAsyncFn } from 'react-use';
import { CardReaderService } from '../../services/CardReaderService';
import { error } from '../../services/helpers/Notification';

export function CardUploadPage() {
  const theme = useMantineTheme();

  const [uploadCardState, uploadCard] = useAsyncFn(
    async (files: FileWithPath[]) => {
      if (!files) {
        return;
      }

      console.log(files[0]);

      const response = await CardReaderService.readCard(
        await files[0].arrayBuffer()
      );

      if (response.hasErrors) {
        response.errors.forEach((err) => error(err.message));
      }

      console.log(response.data);

      return response.data;
    }
  );

  return (
    <>
      <Container sx={{ paddingTop: '50px' }}>
        <>
          <Dropzone
            onDrop={uploadCard}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: 'none' }}
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
                  Attach one file ONLY one, any more and you are not invited to
                  the mojo dojo casa house
                </Text>
              </div>
            </Group>
          </Dropzone>

          {uploadCardState.value && (
            <Container>
              <Paper>{uploadCardState.value}</Paper>
            </Container>
          )}
        </>
      </Container>
    </>
  );
}

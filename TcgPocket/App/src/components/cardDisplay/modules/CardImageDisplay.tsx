import {
  AspectRatio,
  Flex,
  ModalBaseStylesNames,
  Styles,
  Image,
  createStyles,
  Tooltip,
  Skeleton,
  Modal,
  Grid,
} from '@mantine/core';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useState } from 'react';

type CardImageDisplayProps = {
  imageUrl: string;
};

export function CardImageDisplay({ imageUrl }: CardImageDisplayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();
  let url: URL;

  try {
    url = new URL(imageUrl);
  } catch (_) {
    return (
      <Tooltip
        label={'No image available'}
        offset={-100}
        color="rgba(0,0,0,0.7)"
      >
        <Flex className={classes.invalidUrl}>
          <IconAlertTriangleFilled
            size={'70px'}
            className={classes.invalidUrlIcon}
          />
          <Flex className={classes.invalidUrlText}>
            <br />
            Image Not Found
          </Flex>
        </Flex>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip
        label={'View image'}
        position="top-end"
        offset={-40}
        color="rgba(0,0,0,0.7)"
      >
        <AspectRatio ratio={16 / 9} h={220} miw={'9.3rem'}>
          <Skeleton radius={7} width={152} height={220} visible={isLoading}>
            <Image
              onClick={() => setOpen(true)}
              src={imageUrl}
              fit="scale-down"
              radius={7}
              width={'152px'}
              onLoad={() => setIsLoading(false)}
              className={classes.imageHover}
            />
          </Skeleton>
        </AspectRatio>
      </Tooltip>
      <Modal.Root
        padding={10}
        radius={10}
        centered
        opened={open}
        onClose={() => setOpen(false)}
        styles={modalProps}
      >
        <Modal.Overlay />
        <Modal.Content p={10}>
          <Flex h="3.5%" align={'flex-end'}>
            <Modal.CloseButton />
          </Flex>
          <Modal.Body h="92%">
            <Grid m="auto" h="100%" align="center" justify="center">
              <Grid.Col span={10}>
                <AspectRatio ratio={63 / 88}>
                  <img className={classes.modalImageStyling} src={imageUrl} />
                </AspectRatio>
              </Grid.Col>
            </Grid>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

const modalProps: Styles<ModalBaseStylesNames> = {
  content: {
    backgroundColor: 'rgba(225,225,225,0.65)',
    padding: 0,
    overflow: 'hidden',
    height: '80%',
    maxHeight: '700px !important',
  },
  header: {
    display: 'flex',
    justifyContent: 'right',
    textAlign: 'right',
  },
  close: {
    color: 'white',
    zIndex: 5,
    scale: '1.5',
    borderRadius: '5px',
    transform: 'translateY(0.1em) translateX(-0.2em)',
    ':focus': {
      transform: 'translateY(0.1em) translateX(-0.2em)',
    },
  },
  body: {
    padding: '0px 30px',
    objectFit: 'scale-down',
  },
  root: {
    height: 2000,
  },
};

const useStyles = createStyles(() => ({
  invalidUrl: {
    backgroundColor: '#C3C3C6',
    border: 'solid 6px rgba(46, 46, 46, 0.9)',
    width: '155px',
    paddingRight: 0,
    height: '216px',
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap',
    alignContent: 'center',
  },

  invalidUrlText: {
    margin: 'auto',
    color: 'rgba(46, 46, 46, 1)',
    fontWeight: 600,
  },

  invalidUrlIcon: {
    color: 'rgba(46, 46, 46, 0.9)',
  },

  imageHover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },

  modalImageStyling: {
    scale: '1.4',
    display: 'flex',
    margin: 'auto',
    objectFit: 'scale-down',
    borderRadius: '1.5rem',
    boxShadow: '0rem .2rem 0.5rem 0 rgba(0, 0, 0, .5)',
  },
}));

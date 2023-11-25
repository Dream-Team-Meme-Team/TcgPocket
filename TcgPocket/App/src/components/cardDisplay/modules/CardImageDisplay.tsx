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
  Text,
} from '@mantine/core';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useState } from 'react';

type CardImageDisplayProps = {
  imageUrl: string;
  height?: number;
  width?: number;
  clickable?: boolean;
};

export function CardImageDisplay({
  imageUrl,
  height,
  width,
  clickable,
}: CardImageDisplayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();
  let url: URL;

  try {
    url = new URL(imageUrl);
  } catch (_) {
    return (
      <>
        {clickable !== false ? (
          <Tooltip
            label={'No image available'}
            offset={-100}
            color="rgba(0,0,0,0.7)"
          >
            <Flex
              w={width ?? 155}
              h={height ?? 216}
              className={classes.invalidUrl}
            >
              <IconAlertTriangleFilled
                size={height ? height * 0.25 : 70}
                className={classes.invalidUrlIcon}
              />
              <Flex className={classes.invalidUrlText}>
                <Text p={2} size={height && height <= 100 ? 'xs' : undefined}>
                  Image Not Found
                </Text>
              </Flex>
            </Flex>
          </Tooltip>
        ) : (
          <Flex
            w={width ?? 155}
            h={height ?? 216}
            className={classes.invalidUrl}
          >
            <IconAlertTriangleFilled
              size={height ? height * 0.25 : 70}
              className={classes.invalidUrlIcon}
            />
            <Flex className={classes.invalidUrlText}>
              <Text p={2} size={height && height <= 100 ? 'xs' : undefined}>
                Image Not Found
              </Text>
            </Flex>
          </Flex>
        )}
      </>
    );
  }

  return (
    <>
      {clickable !== false ? (
        <Tooltip
          label={'View image'}
          position="top-end"
          offset={-40}
          color="rgba(0,0,0,0.7)"
        >
          <AspectRatio ratio={16 / 9} h={height ?? 220} miw={width ?? '9.3rem'}>
            <Skeleton
              radius={7}
              width={width ?? 152}
              height={height ?? 220}
              visible={isLoading}
            >
              <Image
                onClick={() => setOpen(true)}
                src={imageUrl}
                fit="scale-down"
                radius={7}
                onLoad={() => setIsLoading(false)}
                className={classes.imageHover}
              />
            </Skeleton>
          </AspectRatio>
        </Tooltip>
      ) : (
        <AspectRatio ratio={16 / 9} h={height ?? 220} miw={width ?? '9.3rem'}>
          <Skeleton
            radius={7}
            width={width ?? 152}
            height={height ?? 220}
            visible={isLoading}
          >
            <Image
              src={imageUrl}
              fit="scale-down"
              radius={7}
              onLoad={() => setIsLoading(false)}
            />
          </Skeleton>
        </AspectRatio>
      )}
      <Modal.Root
        centered
        opened={open}
        onClose={() => setOpen(false)}
        styles={modalProps}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.CloseButton iconSize={25} size={25} />

          <Modal.Body>
            <Image radius={17} src={imageUrl} security="yamomma" />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

const modalProps: Styles<ModalBaseStylesNames> = {
  content: {
    backgroundColor: 'rgba(225,225,225,0.65)',
  },
};

const useStyles = createStyles(() => ({
  invalidUrl: {
    backgroundColor: '#C3C3C6',
    border: 'solid 6px rgba(46, 46, 46, 0.9)',
    paddingRight: 0,
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
    wordBreak: 'keep-all',
    textAlign: 'center',
  },

  invalidUrlIcon: {
    color: 'rgba(46, 46, 46, 0.9)',
  },

  imageHover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

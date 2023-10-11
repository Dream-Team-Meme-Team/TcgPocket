import {
  AspectRatio,
  Flex,
  ModalBaseStylesNames,
  Styles,
  Image,
  createStyles,
  Tooltip,
  Skeleton,
} from '@mantine/core';
import { PrimaryModal } from '../../modals/PrimaryModal';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useState } from 'react';

export const CardImageDisplay: React.FC<{ imageUrl: string }> = ({
  imageUrl,
}) => {
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
      <PrimaryModal
        styles={modalProps}
        padding={10}
        radius={10}
        centered
        size={550}
        opened={open}
        onClose={() => setOpen(false)}
      >
        <AspectRatio ratio={63 / 88} h={715}>
          <img className={classes.modalImageStyling} src={imageUrl} />
        </AspectRatio>
      </PrimaryModal>
    </>
  );
};

const modalProps: Styles<ModalBaseStylesNames> = {
  header: {
    backgroundColor: 'rgba(35, 27, 54,0.8)',
    display: 'flex',
    justifyContent: 'right',
    textAlign: 'right',
    height: '40px',
  },
  close: {
    color: 'white',
    zIndex: 5,
    position: 'fixed',
    scale: '1.5',
    borderRadius: '5px',
    transform: 'translateY(5px) translateX(-5px)',
    ':focus': {
      transform: 'translateY(5px) translateX(-5px)',
    },
  },
  body: {
    padding: '30px 30px',
    backgroundColor: 'rgba(35, 27, 54,0.8)',
    objectFit: 'scale-down',
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
    display: 'flex',
    margin: 'auto',
    objectFit: 'scale-down',
    borderRadius: '0.75rem',
    boxShadow: '0rem .2rem 0.5rem 0 rgba(0, 0, 0, .5)',
  },
}));

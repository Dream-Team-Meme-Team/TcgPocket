import { createStyles } from '@mantine/core';

export const useLoginOrRegisterStyles = createStyles(() => ({
  bodyContainer: {
    display: 'grid',
    gap: 8,
  },

  bottomBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  },
}));

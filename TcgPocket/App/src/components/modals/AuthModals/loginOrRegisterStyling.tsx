import { createStyles } from '@mantine/core';

export const useLoginOrRegisterStyles = createStyles(() => ({
  bodyContainer: {
    display: 'grid',
    gap: 8,
  },

  bottomBtns: {
    paddingTop: '5px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  },

  passwordInput: {
    input: {
      backgroundColor: 'white',
    },
  },
}));

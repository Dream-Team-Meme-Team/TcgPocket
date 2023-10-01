import { createStyles } from '@mantine/core';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

type AdminButtonsProps = {
  handleCancel: () => void;
};

export function AdminButtons({
  handleCancel,
}: AdminButtonsProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.buttonsContainer}>
      <SecondaryButton type="reset" onClick={handleCancel}>
        Cancel
      </SecondaryButton>
      <PrimaryButton type="submit"> Add </PrimaryButton>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',

      paddingTop: '8px',
      gap: '8px',
    },
  };
});

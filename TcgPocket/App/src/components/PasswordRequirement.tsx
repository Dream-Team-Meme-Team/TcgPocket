import { Box, createStyles, MantineTheme, rem, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

type Requirements = {
  re: RegExp;
  label: string;
};

export const passwordRequirements: Requirements[] = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[!@#$%^&*]/, label: 'Includes ones special character' },
];

type PasswordRequirementProps = {
  meets: boolean;
  label: string;
};

export function PasswordRequirement({
  meets,
  label,
}: PasswordRequirementProps): React.ReactElement {
  const { classes } = useStyles(meets);
  return (
    <Text size={'sm'} className={classes.text}>
      {meets ? (
        <IconCheck className={classes.icon} />
      ) : (
        <IconX className={classes.icon} />
      )}
      <Box className={classes.box}> {label} </Box>
    </Text>
  );
}

const useStyles = createStyles((theme: MantineTheme, meets: boolean) => {
  return {
    text: {
      display: 'flex',
      alignItems: 'center',
      spacing: 7,
      color: meets ? theme.colors.primaryColor[0] : theme.colors.red,
    },

    icon: {
      width: rem(14),
      height: rem(14),
    },

    box: {
      paddingLeft: 10,
    },
  };
});

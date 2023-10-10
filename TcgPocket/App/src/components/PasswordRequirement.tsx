import { Box, createStyles, MantineTheme, rem, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

type Requirements = {
  expression: RegExp;
  label: string;
};

export const passwordRequirements: Requirements[] = [
  { expression: /^.{6,}$/, label: 'Must be at least 6 characters' },
  { expression: /[0-9]/, label: 'Includes number' },
  { expression: /[a-z]/, label: 'Includes lowercase letter' },
  { expression: /[A-Z]/, label: 'Includes uppercase letter' },
  { expression: /[!@#$%^&*]/, label: 'Includes ones special character' },
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
      color: meets
        ? theme.colors.secondaryPurpleColors[1]
        : theme.colors.red[0],
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

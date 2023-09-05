import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';
// import { DefaultActionProps } from '@mantine/spotlight/lib/DefaultAction/DefaultAction';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { forwardRef } from 'react';

// type TCGButtonProps = {
//   children?: JSX.Element | string;
//   sx?: (theme: MantineTheme) => CSSObject;
// } & Partial<DefaultActionProps>;

// function useButtonSx() {
//   return (theme: MantineTheme): CSSObject => {
//     return {
//       backgroundColor: theme.colors.primaryColor,
//       color: theme.colors.complimentaryColors[1],
//       paddding: `${theme.spacing.sm} ${theme.spacing.lg}`,
//       ':hover': {
//         backgroundColor: '#e2c2aa',
//       },
//     };
//   };
// }

// export function TCGButton({
//   children,
//   sx,
// }: TCGButtonProps): React.ReactElement {
//   const buttonStyling = useButtonSx();

//   return <Button sx={sx ?? buttonStyling}>{children}</Button>;
// }

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.primaryColor,
  color: theme.colors.complimentaryColors[1],
  paddding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  ':hover': {
    backgroundColor: '#e2c2aa',
  },
});

const _PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button component="button" {...props} ref={ref} sx={buttonStyling}>
      {children}
    </Button>
  )
);

export const PrimaryButton = createPolymorphicComponent<'button', ButtonProps>(
  _PrimaryButton
);

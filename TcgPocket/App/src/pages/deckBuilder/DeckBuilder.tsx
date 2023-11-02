import { createStyles, MantineTheme } from '@mantine/styles';

export function DeckBuilder(): React.ReactElement {
    return <div>DeckBuilder.tsx Component</div>;
}

const useStyles = createStyles((theme: MantineTheme) => {
    return {
        container: {
            displat: 'flex',
        },
    };
});

import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from '@tabler/icons-react';
import { MantineTheme, createStyles } from '@mantine/core';
import { defaultGap } from '../../constants/theme';
import { PrimarySelect } from '../inputs/PrimarySelect';
import { generateNumberArray } from '../../helpers/generateNumberArray';
import { PrimaryIconButton } from '../buttons/PrimaryIconButton';

type PaginationSelectProps = {
    currentPage: number;
    setCurrentPage: (arg: number) => void;
    total: number;
    className?: string;
};

export function PaginationSelect({
    currentPage,
    setCurrentPage,
    total,
    className,
}: PaginationSelectProps): React.ReactElement {
    const { classes } = useStyles();

    const data = generateNumberArray(total);

    const returnToStart = () => {
        setCurrentPage(1);
    };

    const goBack = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    const goForward = () => {
        if (currentPage === total) return;
        setCurrentPage(currentPage + 1);
    };

    const skipToEnd = () => {
        setCurrentPage(total);
    };

    const handleSelectChange = (
        currentPage: string | React.ChangeEvent<HTMLInputElement> | null
    ) => {
        if (typeof currentPage !== 'string') return;

        setCurrentPage(parseInt(currentPage));
    };

    return (
        <div className={className ?? classes.wrapper}>
            <PrimaryIconButton
                className={classes.icon}
                onClick={returnToStart}
                disabled={currentPage === 1}
            >
                <IconChevronsLeft />
            </PrimaryIconButton>

            <PrimaryIconButton
                className={classes.icon}
                onClick={goBack}
                disabled={currentPage === 1}
            >
                <IconChevronLeft />
            </PrimaryIconButton>

            <PrimarySelect
                searchable
                className={classes.select}
                value={currentPage.toString()}
                data={data.map((value) => value.toString())}
                onChange={handleSelectChange}
            />

            <PrimaryIconButton
                className={classes.icon}
                onClick={goForward}
                disabled={currentPage === total}
            >
                <IconChevronRight />
            </PrimaryIconButton>

            <PrimaryIconButton
                className={classes.icon}
                onClick={skipToEnd}
                disabled={currentPage === total}
            >
                <IconChevronsRight />
            </PrimaryIconButton>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => {
    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',

            gap: defaultGap,
        },

        icon: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.colors.primaryPurpleColor,
        },

        select: {
            width: 75,

            borderStyle: 'none',
            borderWidth: 0,
        },
    };
});

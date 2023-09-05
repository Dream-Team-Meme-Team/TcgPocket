import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { PrimaryBadge } from '../../mantineComponentsStyling/PrimaryBadge';

interface FilterBadgeProps {
    filterName: string;
}

export function FilterBadge({
    filterName,
}: FilterBadgeProps): React.ReactElement {
    return (
        <PrimaryBadge leftSection={removeButton}> {filterName} </PrimaryBadge>
    );
}

const removeButton = (
    <ActionIcon size="xs" color="dark" radius="xl" variant="transparent">
        <IconX size={rem(15)} />
    </ActionIcon>
);

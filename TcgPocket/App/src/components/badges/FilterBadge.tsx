import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { PrimaryBadge } from './PrimaryBadge';
import React from 'react';
import { FilterSideMenuProps } from '../filterSideMenu/FilterSideMenu';
import { GameGetDto } from '../../types/games';

type FilterBadgeProps = Pick<FilterSideMenuProps, 'handleRemoveFilter'> & {
    filter: GameGetDto;
};

export function FilterBadge({
    filter,
    handleRemoveFilter,
}: FilterBadgeProps): React.ReactElement {
    return (
        <PrimaryBadge
            onClick={() => handleRemoveFilter(filter)}
            leftSection={removeButton}
            styles={{ root: { cursor: 'pointer' } }}
        >
            {filter.name}
        </PrimaryBadge>
    );
}

const removeButton = (
    <ActionIcon size="xs" color="dark" radius="xl" variant="transparent">
        <IconX size={rem(15)} />
    </ActionIcon>
);

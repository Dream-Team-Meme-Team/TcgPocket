import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { PrimaryBadge } from '../../badges/PrimaryBadge';
import { useDispatch } from 'react-redux';
import { Games } from '../../../constants/fakeData/inventoryData';
import { toggleAppliedFilterOnInventory } from '../../../store/inventorySlice';

interface FilterBadgeProps {
    filter: Games;
}

export function FilterBadge({ filter }: FilterBadgeProps): React.ReactElement {
    const dispatch = useDispatch();

    const removeFilter = () => {
        dispatch(toggleAppliedFilterOnInventory(filter));
    };

    return (
        <PrimaryBadge
            onClick={removeFilter}
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

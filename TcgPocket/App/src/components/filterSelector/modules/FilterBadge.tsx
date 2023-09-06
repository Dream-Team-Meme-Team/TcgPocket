import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { PrimaryBadge } from '../../mantineComponentsStyling/PrimaryBadge';
import { useDispatch } from 'react-redux';
import { toggleAppliedFilter } from '../../../store/inventorySlice';
import { Games } from '../../../constants/fakeData/inventoryData';

interface FilterBadgeProps {
    filter: Games;
}

export function FilterBadge({ filter }: FilterBadgeProps): React.ReactElement {
    const dispatch = useDispatch();

    const removeFilter = () => {
        dispatch(toggleAppliedFilter(filter));
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

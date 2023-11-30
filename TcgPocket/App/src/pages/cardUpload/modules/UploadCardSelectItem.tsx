import { Group, Text } from '@mantine/core';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  imageUrl: string;
  game: string;
  set: string;
  cardNumber: string;
}

export const UploadCardSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, imageUrl, game, set, cardNumber, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <CardImageDisplay
          clickable={false}
          height={100}
          width={70}
          imageUrl={imageUrl}
        />
        <div>
          <Text size="lg">{label}</Text>
          <Text size="md" opacity={0.65}>
            {set} | {cardNumber}
          </Text>
          <Text size="sm" opacity={0.65}>
            {game}
          </Text>
        </div>
      </Group>
    </div>
  )
);
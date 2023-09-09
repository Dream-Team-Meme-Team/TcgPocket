import { useViewportSize } from '@mantine/hooks';
import { useMemo } from 'react';

export type ScaleSizeFactor = {
  scale: number;
  min?: number;
  max?: number;
};

export const DEFAULT_SCALE_FACTOR: ScaleSizeFactor = {
  scale: 1,
  min: undefined,
  max: undefined,
} as const;

export function useScaledViewportSize(
  heightFactor: ScaleSizeFactor = DEFAULT_SCALE_FACTOR,
  widthFactor: ScaleSizeFactor = DEFAULT_SCALE_FACTOR
) {
  const { height, width } = useViewportSize();

  const scaledHeight = useMemo(() => {
    const scaledHeight = height * heightFactor.scale;

    if (heightFactor.min && scaledHeight < heightFactor.min) {
      return heightFactor.min;
    }

    if (heightFactor.max && scaledHeight > heightFactor.max) {
      return heightFactor.max;
    }

    return scaledHeight;
  }, [height]);

  const scaledWidth = useMemo(() => {
    let scaledWidth = width * widthFactor.scale;

    if (widthFactor.min && scaledWidth < widthFactor.min) {
      return widthFactor.min;
    }

    if (widthFactor.max && scaledWidth > widthFactor.max) {
      return widthFactor.max;
    }

    return scaledWidth;
  }, [width]);

  return { scaledHeight, scaledWidth };
}

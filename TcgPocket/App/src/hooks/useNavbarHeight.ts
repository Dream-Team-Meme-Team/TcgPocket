import { useMemo } from 'react';
import { useViewportSize } from '@mantine/hooks';
import {
  ScaleSizeFactor,
  useScaledViewportSize,
} from './useScaledViewportSize';

const MIN_NAV_HEIGHT = 60 as const;
const MAX_NAV_HEIGHT = 120 as const;

export function useNavbarHeight() {
  const { height } = useViewportSize();
  const navbarScaleFactor: ScaleSizeFactor = {
    scale: 0.075,
    min: MIN_NAV_HEIGHT,
    max: MAX_NAV_HEIGHT,
  };

  const { scaledHeight: navbarHeight } =
    useScaledViewportSize(navbarScaleFactor);
  const remainingHeight = useMemo(
    () => height - navbarHeight,
    [height, navbarHeight]
  );
  return { navbarHeight, remainingHeight };
}

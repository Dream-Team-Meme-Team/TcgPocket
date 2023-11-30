import { Carousel, CarouselStylesNames } from '@mantine/carousel';
import { CarouselStylesParams } from '@mantine/carousel/lib/Carousel.styles';
import { createStyles, Image, rem, Styles } from '@mantine/core';

export function Home2() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Carousel
        pb={30}
        slideSize="50%"
        slideGap="md"
        loop
        slidesToScroll={1}
        withIndicators
        controlSize={45}
        controlsOffset="xl"
        styles={styles}
        breakpoints={[
          { maxWidth: 'xs', slideSize: '40%' },
          { maxWidth: 'md', slideSize: '100%', slideGap: 0 },
        ]}
      >
        <Carousel.Slide size={500}>
          <Image src="src\assets\gabecard.png" security="yomomma" />
        </Carousel.Slide>
        <Carousel.Slide size={500}>
          <Image src="src\assets\brandoncard.png" security="kenough" />
        </Carousel.Slide>
        <Carousel.Slide size={500}>
          <Image src="src\assets\zoecard.png" security="vice god" />
        </Carousel.Slide>
        <Carousel.Slide size={500}>
          <Image src="src\assets\deecard.png" security="secretary god" />
        </Carousel.Slide>
        <Carousel.Slide size={500}>
          <Image src="src\assets\abbycard.png" security="god" />
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

const styles: Styles<CarouselStylesNames, CarouselStylesParams> = {
  indicator: {
    width: rem(12),
    height: rem(4),
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: rem(40),
    },
  },
};

const useStyles = createStyles(() => ({
  container: {
    paddingBottom: 30,
  },
}));

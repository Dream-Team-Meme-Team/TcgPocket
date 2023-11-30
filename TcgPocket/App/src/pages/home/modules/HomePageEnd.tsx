import { Carousel } from '@mantine/carousel';
import { createStyles, Image } from '@mantine/core';

export function Home2() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Carousel withIndicators loop className={classes.carousel}>
        <Carousel.Slide>
          <Image src="src\assets\abbycard.png" width={250} security="god" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src="src\assets\brandoncard.png"
            width={250}
            security="kenough"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src="src\assets\deecard.png"
            width={250}
            security="secretary god"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="src\assets\zoecard.png" width={250} security="vice god" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="src\assets\gabecard.png" width={250} security="yomomma" />
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  carousel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '50%',
  },
}));

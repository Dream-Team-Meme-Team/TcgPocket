import { createStyles } from '@mantine/core';

type TabInfoHeaderProps = {
  titles: string[];
};

const autoValue: string = '1fr ';

export function TabInfoHeader({
  titles,
}: TabInfoHeaderProps): React.ReactElement {
  const numOfCol = autoValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  return (
    <div className={classes.infoHeader}>
      {titles.map((title, index) => (
        <h5 key={index}> {title} </h5>
      ))}
    </div>
  );
}

const useStyles = createStyles((_, numOfCol: string) => {
  return {
    infoHeader: {
      display: 'grid',
      gridTemplateColumns: numOfCol,
    },
  };
});

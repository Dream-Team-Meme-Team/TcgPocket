import { MantineTheme, createStyles } from '@mantine/styles';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { useState } from 'react';
import { PrimaryBadge } from '../../../components/badges/PrimaryBadge';
import { GridView } from './GridView';
import { ViewStyle } from '../../../enums/viewStyle';
import { ScrollArea } from '@mantine/core';

export function InventoryDisplay(): React.ReactElement {
  const { classes } = useStyles();

  const [view, setView] = useState<string>(ViewStyle.Grid);
  const [searchText, setSearchText] = useState<string>('');

  const viewStyle: string[] = [ViewStyle.Grid, ViewStyle.List];

  const handleViewChange = (
    e: string | React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (typeof e === 'string') {
      setView(e);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.topRow}>
          <PrimaryTextInput
            icon={<IconSearch />}
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <PrimarySelect
            value={view}
            data={viewStyle}
            onChange={handleViewChange}
          />
        </div>

        <div className={classes.bottomRow}>
          <PrimaryBadge leftSection={<IconFilter />}>View Filters</PrimaryBadge>
        </div>
      </div>

      <ScrollArea className={classes.body}>
        {view === 'Grid' ? <GridView /> : <div />}
      </ScrollArea>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryPurpleColor[0],
    },

    header: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      gap: defaultGap,
      padding: defaultPadding,

      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    title: {
      display: 'flex',

      fontSize: '25px',
      fontWeight: 'bolder',
    },

    topRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: defaultGap,
    },

    bottomRow: {
      display: 'flex',
    },

    body: {
      // this, this is bad
      height: '65vh',
    },
  };
});

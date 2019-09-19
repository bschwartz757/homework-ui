import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const PlayButton = ({ classes: { fab }, clickHandler, isPlaying }) => {
  return (
    <div>
      <Fab
        color="primary"
        aria-label="Add"
        onClick={clickHandler}
        className={fab}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrow />}
      </Fab>
    </div>
  );
};

export default withStyles(styles)(PlayButton);

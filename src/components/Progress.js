import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1
  }
};

const ProgressBar = ({ classes: { root }, progress }) => {
  return (
    <div className={root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default withStyles(styles)(ProgressBar);

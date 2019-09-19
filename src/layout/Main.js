import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Main.css';

import Chart from '../components/Chart';
import ProgressBar from '../components/Progress';
import PlayButton from '../components/Button';

const styles = theme => {
  return {
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.primary
    },
    container: {
      padding: theme.spacing.unit * 4
    }
  };
};

const MainContent = ({
  classes: { container, paper },
  chartData,
  toggleIsPlaying,
  isPlaying,
  progress,
  currentYear,
  stateList,
  updateIsland
}) => {
  return (
    <Grid
      container
      component="main"
      justify="center"
      alignContent="center"
      spacing={24}
      className={container}
    >
      <Grid item xs={10}>
        <Paper className={paper}>
          <Grid container justify="center" alignContent="center">
            <Grid item xs={10}>
              <h1>Hawaiian pig population, {currentYear}</h1>
            </Grid>
            <Grid item xs={10}>
              <Chart chartData={chartData} />
            </Grid>
            <Grid item xs={10}>
              <h3>Play slideshow</h3>
            </Grid>
            <Grid item xs={10}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={2} className="flex-item">
                  <PlayButton
                    isPlaying={isPlaying}
                    clickHandler={toggleIsPlaying}
                  />
                </Grid>
                <Grid item xs={10}>
                  <ProgressBar progress={progress} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MainContent);

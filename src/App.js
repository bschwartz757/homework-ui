import React, { Component } from 'react';
import queryString from 'query-string';

import pigData from './wild-pig-data.json';
import {
  sortByYear,
  getListOfYearsAscending,
  getListOfStates,
  getNextYear,
  getDataByYear,
  getDataByIsland,
  getProgress
} from './helpers';

import MainContent from './layout/Main';

const setStorage = s =>
  localStorage.setItem('playbackStatus', JSON.stringify({ currentYear: s }));
const getStorage = k => JSON.parse(localStorage.getItem(k));

// Ensure the data is sorted
const sortedData = sortByYear([...pigData['PIG POPULATIONS']]);
const yearsList = getListOfYearsAscending(sortedData);

const stateList = getListOfStates(sortedData);

// App has two potential states:
// 1) isPlaying -> slideshow advancing, pause button shown, progress bar progressing
// 2) !isPlaying -> slideshow/progress bar paused, play button shown
// Start in paused state
// On button click, start slideshow -> button transition -> progress bar
class App extends Component {
  constructor(props) {
    super(props);

    // Default to first entry in sorted list of years (earliest year)
    let [initialYear] = yearsList;

    // Persist playback status using local storage
    const status = getStorage('playbackStatus');

    // Also allow the user to pass year as qs param (per README) - however, since app loads in 'paused' state, there is no need to pass that as a param.
    const { year } = queryString.parse(window.location.search);

    if (year) {
      initialYear = Number(year);
      setStorage(initialYear);
    }

    if (status && status.currentYear) {
      initialYear = status.currentYear;
    }

    this.state = {
      isPlaying: false,
      currentYear: initialYear,
      progress: 0,
      chartData: getDataByIsland(sortedData, 'Oahu'),
      // chartData: getDataByYear(sortedData, initialYear),
      stateList,
      currentState: 'Oahu'
    };
  }

  componentDidMount() {
    const { currentYear } = this.state;
    const progress = getProgress(yearsList, currentYear);
    this.updateProgress(progress);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentYear } = this.state;
    if (currentYear !== prevState.currentYear) {
      const progress = getProgress(yearsList, currentYear);
      this.updateProgress(progress);
    }
  }

  componentWillUnmount() {
    // Make sure we don't leave a stray timer running
    clearInterval(this.timerId);
  }

  updateProgress = newProgress => {
    this.setState({ progress: newProgress });
  };

  updateChartData = () => {
    this.timerId = setInterval(() => {
      return this.setState(({ currentYear }) => {
        const nextYear = getNextYear(yearsList, currentYear);
        return {
          currentYear: getNextYear(yearsList, currentYear),
          chartData: getDataByYear(sortedData, nextYear)
        };
      });
    }, 2000);
  };

  updateIsland = event => {
    console.log('value: ', event.target);
  };

  toggleIsPlaying = async () => {
    // because `setState` is async, we need to wait for it to complete before reading from state again
    await this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }));

    const { isPlaying, currentYear } = this.state;

    if (isPlaying) {
      this.updateChartData();
    } else {
      clearInterval(this.timerId);
    }

    this.updatePlaybackStatus(currentYear);
  };

  updatePlaybackStatus = status => setStorage(status);

  render() {
    const { toggleIsPlaying, state, updateIsland } = this;
    const { progress } = state;

    const propsFromApp = Object.assign(
      {},
      { ...state, toggleIsPlaying, progress, updateIsland }
    );

    return <MainContent {...propsFromApp} />;
  }
}

export default App;

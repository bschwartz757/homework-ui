/* eslint-disable class-methods-use-this */
// Uses https://react-move.js.org/#/
// Adapted from https://frontendcharts.com/react-move-barchart/
import React, { Component } from 'react';
import NodeGroup from 'react-move/NodeGroup';
import { sortByValue, populationToValue } from '../helpers';
import './Chart.css';

const barWidth = 75;
const barPadding = 20;
const barColour = '#2F3061';
const heightScale = d => d * 0.03125;
const roundedHeight = h => Math.round(h);

function BarGroup(props) {
  const height = roundedHeight(heightScale(props.state.value));
  const xMid = barWidth * 0.5;
  const barPos = props.svgHeight - height;

  return (
    <g className="bar-group" transform={`translate(${props.state.x}, 0)`}>
      <rect
        y={barPos + 20}
        width={barWidth - barPadding}
        height={height}
        style={{ fill: barColour, opacity: props.state.opacity }}
      />
      <text
        className="value-label"
        x={xMid}
        y={barPos + 10}
        alignmentBaseline="center"
      >
        {props.state.value.toFixed(0)}
      </text>
      <text
        className="name-label"
        x={xMid}
        y={props.svgHeight + 50}
        alignmentBaseline="center"
        style={{ opacity: props.state.opacity }}
      >
        {props.data.island}
      </text>
    </g>
  );
}

class BarChart extends Component {
  state = {
    data: populationToValue(this.props.chartData)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.handleUpdate(this.props.chartData);
    }
  }

  handleUpdate = newData => {
    this.setState({
      data: populationToValue(newData)
    });
  };

  startTransition(d, i) {
    return { value: 0, x: i * barWidth, opacity: 0 };
  }

  enterTransition(d) {
    return { value: [d.value], opacity: [1], timing: { duration: 250 } };
  }

  updateTransition(d, i) {
    return { value: [d.value], x: [i * barWidth], timing: { duration: 300 } };
  }

  // eslint-disable-next-line no-unused-vars
  leaveTransition(d) {
    return { x: [-barWidth], opacity: [0], timing: { duration: 250 } };
  }

  render() {
    const [sortedValue] = sortByValue(this.state.data);
    const svgHeight = roundedHeight(heightScale(sortedValue.value)) + 100;

    return (
      <div>
        <svg width="600" height="600" viewBox={`0 0 600 ${svgHeight}`}>
          <g className="chart" transform="translate(0,-50)">
            <NodeGroup
              data={this.state.data}
              keyAccessor={d => d.value}
              start={this.startTransition}
              enter={this.enterTransition}
              update={this.updateTransition}
              leave={this.leaveTransition}
            >
              {nodes => (
                <g>
                  {nodes.map(({ key, data, state }) => (
                    <BarGroup
                      key={key}
                      data={data}
                      state={state}
                      svgHeight={svgHeight}
                    />
                  ))}
                </g>
              )}
            </NodeGroup>
          </g>
        </svg>
      </div>
    );
  }
}

export default BarChart;

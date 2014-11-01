/* jshint ignore:start */

var React = require('react/addons');
var Chart = require('chart.js/Chart');

var CANVAS_HEIGHT = 500;

// TODO: bug in Chart.js
// Chart.defaults.global.responsive = true;

var LogChart = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {

    var chartData = {
      labels: [],
      datasets: [
        {
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: []
        }
      ]
    };

    return {
      ctx: null,
      chart: null,
      chartData: chartData
    };
  },

  componentDidMount: function () {
    var parent = this.getDOMNode().parentNode;

    this.state.ctx = this.getDOMNode().getContext('2d');
    this.state.ctx.canvas.width = parent.offsetWidth;
    this.state.ctx.canvas.height = CANVAS_HEIGHT;

    this.state.chart = new Chart(this.state.ctx).Line(this.state.chartData);
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var logs = this.props.logs;
    var valueField = this.props.valueField;
    var chartData = this.state.chartData;

    var skip = Math.floor(logs.length / 18) + 1;
    var min = {};
    var max = {};

    var dataSet = chartData.datasets[0];

    var parent;

    // Clear previous data
    chartData.labels = [];
    dataSet.data = [];

    logs.forEach(function (log, key) {
      var dateLabel;

      log.date = new Date(log.date);

      if (key % skip === 0) {
        dateLabel = log.date.getHours() + ':' + (log.date.getMinutes() < 10 ? '0' + log.date.getMinutes() : log.date.getMinutes());

        // max-min temp
        if (!min[valueField] || min[valueField] > log[valueField]) {
          min[valueField] = log[valueField];
        }

        if (!max[valueField] || max[valueField] < log[valueField]) {
          max[valueField] = log[valueField];
        }

        chartData.labels.push(dateLabel);
        dataSet.data.push(Math.round(log[valueField] * 100) / 100);
      }
    });

    // Re-initialise
    if (this.state.chart) {
      this.state.chart.destroy();

      parent = this.getDOMNode().parentNode;
      this.state.ctx.canvas.width = parent.offsetWidth;
      this.state.ctx.canvas.height = CANVAS_HEIGHT;

      this.state.chart = new Chart(this.state.ctx).Line(this.state.chartData);
    }

    return (
      <canvas/>
    );
  }
});

module.exports = LogChart;

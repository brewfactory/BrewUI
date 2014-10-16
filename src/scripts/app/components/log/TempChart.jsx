/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var Chart = require('chart.js/Chart');

// TODO: bug in Chart.js
// Chart.defaults.global.responsive = true;

var TempChart = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    return {
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      }
    };
  },


  componentDidMount: function() {
    var parent = this.getDOMNode().parentNode;

    this.state.ctx = this.getDOMNode().getContext('2d');
    this.state.ctx.canvas.width  = parent.offsetWidth;

    this.state.chart = new Chart(this.state.ctx).Line(this.state.data);

    // TODO: not necessary until it's not responsive
    //window.addEventListener('resize', this.handleResize);
  },


  componentWillUnmount: function() {
    //window.removeEventListener('resize', this.handleResize);
  },


  handleResize: function(e) {
    //var parent = this.getDOMNode().parentNode;
    //this.state.ctx.canvas.width  = parent.offsetWidth;
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    return (
      <canvas height="500px" />
    );
  }
});

module.exports = TempChart;

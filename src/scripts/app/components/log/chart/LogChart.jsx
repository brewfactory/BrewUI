/* jshint ignore:start */

var React = require('react/addons');

var LineChart = require('./LineChart.jsx');

var DEFAULT_WIDTH = 600;
var DEFAULT_HEIGHT = 300;

var LogChart = React.createClass({

  propTypes: {
    logs   : React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    dataKey   : React.PropTypes.string.isRequired,
  },


  /*
  * Get initial state
  *
  * @method getInitialState
  * @return {Object} state
  */
  getInitialState: function () {
    return {
      width: DEFAULT_WIDTH
    };
  },


  /*
  * Get default properties
  *
  * @method getDefaultProps
  * @return {Object}
  */
  getDefaultProps: function() {
    return {
      logs   : [],
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    };
  },


  componentDidMount: function () {
    var parent = this.getDOMNode().parentNode;

    window.addEventListener('resize', this.handleResize);

    this.setState({
      width: parent.offsetWidth
    });
  },

  handleResize: function() {
    var parent = this.getDOMNode().parentNode;

    this.setState({
      width: parent.offsetWidth
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var logs = this.props.logs;
    var width = this.state.width;
    var height = this.props.height;
    var dataKey = this.props.dataKey;
    var data = [];

    var data = [logs.map(function (log) {
      return {
        value: Math.round(log[dataKey] * 100) / 100,
        date: new Date(log.date)
      };
    })];

    return (
      <LineChart data={data} width={width} height={height} fill={[this.props.fill]} stroke={[this.props.stroke]} />
    );
  }
});

module.exports = LogChart;

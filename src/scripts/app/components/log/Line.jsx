var React = require('react/addons');
var StockPaths = require('paths-js/stock');

var _ = require('lodash-node');
var moment = require('moment');

var Line = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },


  /*
  * Get initial state
  *
  * @method getInitialState
  * @return {Object} state
  */
  getInitialState: function () {
    var padding = {
      top: 20,
      left: 40,
      right: 20
    };

    var chartState = this.calculateChart({
      data: this.props.data,
      width: this.props.width - padding.left - padding.right,
      height: this.props.height
    });

    return {
      labels: {
        x: chartState.labels.x,
        y: chartState.labels.y
      },
      paths: chartState.paths,
      padding: padding
    };
  },


  /*
   * Get default properties
   *
   * @method getDefaultProps
   * @return {Object}
   */
  getDefaultProps: function () {
    return {
      fill: ['#0D95BC'],
      stroke: ['#002d3a']
    };
  },


  /*
   * Component will receive props
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps
   */
  componentWillReceiveProps: function(nextProps) {
    var chartState;

    // Update labels
    if(this.props.data !== nextProps.data) {
      chartState = this.calculateChart({
        data: nextProps.data,
        width: nextProps.width - this.state.padding.left - this.state.padding.right,
        height: nextProps.height
      });

      this.setState(chartState);
    }
  },


  /*
  * Get and generate Y labels
  *
  * @method getYLabels
  * @return {Array}
  */
  getYLabels: function (options) {
    options = options || {};

    var values = _.chain(options.data)
    .flatten()
    .pluck('value')
    .uniq()
    .value();

    var min = Math.floor(_.min(values));
    var max = Math.ceil(_.max(values));
    var step = Math.round((max - min) / 10);

    max += step;

    return _.range(min, max, step)
    .map(function(value) {
      var x = 0;
      var y = options.paths.yscale(value);

      return {
        x: x,
        y: y,
        value: Math.round(value)
      };
    });
  },


  /*
  * Get and generate X labels
  *
  * @method getXLabels
  * @return {Array}
  */
  getXLabels: function (options) {
    options = options || {};

    var values = _.chain(options.data)
    .flatten()
    .pluck('date')
    .map(function (date) { return date.getTime() })
    .uniq()
    .value();

    var min = Math.floor(_.min(values));
    var max = Math.ceil(_.max(values));
    var step = Math.round((max - min) / 10);

    max += step;

    return _.range(min, max, step)
    .map(function(value) {
      var x = options.paths.xscale(value);
      var y = 0;

      return {
        x: x,
        y: y,
        value: moment(value).format('hh:mm')
      };
    });
  },


  /*
  * Calculate chart
  *
  * @method calculateChart
  * @return {Object} state
  */
  calculateChart: function (options) {
    options = options || {};

    if(!options.data.length || !options.data[0].length) {
      return {
        labels: {
          x: [],
          y: []
        },
        paths: null
      };
    }

    var paths = StockPaths({
      data: options.data,
      width: options.width,
      height: options.height,
      xaccessor: function(data) {
        return data.date.getTime();
      },
      yaccessor: function(data) {
        return data.value;
      }
    });

    var yLabels = this.getYLabels({
      data: options.data,
      paths: paths
    });

    var xLabels = this.getXLabels({
      data: options.data,
      paths: paths
    });

    return {
      labels: {
        x: xLabels,
        y: yLabels
      },
      paths: paths
    };
  },


  /*
   * Get area
   *
   * @method getArea
   * @param {Object} curve
   * @param {Number} i
   * @return {JSX}
   */
  getArea: function (curve, i) {
    var path = curve.area.path.print();

    return (
      <path key={i} d={path} stroke="none" fill={this.props.fill[i]} />
    );
  },


  /*
   * Get line
   *
   * @method getLine
   * @param {Object} curve
   * @param {Number} i
   * @return {JSX}
   */
  getLine: function (curve, i) {
    var path = curve.line.path.print();

    return (
      <path key={i} d={path} stroke={this.props.stroke[i]} fill="none" />
    );
  },


  /*
   * Render
   *
   * @method render
   * @return {JSX}
   */
  render: function () {
    var isChart = this.state.paths && this.state.paths.curves;
    var _this = this;

    var lineStyle = {
      stroke: '#000',
      strokeWidth: 0.2
    };

    var labels = _this.state.labels.y

    var yLabelStyle = {
      fontSize: '12px'
    };

    if(!isChart) {
      return (<svg/>);
    }

    return (
      <svg height={_this.props.height + (_this.state.padding.top * 2)} width={_this.props.width} version="1.1">
        <g transform={'translate(0, ' + _this.state.padding.top + ')'}>
          <g transform={'translate(' + _this.state.padding.left + ', 0)'}>
            <g>{this.state.paths.curves.map(_this.getArea)}</g>
            <g>{this.state.paths.curves.map(_this.getLine)}</g>
          </g>

          {_this.state.labels.y.map(function(label, key) {
            return <g key={key}>
              <line x1="26" y1={label.y} x2={_this.props.width} y2={label.y} style={lineStyle} />
              <text x={label.x + 4} y={label.y + 4} style={yLabelStyle}>{label.value}</text>
            </g>;
          })}

          <g transform={'translate(' + _this.state.padding.left + ', 0)'}>
            {_this.state.labels.x.map(function(label, key) {
              return <g key={key}>
                <line x1={label.x} y1="0" x2={label.x} y2={_this.props.height} style={lineStyle} />
                <text x={label.x - 16} y={_this.props.height + _this.state.padding.top} style={yLabelStyle}>{label.value}</text>
              </g>;
            })}
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = Line;

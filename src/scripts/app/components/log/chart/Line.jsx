var React = require('react/addons');
var StockPaths = require('paths-js/stock');

var LineLabelX = require('./LineLabelX.jsx');
var LineLabelY = require('./LineLabelY.jsx');

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
      bottom: 20,
      left: 40,
      right: 20
    };

    var chartState = this.calculateChart({
      data: this.props.data,
      width: this.props.width - (padding.left + padding.right),
      height: this.props.height
    });

    return {
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

      this.setState({
        paths: chartState.paths
      });
    }
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

    return {
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
    var _this = this;
    var isChart = _this.state.paths && _this.state.paths.curves;

    if(!isChart) {
      return (<svg/>);
    }

    return (
      <svg height={_this.props.height + (_this.state.padding.top + _this.state.padding.bottom)}
            width={_this.props.width} version="1.1">
        <g transform={'translate(0, ' + _this.state.padding.top + ')'}>
          <g transform={'translate(' + _this.state.padding.left + ', 0)'}>
            <g>{this.state.paths.curves.map(_this.getArea)}</g>
            <g>{this.state.paths.curves.map(_this.getLine)}</g>
          </g>

          <LineLabelY data={_this.props.data} paths={_this.state.paths} width={_this.props.width} />

          <g transform={'translate(' + _this.state.padding.left + ', 0)'}>
            <LineLabelX data={_this.props.data} paths={_this.state.paths}
                        width={_this.props.width} height={_this.props.height} />
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = Line;

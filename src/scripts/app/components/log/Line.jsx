var React = require('react/addons');
var StockPaths = require('paths-js/stock');

var _ = require('lodash-node');

var Line = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
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
      stroke: ['#f0f0f0']
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

    // No data
    if(!this.props.data.length || !this.props.data[0].length) {
      return (
        <g fill="none" stroke="none" />
      );
    }

    var data = this.props.data;
    var paths = StockPaths({
      data: data,
      width: this.props.width,
      height: this.props.height,
      xaccessor: function(d) {
        return d.date.getTime();
      },
      yaccessor: function(d) {
        return d.value;
      }
    });

    // var yLabels = function () {
    //   var values = _.chain(data)
    //     .flatten()
    //     .pluck('value')
    //     .uniq()
    //     .value();
    //
    //   var min = Math.floor(_.min(values));
    //   var max = Math.ceil(_.max(values));
    //   var step = (max - min) / 10;
    //
    //   return _.range(min, max, step)
    //     .map(function(value) {
    //       var x = 4;
    //       var y = paths.yscale(value) - step;
    //
    //       return {
    //         x: x,
    //         y: y,
    //         value: Math.round(value)
    //       };
    //     });
    // };
    // {yLabels().map(function(label, key) {
    //   return <text key={key} x={label.x} y={label.y}>{label.value}</text>;
    // })}

    return (
      <svg height={this.props.height} width={this.props.width} version="1.1">
        <g fill="none" stroke="none">
          <g>
            { paths.curves.map(this.getArea) }
          </g>
          <g>
            { paths.curves.map(this.getLine) }
          </g>
        </g>
      </svg>
    );
  }
});

module.exports = Line;

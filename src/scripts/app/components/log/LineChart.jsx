var React = require('react/addons');
var Line = require('./Line.jsx');

var LineChart = React.createClass({

  /*
   * Get default properties
   *
   * @method getDefaultProps
   * @return {Object}
   */
  getDefaultProps: function() {
    return {
      data   : [],
      height : 150,
      width  : 800
    };
  },


  /*
   * Render
   *
   * @method render
   * @return {JSX}
   */
  render: function() {
    var data = this.props.data;
    var width = this.props.width;
    var height = this.props.height;
    var fill = this.props.fill;
    var stroke = this.props.stroke;

    return (
      <Line data={data} width={width} height={height} fill={fill} stroke={stroke} />
    );
  }
});

module.exports = LineChart;

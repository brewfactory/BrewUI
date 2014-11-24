var React = require('react/addons');

var _ = require('lodash-node');
var moment = require('moment');

var LineLabelY = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    paths: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired
  },


  /*
  * Get initial state
  *
  * @method getInitialState
  * @return {Object} state
  */
  getInitialState: function () {
    var labels = this.getLabels();

    return {
      labels: labels
    };
  },


  /*
  * Component will receive props
  *
  * @method componentWillReceiveProps
  * @param {Object} nextProps
  */
  componentWillReceiveProps: function(nextProps) {

    // Update labels
    if(this.props.data !== nextProps.data ||
      this.props.paths !== nextProps.paths) {

        this.setState({
          labels: this.getLabels()
        });
      }
    },


    /*
    * Get and generate labels
    *
    * @method getLabels
    * @return {Array}
    */
    getLabels: function () {
      var _this = this;

      var values = _.chain(_this.props.data)
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
        var y = _this.props.paths.yscale(value);

        return {
          x: x,
          y: y,
          value: Math.round(value)
        };
      });
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

      var lineStyle = {
        stroke: '#000',
        strokeWidth: "0.2px"
      };

      var labelStyle = {
        fontSize: '12px'
      };

      return (
        <g>
        {_this.state.labels.map(function(label, key) {
          return <g key={key}>
            <line x1="26" y1={label.y} x2={_this.props.width} y2={label.y} style={lineStyle} />
            <text x={label.x + 4} y={label.y + 4} style={labelStyle}>{label.value}</text>
          </g>;
        })}
        </g>
      );
    }
  });

  module.exports = LineLabelY;

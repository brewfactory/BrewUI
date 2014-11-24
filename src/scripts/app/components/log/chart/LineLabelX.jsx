var React = require('react/addons');

var _ = require('lodash-node');
var moment = require('moment');

var LineLabelX = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    paths: React.PropTypes.object.isRequired,
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
    var labels = this.getLabels({
      data: this.props.data,
      paths: this.props.paths,
      width: this.props.width
    });

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
    var labels;

    // Update labels
    if(this.props.data !== nextProps.data ||
      this.props.paths !== nextProps.paths ||
      this.props.width !== nextProps.width) {

      labels = this.getLabels({
        data: nextProps.data,
        paths: nextProps.paths,
        width: nextProps.width
      });

      this.setState({
        labels: labels
      });
    }
  },


  /*
  * Get and generate labels
  *
  * @method getLabels
  * @param {Object} options
  * @return {Array}
  */
  getLabels: function (options) {
    options = options || {};

    var values = _.chain(options.data)
    .flatten()
    .pluck('date')
    .map(function (date) { return date.getTime() })
    .uniq()
    .value();

    var min = _.min(values);
    var max = _.max(values);
    var stepCount = Math.round(options.width / 60);
    var step = (max - min) / stepCount;

    max += step;

    return _.range(min, max, step)
    .map(function(value) {
      var x = options.paths.xscale(value);
      var y = 0;

      return {
        x: x,
        y: y,
        value: moment(value).format('HH:mm')
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
          <line x1={label.x} y1="0" x2={label.x} y2={_this.props.height} style={lineStyle} />
          <text x={label.x - 16} y={_this.props.height + 20} style={labelStyle}>{label.value}</text>
          </g>;
        })}
      </g>
    );
  }
});

module.exports = LineLabelX;

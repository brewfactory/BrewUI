/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:BrewPhase');

var BrewPhase = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    this.store = this.props.context.getStore('BrewStore');
    return this.store.getState();
  },


  /*
   * Component did mount
   *
   * @method componentDidMount
   */
  componentDidMount: function () {
    this.store.on('change', this._onChange);
  },


  /*
   * Component will unmount
   *
   * @method componentWillUnmount
   */
  componentWillUnmount: function () {
    this.store.removeListener('change', this._onChange);
  },


  /**
   * Event handler for 'change' events coming from the Store
   *
   * @method _onChange;
   */
  _onChange: function() {
    var state = this.store.getState();
    this.setState(state);
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var cx = React.addons.classSet;
    var brew = this.store.brew;

    var dividerStyle = {
      width: '1%'
    };

    var brewDuration = brew.phases.reduce(function (sum, phase) {
      sum += +phase.min;
      return sum;
    }, 0);

    var unit = (100 - brew.phases.length * (1 + 10)) / brewDuration;


    return (
    <div className="progress" ng-show="actualBrew.phases">
        {brew.phases.map(function (phase) {
          var phaseWidth = unit * phase.min + 10;

          var phaseStyle = {
            width: phaseWidth+ '%'
          };

          var dividerClasses = cx({
            'progress-bar': true,
            'active progress-striped progress-bar-danger': phase.inProgress && !phase.tempReached,
            'progress-bar-inactive2': !phase.inProgress
          });

          var phaseClasses = cx({
            'progress-bar': true,
            'progress-bar-success': phase.tempReached && !phase.inProgress,
            'progress-bar-warning': phase.inProgress && !phase.tempReached,
            'progress-striped active': phase.inProgress && phase.tempReached,
            'progress-bar-inactive': !phase.inProgress && !phase.tempReached
          });

          return <div>
        <div className={dividerClasses} style={dividerStyle}>
          <span className="sr-only">wait</span>
        </div>

        <div className={phaseClasses} style={phaseStyle}>
          <span>{phase.min} min, {phase.temp}&deg; {phase.jobEnd}</span>
        </div>
      </div>
        })}
    </div>
    );
  }
});

module.exports = BrewPhase;

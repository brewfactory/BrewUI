/* jshint ignore:start */

var React = require('react/addons');
var moment = require('moment');

var BrewPhase = React.createClass({

  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var cx = React.addons.classSet;
    var brew = this.props.brew;

    var dividerStyle = {
      width: '1%'
    };

    var brewDuration = brew.phases.reduce(function (sum, phase) {
      sum += +phase.min;
      return sum;
    }, 0);

    var unit = (100 - brew.phases.length * (1 + 10)) / brewDuration;

    // No brew
    if(!brew.phases.length) {
      return (<span/>);
    }

    return (
    <div className="progress">
        {brew.phases.map(function (phase, key) {
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

          var jobEndFormatted = phase.jobEnd ? moment(phase.jobEnd).format('HH:mm') : '';

          return <span key={key}>
                  <div className={dividerClasses} style={dividerStyle}>
                    <span className="sr-only">wait</span>
                  </div>

                  <div className={phaseClasses} style={phaseStyle}>
                    <span>{phase.min} min, {phase.temp}&deg; {jobEndFormatted}</span>
                  </div>
                </span>
        })}
    </div>
    );
  }
});

module.exports = BrewPhase;

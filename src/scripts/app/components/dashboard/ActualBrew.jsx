/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:ActualBrew');
var moment = require('moment');

var ActualBrew = React.createClass({

  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var cx = React.addons.classSet;

    var brew = this.props.brew;
    var startTimeFormatted = brew.startTime ? moment(brew.startTime).format('YYYY-MM-dd HH:mm') : '';

    return (
      <section className="panel panel-default panel-actual-brew">
        <div className="panel-heading"><h4>{brew.name}</h4></div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Min</th>
              <th>Temp</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
          {brew.phases.map(function (phase, key) {
            var phaseClasses = cx({
              'success': phase.tempReached && !phase.inProgress,
              'warning': phase.inProgress && !phase.tempReached,
              'info': phase.inProgress && phase.tempReached
            });

            var jobEndFormatted = phase.jobEnd ? moment(phase.jobEnd).format('HH:mm') : '-';

            return <tr className={phaseClasses} key={key}>
              <td>{phase.min} min</td>
              <td>{phase.temp}&deg;</td>
              <td>{jobEndFormatted}</td>
            </tr>
          })}
          </tbody>
        </table>
        <div className="panel-footer">
          <strong>Start time:</strong>
          <br/>
              {startTimeFormatted}
        </div>
      </section>
    );
  }
});

module.exports = ActualBrew;

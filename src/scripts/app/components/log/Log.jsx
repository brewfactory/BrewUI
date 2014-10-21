/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var moment = require('moment');
var debug = require('debug')('BrewUI:Dashboard');

var TempChart = require('./TempChart.jsx');

var findOneBrewLogAction = require('../../actions/logs/findOneBrew');

var Log = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    this.store = this.props.context.getStore('LogStore');

    var brewLogs = this.store.brewLogs;
    var selectedBrew = this.store.selectedBrewLog || {};
    var selectedBrewId = selectedBrew._id;

    return {
      selectedBrewId: selectedBrewId
    };
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
  _onChange: function () {
    this.forceUpdate();
  },


  /*
   * On selected log change
   *
   * @method onLogChange
   */
  onLogChange: function () {
    var brewId = event.target.value;

    this.setState({
      selectedBrewId: brewId
    });

    this.props.context.executeAction(findOneBrewLogAction, { id: brewId });
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var brewLogs = this.store.brewLogs;
    var selectedBrewLog = this.store.selectedBrewLog;

    return (
      <div className="row">
        <h1>Log</h1>

        <div className="form-group">
          <label htmlFor="log" className="control-label">Subject</label>
          <select value={this.state.selectedBrewId} onChange={this.onLogChange} id="log" className="form-control">
              {brewLogs.map(function (log) {
                var startTimeFormatted = log.startTime ? moment(log.startTime).format('YYYY.MM.DD HH:mm') : '';

                return <option key={log._id} value={log._id}>[{startTimeFormatted}] {log.name}</option>
              })}
          </select>
        </div>

        <div className="row">
          <div className="col-md-12">
            {selectedBrewLog ? <TempChart brew={selectedBrewLog} /> : <span/> }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Log;

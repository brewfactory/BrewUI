/* jshint ignore:start */

var React = require('react/addons');
var moment = require('moment');

var findOneBrewLogAction = require('../../actions/logs/findOneBrew');

var LogChart = require('./chart/LogChart.jsx');

var Log = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    var selectedBrewId;

    this.store = this.props.context.getStore('LogStore');

    if(this.store.brewLogs.length) {
      selectedBrewId = this.store.brewLogs[0]._id;
    }
    return {
      selectedBrewId: selectedBrewId,
      selectedBrewLog: this.store.selectedBrewLog,
      brewLogs: this.store.brewLogs
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
    var state = {
      selectedBrewLog: this.store.selectedBrewLog,
      brewLogs: this.store.brewLogs
    };

    if(this.store.brewLogs.length && !this.state.selectedBrewLog) {
      state.selectedBrewId = this.store.brewLogs[0]._id;
    }

    this.setState(state);
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

    this.props.context.executeAction(findOneBrewLogAction, {id: brewId});
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var brewLogs = this.state.brewLogs;
    var selectedBrewLog = this.state.selectedBrewLog || {};
    selectedBrewLog.logs = selectedBrewLog.logs || [];

    var brewSelector =
      <div className="form-group">
        <label htmlFor="log" className="control-label">Subject</label>
        <select value={this.state.selectedBrewId} onChange={this.onLogChange} id="log" className="form-control">
          {brewLogs.map(function (log) {
            var startTimeFormatted = log.startTime ? moment(log.startTime).format('YYYY.MM.DD HH:mm') : '';

            return <option key={log._id} value={log._id}>[{startTimeFormatted}] {log.name}</option>
          })}
        </select>
      </div>;


    var tempChart =
      <div className="row">
        <div className="col-md-12">
          <h4>Temperature</h4>
          <div>
            <LogChart logs={selectedBrewLog.logs} fill="#556270" dataKey="temp" />
          </div>
        </div>
      </div>;

    var pwmChart =
      <div className="row">
        <div className="col-md-12">
          <h4>PWM</h4>
          <div>
            <LogChart logs={selectedBrewLog.logs} fill="#C44D58" stroke="#7b000b" dataKey="pwm" />
          </div>
        </div>
      </div>;

    return (
      <div className="row">
        <h1>Log</h1>

        {brewLogs.length ? <div>{brewSelector} {tempChart}
          <br/> {pwmChart}</div>
          : <div className="alert alert-warning" role="alert">Brew first!</div>}

      </div>
    );
  }
});

module.exports = Log;

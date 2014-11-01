/* jshint ignore:start */

var React = require('react/addons');
var moment = require('moment');

var createBrewAction = require('../../actions/brew/createBrew');
var navigateAction = require('flux-router-component').navigateAction;

var routes = require('../../config/routes');

var Designer = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    this.store = this.props.context.getStore('BrewStore');

    return {
      name: null,
      startTime: new Date(),
      phases: []
    };
  },


  /*
   * On clone actual btn click
   *
   * @method onCloneActualBtnClick
   */
  onCloneActualBtnClick: function () {
    var state = this.store.getState();

    this.setState({
      name: state.brew.name,
      startTime: state.brew.startTime ? new Date(state.brew.startTime) : new Date(),
      phases: state.brew.phases.map(function (phase) {
        return {
          min: phase.min,
          temp: phase.temp
        }
      })
    });
  },


  /*
   * On reset btn click
   *
   * @method onResetBtnClick
   */
  onResetBtnClick: function () {
    this.setState(this.getInitialState());
  },


  /*
   * On phase add btn click
   *
   * @method onPhaseAddBtnClick
   */
  onPhaseAddBtnClick: function (isDown) {
    var state = this.state;
    var phase = {
      min: null,
      temp: null
    };

    if (isDown) {
      state.phases.push(phase);
    } else {
      state.phases.unshift(phase);
    }

    this.setState(state);
  },


  /*
   * On phase remove btn click
   *
   * @method onPhaseRemoveBtnClick
   */
  onPhaseRemoveBtnClick: function (phase) {
    var state = this.state;
    var idx = state.phases.indexOf(phase);

    state.phases.splice(idx, 1);

    this.setState(state);
  },


  /*
   * On synchronise button clicked
   *
   * @method onSyncBtnClicked
   */
  onSyncBtnClicked: function () {
    this.props.context.executeAction(createBrewAction, {
      name: this.state.name,
      startTime: this.state.startTime,
      phases: this.state.phases
    });

    // Go to the dashboard
    this.props.context.executeAction(navigateAction, {
      path: routes.dashboard.path
    });
  },


  /*
   * On name input has changed
   *
   * @method onNameChanged
   * @param {Event} event
   */
  onNameChanged: function(event) {
    this.setState({
      name: event.target.value
    });
  },


  /*
   * On startTime input has changed
   *
   * @method onStartTimeChanged
   * @param {Event} event
   */
  onStartTimeChanged: function(event) {
    this.setState({
      startTime: moment(event.target.value).toDate()
    });
  },


  /*
   * On phase duration changed
   *
   * @method onPhaseDurationChanged
   * @param {Event} event
   * @param {Number} phaseKey
   */
  onPhaseDurationChanged: function (phaseKey, event) {
    var phases = this.state.phases;

    phases[phaseKey].min = Number(event.target.value);

    this.setState({
      phases: phases
    });
  },


  /*
   * On phase temp changed
   *
   * @method onPhaseDurationChanged
   * @param {Event} event
   * @param {Number} phaseKey
   */
  onPhaseTempChanged: function (phaseKey, event) {
    var phases = this.state.phases;

    phases[phaseKey].temp = Number(event.target.value);

    this.setState({
      phases: phases
    });
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var _this = this;
    var state = _this.state;
    var startTimeFormatted = moment(state.startTime).format('YYYY-MM-DDThh:mm');
    var phasesComponent;

    if (state.phases.length) {
      phasesComponent =
        <table className="table" ng-show="brew.phases.length">
          <thead>
            <tr>
              <th>Min</th>
              <th>Temp</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {state.phases.map(function (phase, key) {
            return <tr key={key}>
              <td>
                <div className="input-group">
                  <input onChange={_this.onPhaseDurationChanged.bind(_this, key)} value={phase.min}
                    className="form-control" type="number" min="0" placeholder="min" />
                  <span className="input-group-addon">min</span>
                </div>
              </td>
              <td>
                <div className="input-group">
                  <input onChange={_this.onPhaseTempChanged.bind(_this, key)} value={phase.temp}
                    className="form-control" type="number" min="0" placeholder="C&deg;" />
                  <span className="input-group-addon">C&deg;</span>
                </div>
              </td>
              <td>
                <button onClick={_this.onPhaseRemoveBtnClick.bind(_this, phase)}
                  className="btn btn-mini btn-danger" type="button" title="Remove">
                Remove
                </button>
              </td>
            </tr>
          })}
          </tbody>
        </table>;
    }

    return (
      <section className="row designer">
        <div className="col-md-12">
          <p>
            <button onClick={_this.onCloneActualBtnClick} type="button" className="btn btn-success">Clone actual</button>
          &nbsp;
            <button onClick={_this.onResetBtnClick} type="button" className="btn btn-default">Reset</button>
          </p>

          <form name="brewForm">
            <div className="form-group">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input onChange={_this.onNameChanged} value={state.name} id="name" type="text" placeholder="name" min="0"
                required className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="startTime" className="control-label">Start time</label>
              <input onChange={_this.onStartTimeChanged} value={startTimeFormatted} id="startTime" type="datetime-local"
                className="form-control" size="8" name="time" placeholder="start time" />
            </div>
          </form>

          <section className="panel panel-info phases">
            <div className="panel-heading">Phases</div>
            <div className="panel-body">
            {state.phases.length ? phasesComponent : <i>Add new phase first.</i> }
            </div>
            <div className="panel-footer">
              <button onClick={_this.onPhaseAddBtnClick.bind(_this,  true)}
                  type="button" className="btn btn-default">Add phase down</button>
            &nbsp;
              <button onClick={_this.onPhaseAddBtnClick.bind(_this, false)}
                type="button" className="btn btn-default">Add phase top</button>
            </div>
          </section>

          <p>
            <button onClick={_this.onSyncBtnClicked} type="button" className="btn btn-primary btn-lg">Synchronise</button>
          &nbsp;
          </p>
        </div>
      </section>
    );
  }
});

module.exports = Designer;

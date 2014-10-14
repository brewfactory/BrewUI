/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:Dashboard');
var navigateAction = require('flux-router-component').navigateAction;

var Dashboard = React.createClass({

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
    var actualBrew = this.state.actualBrew;

    return (
      <div className="row">
        <h1>Dashboard</h1>
        <h2>{actualBrew.name}</h2>
        <p className="bg-warning"> TODO </p>
      </div>
    );
  }
});

module.exports = Dashboard;

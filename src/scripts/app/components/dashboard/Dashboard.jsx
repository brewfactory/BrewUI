/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:Dashboard');
var navigateAction = require('flux-router-component').navigateAction;

var ActualBrew = require('./ActualBrew.jsx');
var Brewer = require('./Brewer.jsx');
var BrewPhase = require('./BrewPhase.jsx');

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
    var brew = this.state.brew;

    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <BrewPhase brew={brew} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <ActualBrew brew={brew} />
          </div>
          <div className="col-md-4">
            <Brewer context={this.props.context} />
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Dashboard;

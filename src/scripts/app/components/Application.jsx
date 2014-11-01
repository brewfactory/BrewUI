/* jshint ignore:start */

'use strict';

var React = require('react/addons');
var RouterMixin = require('flux-router-component').RouterMixin;

var Nav = require('./Nav.jsx');
var Foot = require('./Foot.jsx');
var Dashboard = require('./dashboard/Dashboard.jsx');
var Designer = require('./designer/Designer.jsx');
var Log = require('./log/Log.jsx');

var Application = React.createClass({
  mixins: [RouterMixin],


  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    this.store = this.props.context.getStore('ApplicationStore');
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


  /*
   * Reset navigation
   *
   * @method resetNavigation
   */
  resetNavigation: function () {

    // Scroll to top
    if(typeof global.scrollTo === 'function') {
      global.scrollTo(0, 0);
    }

    // Close mobile menu
    if(global.$) {
      $('header .navbar-collapse').removeClass('in');
    }
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var page;

    // Select page for routing
    switch (this.state.currentPageName) {
      case 'log':
        page = <Log context={this.props.context} />;
        break;
      case 'designer':
        page = <Designer context={this.props.context} />;
        break;
      default:
        page = <Dashboard context={this.props.context} />;
        break;
    }

    return (
      <div id="app-container">
        <div id="wrap">
          <header>
            <Nav selected={this.state.currentPageName}
                 links={this.state.pages}
                 context={this.props.context}/>
          </header>

          <main className="container">
            {page}
          </main>

        </div>

        <Foot/>
      </div>
    );
  },


  /**
   * Event handler for 'change' events coming from the Store
   *
   * @method _onChange;
   */
  _onChange: function() {
    var state = this.store.getState();

    this.resetNavigation();
    this.setState(state);
  }
});

module.exports = Application;

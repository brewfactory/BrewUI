/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:Dashboard');

var TempChart = require('./TempChart.jsx');

var Log = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    return {};
  },

  /*
   * Render
   *
   * @method render
   */
  render: function () {

    return (
      <div className="row">
        <h1>Log</h1>

        <div className="row">
          <div className="col-md-12">
            <TempChart />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Log;

/** @jsx React.DOM */

/* jshint ignore:start */

/*
 * Footer
 *
 *  @module Footer
 */

var React = require('react/addons');

var Foot = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object}
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
      <footer>
        <div className="container">
          <p className="text-center">We ♥ Beer | Brewfactory</p>
        </div>
      </footer>
    );
  }
});

module.exports = Foot;

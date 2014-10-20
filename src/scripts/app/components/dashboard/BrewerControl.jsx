/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:Brewer');

var BrewerControl = React.createClass({

  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var brew = this.props.brew;
    var status;

    if (brew.phases.length) {
      // actualBrew.paused
      status =
        <div className="well well-md">
        {brew.paused ? <button className="btn btn-primary">Resume</button> :
          <button className="btn btn-default">Pause</button>}
        &nbsp;
          <button className="btn btn-danger">Stop</button>
        </div>;
    } else {
      status =
        <div className="well well-md">
          <p>There is nothing to control</p>
        </div>;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          {status}
        </div>
      </div>
    );
  }
});

module.exports = BrewerControl;

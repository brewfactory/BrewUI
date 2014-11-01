/* jshint ignore:start */

var React = require('react/addons');

var pauseBrewAction = require('../../actions/brew/pauseBrew');
var stopBrewAction = require('../../actions/brew/stopBrew');

var BrewerControl = React.createClass({

  /*
   * On pause button click
   *
   * @method onPauseBtnClick
   */
  onPauseBtnClick: function () {
    this.props.context.executeAction(pauseBrewAction);
  },


  /*
   * On stop button click
   *
   * @method onStopBtnClick
   */
  onStopBtnClick: function () {
    this.props.context.executeAction(stopBrewAction);
  },


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
        {brew.paused ? <button onClick={this.onPauseBtnClick} className="btn btn-primary">Resume</button> :
          <button onClick={this.onPauseBtnClick} className="btn btn-default">Pause</button>}
        &nbsp;
          <button onClick={this.onStopBtnClick}  className="btn btn-danger">Stop</button>
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

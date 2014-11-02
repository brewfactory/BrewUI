/* jshint ignore:start */

var React = require('react/addons');

var Brewer = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object} state
   */
  getInitialState: function () {
    this.store = this.props.context.getStore('BrewerStore');
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
  _onChange: function () {
    var state = this.store.getState();
    this.setState(state);
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var pwmProgressStyle;
    var status;

    if (!isNaN(this.state.pwm) || !isNaN(this.state.temperature)) {
      pwmProgressStyle = {
        width: this.state.pwm + '%'
      };

      status =
        <div className="well well-md">
          <h1>{this.state.temperature}&#176;</h1>
          <h4>PWM: {this.state.pwm}%</h4>

          <div className="progress">
            <div className="progress-bar progress-bar-danger" style={pwmProgressStyle}>
              <span className="sr-only">{this.state.pwm}%</span>
            </div>
          </div>
        </div>;
    } else {
      status =
        <div className="well well-md">
          <p><strong>We are not brewing :(</strong></p>
          <p>How is it possible</p>
        </div>
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

module.exports = Brewer;

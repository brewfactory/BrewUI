/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var debug = require('debug')('BrewUI:Designer');

var Designer = React.createClass({

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
    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <p> TODO</p>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Designer;

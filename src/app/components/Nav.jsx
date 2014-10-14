/** @jsx React.DOM */

/* jshint ignore:start */

var React = require('react/addons');
var NavLink = require('flux-router-component').NavLink;

var Nav = React.createClass({

  /*
   * Get initial state
   *
   * @method getInitialState
   * @return {Object}
   */
  getInitialState: function () {
    return {
      selected: 'dashboard',
      links: {}
    };
  },


  /*
   * Render
   *
   * @method render
   */
  render: function () {
    var selected = this.props.selected || this.state.selected;
    var links = this.props.links || this.state.links;
    var context = this.props.context;

    var linkHTML = Object.keys(links).map(function (name) {
        var link = links[name];

        return (
          <li key={name}>
            <NavLink className={selected === name ? 'active' : '' } name={link.route} context={context}>{link.text}</NavLink>
          </li>
        );
      });
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#rising-navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand" title="Brewfactory" href="/">
              <span alt="Brewfactory logo">Brewfactory</span>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="rising-navbar">
            <ul className="nav navbar-nav navbar-left">
              {linkHTML}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;

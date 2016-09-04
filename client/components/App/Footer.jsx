import React, { Component } from 'react';

Footer = class Footer extends Component {
  render() {
    return (
      <div className="ui basic small container segment center aligned">
        <div className="ui three column grid">
          <div className="dark-blue column">
            Kyle W. Rader &copy; 2017
          </div>
          <div className="column">
            <a href="mailto:kyle@kylerader.ninja">kyle@kylerader.ninja</a>
          </div>
          <div className="column">
            <a href="/">kylerader.ninja</a>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

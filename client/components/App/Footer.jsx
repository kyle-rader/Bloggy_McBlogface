import React, { Component } from 'react';

Footer = class Footer extends Component {
  render() {
    return (
      <div className="ui basic small container segment">
        <div className="ui grid">
          <div className="fluid column">
            Kyle W. Rader &copy; 2017
            <div className="ui right floated icon buttons">
              <a className="ui icon button" href="mailto:kyle@kylerader.ninja"><i className="ui mail icon"></i></a>
              <a className="ui icon button" href="/"><i className="globe icon"></i></a>
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

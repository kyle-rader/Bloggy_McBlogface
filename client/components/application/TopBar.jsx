import React from 'react';

TopBar = React.createClass({
  toggleSidebar() {
      $('.app-root > .ui.sidebar').sidebar('toggle');
  },

  socialButton(socialApp) {
    if (Meteor.settings.public.social && Meteor.settings.public.social[socialApp]) {
      return (
        <a className="item" href={Meteor.settings.public.social[socialApp]} target="_blank">
          <i className={`large ${socialApp} ${socialApp}-color icon`}></i>
        </a>
      );
    } else {
      return null;
    }
  },

  render() {
    return (
      <div className="ui fixed icon menu">
        <a className="item" onClick={this.toggleSidebar}>
          <i className="large green content icon"></i>
        </a>
        {this.socialButton('linkedin')}
        {this.socialButton('github')}
        {this.socialButton('facebook')}
        {this.socialButton('twitter')}
      </div>
    );
  }
})
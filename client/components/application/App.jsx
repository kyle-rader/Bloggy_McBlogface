// Main App - React Root Component

import { Meteor } from 'meteor/meteor';
import React from 'react';

App = class App extends React.Component {

  componentDidMount() {
    document.title = Meteor.settings.public.siteName || 'Meteor Blog';
  }

  render() {
    return (
    <div className="app-root ui pushable">
      <Menu />
      <div className="pusher">
        <TopBar />
        {this.props.yield}
      </div>
    </div>
    );
  }

}

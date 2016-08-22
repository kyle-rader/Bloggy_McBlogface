// Main App - React Root Component

import { Meteor } from 'meteor/meteor';
import React from 'react';

App = class App extends React.Component {

  componentDidMount() {
    document.title = Meteor.settings.public.siteName || 'Meteor Blog';
  }

  getView() {
    console.log(this.props);

    return this.props.canView() ? this.props.yield : <Login />;
  }

  render() {
    return (
    <div className="app-root ui pushable">
      <Menu />
      <div className="pusher">
        <TopBar />
        {this.getView()}
      </div>
    </div>
    );
  }

}

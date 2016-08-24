import React from 'react';
import { Meteor } from 'meteor/meteor';

Settings = React.createClass({

  mixins:[ReactMeteorData],
  getMeteorData() {
    return {};
  },

  render() {
    return (
    <AuthedComponentContainer params={{accessLevel: "admin"}}>
      <div className="ui container">
        <div className="ui header">
          <i className="violet settings icon"></i>
          <div className="content">
            <h2>Settings</h2>
          </div>
        </div>
      </div>
    </AuthedComponentContainer>
    );
  }

});

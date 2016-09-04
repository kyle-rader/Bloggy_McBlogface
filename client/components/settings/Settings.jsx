import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

Settings = class Settings extends Component {

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

}

import React from 'react';
import { Meteor } from 'meteor/meteor';

Archive = class Archive extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <i className="teal archive icon"></i>
        <div className="content">
          <h2>Archive</h2>
        </div>
      </div>
    </div>
    );
  }

}

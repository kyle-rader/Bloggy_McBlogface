import React from 'react';
import { Meteor } from 'meteor/meteor';

Resume = class Resume extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <i className="teal Resume icon"></i>
        <div className="content">
          <h2>Resume</h2>
        </div>
      </div>
    </div>
    );
  }

}

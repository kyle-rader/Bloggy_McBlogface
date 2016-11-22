import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon } from 'semantic-ui-react';

Archive = class Archive extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <Icon color="red" name="archive"></Icon>
        <div className="content">
          <h2>Archive</h2>
        </div>
      </div>

      <h3>Soon to come...</h3>
    </div>
    );
  }
};

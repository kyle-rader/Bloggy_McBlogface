import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon } from 'semantic-ui-react';

Tags = class Tags extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <Icon color="orange" name="tag"></Icon>
        <div className="content">
          <h2>Tags</h2>
        </div>
      </div>
    </div>
    );
  }
};

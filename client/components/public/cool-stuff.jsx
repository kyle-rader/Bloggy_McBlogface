import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon } from 'semantic-ui-react';

CoolStuff = class CoolStuff extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <Icon color="blue" name="cubes" />
        <div className="content">
          <h2>Cool Stuff</h2>
        </div>
      </div>
    </div>
    );
  }
};

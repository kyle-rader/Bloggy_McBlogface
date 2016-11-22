import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon } from 'semantic-ui-react';

Puzzles = class Puzzles extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <Icon color="violet" name="puzzle" />
        <div className="content">
          <h2>Puzzles</h2>
          <h3>Soon to come...</h3>
        </div>
      </div>
    </div>
    );
  }
};

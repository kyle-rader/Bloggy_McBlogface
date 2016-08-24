import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Editor, EditorState} from 'draft-js';

BlogEditor = class BlogEditor extends React.Component {

  render() {
    return (
    <AuthedComponentContainer params={{accessLevel: "admin"}}>
      <div className="ui container">
        <div className="ui header">
          <i className="green edit icon"></i>
          <div className="content">
            <h2>Editor</h2>
          </div>
        </div>
      </div>
    </AuthedComponentContainer>
    );
  }
}
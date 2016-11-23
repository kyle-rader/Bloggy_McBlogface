import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

BlogEditor = class BlogEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params: { postId } } = this.props;

    return (
    <Authed params={{accessLevel: "admin"}}>
      <div className="ui container">
        <div className="ui header">
          <i className="green edit icon"></i>
          <div className="content">
            <h2>Editor</h2>
          </div>
        </div>

        <div className="ui grid">
          <div className="four wide column">
            <PostListSelector activePost={postId} />
          </div>

          <div className="twelve wide column">
            <PostEditor postId={postId} />
          </div>
        </div>
      </div>
    </Authed>
    );
  }
}

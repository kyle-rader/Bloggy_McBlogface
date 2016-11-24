import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';

BlogEditor = class BlogEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params: { postId } } = this.props;

    const postEditor = postId ?
      <PostEditor postId={postId} /> :
      (<Message info>
        <Message.Header>No post is selected.</Message.Header>
        <p>Make a new one or select one on the left!</p>
      </Message>);

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
            {postEditor}
          </div>
        </div>
      </div>
    </Authed>
    );
  }
}

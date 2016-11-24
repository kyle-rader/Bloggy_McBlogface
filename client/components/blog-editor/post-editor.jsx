import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Menu, Button, Icon, Form, Confirm, Loader, Segment, Dimmer } from 'semantic-ui-react';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

PostEditor = class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      title: '',
      body: '',
    };

    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleBodyChange = this._handleBodyChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({
        title: nextProps.post.title,
        body: nextProps.post.body,
      });
    }
  }

  _savePost(e) {
    e.preventDefault();
    console.log(`Saving Post: ${this.props.post._id}`);
  }

  _openConfirmDelete(e) {
    e.preventDefault();
    console.log('Openning delete confirmation');
    this.setState({ confirmDelete: true });
  }

  _deletePost(e) {
    e.preventDefault();
    console.log(`Delete Post: ${this.props.post._id}`);
    this.setState({ confirmDelete: false });
  }

  _renderDeleteModal() {
    return (
      <Confirm
        cancelButton='Nope! Nope! Nope!'
        confirmButton='Make it so!'
        content='You are about to delete this post'
        header='Are you sure?'
        onCancel={(e) => this.setState({ confirmDelete: false })}
        onConfirm={(e) => this._deletePost(e)}
        open={this.state.confirmDelete}
      >
      </Confirm>
    );
  }

  _handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  _handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  _renderEditForm() {
    return (
    <Form>
      <Form.Group>
        <Form.Button basic color="green" onClick={(e) => this._savePost(e)}>
          <Icon name="save"/>
          Save
        </Form.Button>
        <Form.Button basic color="red" onClick={(e) => this._openConfirmDelete(e)}>
          <Icon name="trash"/>
          Delete
        </Form.Button>
      </Form.Group>
      <Form.Input label="Title" name="title" placeholder="Title..." value={this.state.title} onChange={(e, val) => this._handleTitleChange(e, val)}/>
      <Form.TextArea label="Body" name="body" placeholder="Body..." value={this.state.body} onChange={(e, val) => this._handleBodyChange(e, val)}/>
    </Form>
    );
  }

  _renderMain() {
    return (
    <div>
      {this._renderEditForm()}
      {this._renderDeleteModal()}
    </div>
    );
  }

  render() {
    if (this.props.loading) {
      return (
      <Segment>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </Segment>
      );
    } else {
      return this._renderMain();
    }
  }

};

/* Make PostEditor a container */
PostEditor = createContainer(({ postId }) => {

  const postHandle = Meteor.subscribe('posts.one', postId);

  const options = {
    fields: {
      title: 1,
      body: 1,
      createdAt: 1,
      lastUpdated: 1,
      published: 1,
    }
  };
  const post = Posts.findOne({ _id: postId }, options);
  const loading = !post;

  return {
    loading,
    post,
  };

}, PostEditor);

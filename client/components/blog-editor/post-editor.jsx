import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Menu, Button, Icon, Form, Confirm, Loader, Segment, Dimmer, Message } from 'semantic-ui-react';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

PostEditor = class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({
        title: nextProps.post.title,
        body: nextProps.post.body,
      });
    }
  }

  _savePost(e, val) {
    e.preventDefault();
    Meteor.call('postUpdate', {
      _id: this.props.postId,
      title: val.title,
      body: val.body,
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        this.setState(
          { showSaved: true },
          () => Meteor.setTimeout(() => this.setState({ showSaved: false }), 2000)
        );
      }
    });
  }

  _openConfirmDelete(e) {
    e.preventDefault();
    this.setState({ confirmDelete: true });
  }

  _deletePost(e) {
    e.preventDefault();
    Meteor.call('postDelete', this.props.postId, (err, res) => {
      if (err) {
        alert(err);
      }
      browserHistory.push('/editor');
    });
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
    <Form onSubmit={(e, val) => this._savePost(e, val)} success={this.state.showSaved}>
      <Form.Group>
        <Form.Button basic color="green" type="submit">
          <Icon name="save"/>
          Save
        </Form.Button>
        <Form.Button basic color="red" onClick={(e) => this._openConfirmDelete(e)}>
          <Icon name="trash"/>
          Delete
        </Form.Button>
      </Form.Group>
      <Message
        success
        header='Post Saved!'
        content="May the force be with you."
      />
      <Form.Input label="Title" name="title" placeholder="Title..." value={this.state.title} onChange={(e) => this._handleTitleChange(e)}/>
      <Form.TextArea label="Body" name="body" placeholder="Body..." value={this.state.body} onChange={(e) => this._handleBodyChange(e)}/>
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
          <br/>
          <Loader>Loading</Loader>
          <br/>
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

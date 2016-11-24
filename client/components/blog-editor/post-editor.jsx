import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Menu, Button, Icon, Form, Confirm } from 'semantic-ui-react';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

PostEditor = class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
    };
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

  _renderMenu() {
    return (
     <Menu secondary>
      <Menu.Item>
        <Button basic color="green" onClick={(e) => this._savePost(e)}>
          <Icon name="save"/>
          Save
        </Button>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Button basic color="red" onClick={(e) => this._openConfirmDelete(e)}>
            <Icon name="trash"/>
            Delete
          </Button>
        </Menu.Item>
      </Menu.Menu>
     </Menu>
    );
  }

  render() {
    return (
    <div>
      <Form>
        {this._renderMenu()}
      </Form>
      {this._renderDeleteModal()}
    </div>
    );
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

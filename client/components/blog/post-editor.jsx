import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {
  Grid,
  Menu,
  Button,
  Icon,
  Form,
  Confirm,
  Radio,
  Loader,
  Segment,
  Dimmer,
  Message,
  Header,
} from 'semantic-ui-react';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

PostEditor = class PostEditor extends Component {
  constructor(props) {
    super(props);
    const state = {
      confirmDelete: false,
    };
    if (props.post) {
      state.title = props.post.title;
      state.body = props.post.body;
      state.published = props.post.published;
    }

    this.state = state;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({
        title: nextProps.post.title,
        body: nextProps.post.body,
        published: nextProps.post.published,
      });
    }
  }

  _savePost(e) {
    if (e) e.preventDefault();
    const { title, body, published } = this.state;

    Meteor.call('postUpdate', {
      _id: this.props.postId,
      title,
      body,
      published,
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        this.setState(
          { showSaved: true },
          () => Meteor.setTimeout(() => this.setState({ showSaved: false }), 1000)
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

  _handleBodyChange(val) {
    this.setState({ body: val });
  }

  _handlePublishedChange(e, checked) {
    this.setState({ published: checked });
  }

  _renderEditForm() {
    return (
    <Form success={this.state.showSaved}>
      <Form.Group>
        <Form.Button basic color="green" onClick={(e) => this._savePost(e)}>
          <Icon name="save"/>
          Save
        </Form.Button>
        <Form.Button basic color="red" onClick={(e) => this._openConfirmDelete(e)}>
          <Icon name="trash"/>
          Delete
        </Form.Button>
        <Form.Checkbox toggle name="published" label="Published" checked={this.state.published} onChange={(e, { checked }) => this._handlePublishedChange(e, checked)} />
      </Form.Group>
      <Form.Input label="Title" name="title" placeholder="Title..." value={this.state.title} onChange={(e) => this._handleTitleChange(e)}/>
      <Form.Field>
        <label>Post</label>
        <AceEditor
          name="body"
          placeholder="Body..."
          value={this.state.body}
          onChange={(val) => this._handleBodyChange(val)}
          mode="markdown"
          theme="monokai"
          width="100%"
          height="600px"
          tabSize={2}
          editorProps={{$blockScrolling: Infinity}}
          commands={[{
            name: "Save",
            bindKey: { win: "Ctrl-S", mac: "Command-S" },
            exec: () => this._savePost(),
          }]}
        />
      </Form.Field>
      <Message
        success
        header='Post Saved!'
        content="May the force be with you."
      />
    </Form>
    );
  }

  _renderMain() {
    const { post } = this.props;
    return (
    <div>
      <Grid stackable columns='2'>
        <Grid.Column mobile='16' computer='10'>
          {this._renderEditForm()}
        </Grid.Column>
        <Grid.Column mobile='16' computer='6'>
          <Grid centered>
            <Grid.Column mobile='16' widescreen='12'>
              <Post title={post.title} body={post.body} createdAt={post.createdAt} lastUpdated={post.lastUpdated} />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      {this._renderDeleteModal()}
    </div>
    );
  }

  _renderLoading() {
    return (
    <Segment>
      <Dimmer active>
        <br/><br/>
        <Loader>Loading</Loader>
        <br/><br/>
      </Dimmer>
    </Segment>
    );
  }

  render() {
    if (this.props.loading) {
      return this._renderLoading();
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

import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import { Container, Message, Header, Icon, Grid } from 'semantic-ui-react';

BlogEditor = class BlogEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _newPost(e) {
    e.preventDefault();

    Meteor.call('postCreate', (err, res) => {
      if(err) {
        alert(err);
      } else {
        browserHistory.push(`/editor/${res}`);
      }
    });
  }

  render() {
    const { params: { postId } } = this.props;

    let postEditor = null;
    if (postId) {
      postEditor = <PostEditor postId={postId} />;
    }
    else {
      postEditor = (
        <Message info>
          <Message.Header>No post is selected.</Message.Header>
          <p><a onClick={(e) => this._newPost(e)} href="">Make a new one</a> or select one on the left!</p>
        </Message>
      );
    }

    return (
    <Authed params={{accessLevel: "admin"}}>
      <Container fluid className="editor-container">
        <Header>
          <Icon color="green" name="edit" />
          <Header.Content>
            <h2>Editor</h2>
          </Header.Content>
        </Header>

        <Grid>
          <Grid.Column mobile={16} tablet={6} computer={3} widescreen={2}>
            <PostListSelector activePost={postId} newPost={this._newPost}/>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={10} computer={13} widescreen={14}>
            {postEditor}
          </Grid.Column>
        </Grid>
      </Container>
    </Authed>
    );
  }
}

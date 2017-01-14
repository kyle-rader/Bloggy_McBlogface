import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid, List } from 'semantic-ui-react';

PostList = class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderPosts() {
    return this.props.posts.map((post) => (
      <List.Item key={post._id}>
        <Post
          title={post.title}
          body={post.body}
          createdAt={post.createdAt}
          lastUpdated={post.lastUpdated}
          />
      </List.Item>
    ));
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    }

    return (
      <Grid>
        <Grid.Row centered columns='1'>
          <Grid.Column mobile='14' tablet='12' computer='10' widescreen='10' largeScreen='10'>
            <List relaxed='very'>
              {this._renderPosts()}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

PostList = createContainer(({ page }) => {
  const postsHandle = Meteor.subscribe('posts.public', page);
  const loading = !postsHandle.ready();

  const options = {
    fields: {
      title: 1,
      body: 1,
      createdAt: 1,
      lastUpdated: 1,
      tags: 1,
    },
    sort: { createdAt: -1 }
  };

  const posts = Posts.find({}, options).fetch();

  return {
    loading,
    posts,
  };

}, PostList);

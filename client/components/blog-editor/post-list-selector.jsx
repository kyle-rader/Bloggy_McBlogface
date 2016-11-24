import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

const DATE_FORMAT = 'MMM D, YYYY';

PostListSelector = class PostListSelector extends Component {

  constructor(props) {
    super(props);
  }

  _renderPosts() {
    return this.props.posts.map((post) => {
      const icon = post.published ? <i className="green checkmark icon"></i> : <i className="orange edit icon"></i>;
      const createdAt = moment(post.createdAt).format(DATE_FORMAT);
      const lastUpdated = moment(post.lastUpdated).fromNow();
      const className = `${this.props.activePost == post._id ? 'active' : ''} item`;
      return (
        <Link to={`/editor/${post._id}`} className={ className } key={post._id}>
          { icon }
          <div className="content">
            <div className="header">
              { post.title }
            </div>
            <div className="description">
              <span className="last-edit"><strong>Last Edit: &nbsp;</strong><br/> { lastUpdated }</span>
              <span className="created-at"><strong>Created: &nbsp;</strong><br/> { createdAt }</span>
            </div>
          </div>
        </Link>
      );
    });
  }

  _renderLoading() {
    return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
    </div>
    );
  }

  render() {
    const posts = this.props.loading ? this._renderLoading() : this._renderPosts();

    return (
      <div className="ui relaxed vertical fluid list post-list">
        { posts }
      </div>
    );
  }
};

PostListSelector = createContainer(({ params }) => {

  const postsHandle = Meteor.subscribe('posts.all');
  const loading = !postsHandle.ready();

  const options = {
    fields: {
      title: 1,
      createdAt: 1,
      lastUpdated: 1,
      published: 1,
    },
    sort: { createdAt: -1 }
  };
  const posts = Posts.find({}, options).fetch();

  return {
    loading,
    posts,
  };

}, PostListSelector);

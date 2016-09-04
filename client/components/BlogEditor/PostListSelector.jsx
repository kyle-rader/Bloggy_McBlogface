import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

PostListSelector = class PostListSelector extends Component {

  _renderPosts() {
    return this.props.posts.map((post) => {
      const icon = post.published ? <i className="green checkmark icon"></i> : <i className="orange edit icon"></i>;
      return (
        <div className="item" key={post._id}>
          { icon }
          <div className="content">
            <div className="header">
              { post.title }
            </div>
            <div className="description">
              <strong>Last Edit:</strong> { post.lastUpdated.toString() }
            </div>
          </div>
        </div>
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
      <div className="ui relaxed list">
        { posts }
      </div>
    );
  }
}

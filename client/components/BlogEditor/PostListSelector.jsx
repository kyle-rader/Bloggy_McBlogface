import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import moment from 'moment';

const DATE_FORMAT = 'Y-M-D H:m';

PostListSelector = class PostListSelector extends Component {

  constructor(props) {
    console.log('PostList constructed.');
    console.log(props);

    super(props);

    this.state = {
      activePost: props.activePost || null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update')
  }

  componentWillReceiveProps(nextProps) {
    console.log('Will receive new props', nextProps);

    let activePost = this.state.activePost;
    if (!activePost && !nextProps.loading && nextProps.posts.length > 0)
      this.setState({ activePost: nextProps.posts[0]._id });
  }

  _renderPosts() {
    return this.props.posts.map((post) => {
      const icon = post.published ? <i className="green checkmark icon"></i> : <i className="orange edit icon"></i>;
      const createdAt = moment(post.createdAt).format(DATE_FORMAT);
      const lastUpdated = moment(post.lastUpdated).format(DATE_FORMAT);
      const className = `${this.state.activePost == post._id ? 'active' : ''} item`;
      return (
        <a className={ className } key={post._id}>
          { icon }
          <div className="content">
            <div className="header">
              { post.title }
            </div>
            <div className="description">
              <span className="last-edit"><strong>Last Edit : &nbsp;</strong> { lastUpdated }</span>
              <span className="created-at"><strong>Created  &nbsp;&nbsp;: &nbsp;</strong> { createdAt }</span>
            </div>
          </div>
        </a>
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
}

import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';

PostEditor = class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <pre>{JSON.stringify(this.props, null, 4)}</pre>;
  }
};

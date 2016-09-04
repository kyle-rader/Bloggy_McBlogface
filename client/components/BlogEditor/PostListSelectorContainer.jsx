import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

PostListSelectorContainer = createContainer(({ params }) => {
  // const { accessLevel } = params;

  const postsHandle = Meteor.subscribe('posts.editor.list');
  const loading = !postsHandle.ready();

  const options = {
    fields: {
      title: 1,
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

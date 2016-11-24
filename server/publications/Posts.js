import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { requireAdmin, isAdmin, nonEmptyString } from '../../lib/imports/helpers.js';

const LIMIT = 3;

Meteor.publish('posts.all', function() {

  if (!isAdmin()) {
    return [];
  }

  const options = {
    fields: {
      author: 1,
      title: 1,
      body: 1,
      createdAt: 1,
      lastUpdated: 1,
      published: 1,
      tags: 1,
    },
    sort: { createdAt: -1 },
  };

  return Posts.find({ author: this.userId }, options);

});

Meteor.publish('posts.public', function(page) {

  check(page, Number);

  const options = {
    fields: {
      title: 1,
      body: 1,
      createdAt: 1,
      lastUpdated: 1,
      tags: 1,
    },
    sort: { createdAt: -1 },
    skip: (page - 1) * LIMIT,
    limit: LIMIT,
  };

  return Posts.find({ published: true }, options);

});

Meteor.publish('posts.one', function(postId) {
  check(postId, nonEmptyString);

  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return [];
  }

  const options = {
    fields: {
      author: 1,
      title: 1,
      body: 1,
      createdAt: 1,
      lastUpdated: 1,
      published: 1,
      tags: 1,
    },
    sort: { createdAt: -1 },
  };

  return Posts.find({ author: this.userId, _id: postId }, options);

});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { nonEmptyString } from '../../lib/imports/helpers.js';

Meteor.publish('posts.all', function() {
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

  return Posts.find({ author: this.userId }, options);

});

Meteor.publish('posts.one', function(postId) {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return {};
  }

  check(postId, nonEmptyString);

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

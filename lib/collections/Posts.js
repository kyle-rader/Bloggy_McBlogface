import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { requireAdmin, nonEmptyString } from '../imports/helpers.js';

Posts = new Mongo.Collection('posts');

PostsSchema = new SimpleSchema({
  _id: { type: String },
  author: { type: String },
  title: { type: String },
  body: { type: String },
  createdAt: { type: Date, defaultValue: new Date() },
  lastUpdated: { type: Date, defaultValue: new Date() },
  published: { type: Boolean, defaultValue: false },
  tags: { type: [String], defaultValue: [] },
});

Posts.attachSchema(PostsSchema);

Meteor.methods({
  postUpdate(fields) {
    requireAdmin();

    check(fields, Object);
    check(fields._id, nonEmptyString);
    check(fields.title, nonEmptyString);
    check(fields.body, nonEmptyString);
    check(fields.published, Boolean);

    fields.lastUpdated = new Date();

    if (Meteor.isServer) {
      return Posts.update({ _id: fields._id, author: this.userId }, { $set: fields });
    }
  },

  postCreate() {
    requireAdmin();

    const newPost = {
      author: this.userId,
      title: 'New Post...',
      body: '# New Post',
      lastUpdated: new Date(),
      createdAt : new Date(),
      published: false,
      tags: [],
    };
    PostsSchema.clean(newPost);

    return Posts.insert(newPost);
  },

  postDelete(postId) {
    requireAdmin();

    check(postId, nonEmptyString);

    return Posts.remove({ _id: postId, author: this.userId });
  },

});

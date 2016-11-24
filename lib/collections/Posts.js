import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { requireAdmin, nonEmptyString } from '../imports/helpers.js';

Posts = new Mongo.Collection('posts');

PostsSchema = new SimpleSchema({
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
  postUpsert(fields) {
    requireAdmin();

    check(fields, Object);
    check(fields.id, Match.Maybe(String));
    check(fields.title, nonEmptyString);
    check(fields.body, nonEmptyString);

    fields.author = this.userId;

    PostsSchema.clean(fields);

    return Posts.upsert({ _id: fields.id }, { $set: fields });

  },

  postCreate() {
    requireAdmin();

    const newPost = {
      author: this.userId,
      title: 'New Post...',
      body: '# New Post',
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

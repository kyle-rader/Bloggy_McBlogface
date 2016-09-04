import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
  title: { type: String },
  body: { type: String },
  createdAt: { type: Date, defaultValue: new Date() },
  lastUpdated: { type: Date, defaultValue: new Date() },
  published: { type: Boolean },
  tags: { type: [String] },
});

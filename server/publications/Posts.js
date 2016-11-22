import { Meteor } from 'meteor/meteor';

Meteor.publish('posts.editor.list', function() {
  const user = Meteor.users.findOne(this.userId);

  if (!user || !user.hasRole('admin')) {
    return [];
  }

  const options = {
    fields: {
      title: 1,
      createdAt: 1,
      lastUpdated: 1,
      published: 1,
    },
    sort: { createdAt: -1 }
  };

  return Posts.find({}, options);

});

import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function() {
    let currentUser = this.userId;

    if (currentUser) {
      return Meteor.users.find({ _id: currentUser }, {
        fields: {
          // Default
          emails: 1,
          // Default
          profile: 1,
          // Created roles property
          roles: 1
        }}
      );
    } else {
      return this.ready();
    }
});

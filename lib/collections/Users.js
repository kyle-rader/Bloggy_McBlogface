import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { requireAdmin } from '../imports/helpers.js';

// User collection is already define by accounts-base package

// Ensure index
Meteor.startup(function () {
    if (Meteor.isServer) {
        Meteor.users._ensureIndex({ "profile.firstname": 1, "profile.lastname": 1});
    }
});

Meteor.methods({

  userSendPasswordReset(fields) {
    check(fields, {
      email: String
    });

    if (Meteor.isServer) {
      let user = Accounts.findUserByUsername(fields.email);
      if (user) {
        Accounts.sendResetPasswordEmail(user._id);
        return {email: user.emails[0].address};
      }
      else {
        throw new Meteor.Error(400, 'No account found with that username!');
      }
    }
  }
});

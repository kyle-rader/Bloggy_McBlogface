import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// User collection is already define by accounts-base package

// Ensure index
Meteor.startup(function () {
    if (Meteor.isServer) {
        Meteor.users._ensureIndex({ "profile.firstname": 1, "profile.lastname": 1});
    }
});

// User collections methods:
let checkMinLength = function(length) {
    return Match.Where((x) => {
        check(x, String);
        return x.length >= length;
    });
};

let checkForAdmin = function() {
    if (!Meteor.userId) {
        throw new Meteor.Error(400, 'You must be logged in');
    }
    else if (Meteor.user().roles.indexOf('admin') < 0) {
        throw new Meteor.Error(400, 'You do not have permission to do that!');
    }
};

Meteor.methods({
    userCreate(fields) {
        check(fields, {
            firstname: String,
            lastname: String,
            email: String,
            password: checkMinLength(6),
            confirmPassword: String,
            phone: String,
        });

        let date = new Date();

        let userId = Accounts.createUser({
            email: fields.email,
            password: fields.password,
            username: fields.email,
            firstname: fields.firstname.trim(),
            lastname: fields.lastname.trim(),
            displayname: fields.firstname.trim() + ' ' + fields.lastname.trim(),
            phone: fields.phone.trim(),
            created: date,
            updated: date
        });

        if (Meteor.isServer) {
          Accounts.sendVerificationEmail(userId);
        }

        return {email: fields.email};
    },

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

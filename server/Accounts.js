// Setup Email Verification
Accounts.emailTemplates.siteName = 'Meteor-React-Starter';
Accounts.emailTemplates.from = 'Meteor-React-Starter <accounts@Meteor-React-Starter.com>';
Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return 'Verification Email: ' + user.profile.firstname;
    },
    html(user, url) {
        return `
<p>Hi ${user.profile.firstname}!</p>
<p>Note your username is <strong>${user.username}</strong>
<p>Please verify your email address by clicking <a href='${url}'>here</a>.</p>
<br>
<p>
Cheers,
Meteor-React-Starter
</p>`;
    }
};

// Setup Enrollement/ Migration email
Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return user.profile.firstname + ', welcome to Meteor-React-Starter';
    },
    html(user, url) {
        return `Welcome ${user.profile.firstname}, Meteor-React-Starter
  In order to finish your account migration please reset your password on the new site by clicking <a href="${url}">here</a>.
  Cheers,
  Meteor-React-Starter`;
    }
};

Accounts.validateLoginAttempt((attempt) => {
    if (!attempt.allowed) {
        return false;
    }
    else if (attempt.user && !attempt.user.emails[0].verified) {
        throw new Meteor.Error(400, 'You must verify your email before logging in!  Questions? See our Contact page.');
    }
    else {
        return true;
    }
});

// Extending Account Creation
Accounts.onCreateUser((options, user) => {
    user.profile = options.profile || {};

    // Assign all other properties from the options
    user = _.extend(user, {
        profile: {
            firstname: options.firstname,
            lastname: options.lastname,
            displayname: options.displayname,
        },
        roles: ['user']
    });

    return user;
});

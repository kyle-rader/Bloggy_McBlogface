// Setup Email Verification
Accounts.emailTemplates.siteName = Meteor.settings.siteName;
Accounts.emailTemplates.from = Meteor.settings.accounts.fromEmail;
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
${Meteor.settings.siteName}
</p>`;
    }
};

// Setup Enrollement/ Migration email
Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return `${user.profile.firstname}, welcome to ${Meteor.settings.siteName}`;
    },
    html(user, url) {
        return `Welcome ${user.profile.firstname}, ${Meteor.settings.siteName}
  In order to finish your account migration please reset your password on the new site by clicking <a href="${url}">here</a>.
  Cheers,
  ${Meteor.settings.siteName}`;
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

    // Assign all other properties from the options
    user = _.extend(user, {
        firstName: options.firstname,
        lastName: options.lastname,
        displayName: `${options.firstname.slice(0,1).toUpperCase()}${options.firstname.slice(1).toLowerCase()} ${options.lastname.slice(0,1).toUpperCase()}${options.lastname.slice(1).toLowerCase()}`,
        roles: ['user'],
    });

    return user;
});

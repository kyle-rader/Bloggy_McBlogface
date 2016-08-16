import { FlowRouter } from 'meteor/kadira:flow-router';

Accounts.onLogin(() => {
    let currentRoute = FlowRouter.current(),
        path = currentRoute.path;

    // If you want to go to a dashboard or profile page on login - replace FlowRouter.go('/') with your desired default path.
    return (path === '/login' || path === '/register') ? FlowRouter.go('/') : FlowRouter.go(path);
});

// Verify this user via token (also logs the user in)
Accounts.onEmailVerificationLink((token, done) => {
    Accounts.verifyEmail(token, (err) => {
        if (err) {
            // Route to bad link page
            console.log(err);
        } else {
            done();

            // This is where the user will go after a successful email verification link has been clicked.
            FlowRouter.go('/');
        }
    });
});

// Redirect users clicking the enrollment URL to the reset password form 
// now that we have their reset token.
Accounts.onEnrollmentLink((token, done) => {
    done();
    FlowRouter.go('/passwordreset/' + token);
});


// Redirect users clicking the reset password URL to the reset password from
// now that we have theur reset token
Accounts.onResetPasswordLink((token, done) => {
    done();
    FlowRouter.go('/passwordreset/' + token);
});

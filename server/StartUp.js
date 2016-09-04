/*
 * Meteor Startup:
 * For running appliction startup code
*/

Meteor.startup(() => {

    if (!Meteor.isServer)
    return;

  // Check for Admin account
  let adminUser = Meteor.users.findOne({roles: 'admin'});

  if (adminUser === undefined) {
    if (Meteor.settings.admin === undefined) {
        logger.error("No \"admin\" object found in \"Meteor.settings\"");
    }
    else if (Meteor.settings.admin.username === undefined) {
        logger.error("No \"username\" field found in \"Meteor.settings.admin\"");
    }
    else if (Meteor.settings.admin.email === undefined) {
        logger.error("No \"email\" field found in \"Meteor.settings.admin\"");
    }
    else if (Meteor.settings.admin.password === undefined) {
        logger.error("No \"password\" field found in \"Meteor.settings.admin\"");
    }

    const adminId = Accounts.createUser({
      username: Meteor.settings.admin.username,
      password: Meteor.settings.admin.password,
      firstname: Meteor.settings.admin.firstname,
      lastname: Meteor.settings.admin.lastname,
    });

    Accounts.addEmail(adminId, Meteor.settings.admin.email, true);

    Meteor.users.update({_id: adminId}, {
      $push: { roles: 'admin'}
    });

    adminUser = Meteor.users.findOne({roles: 'admin'});
    Meteor.logger.info("New Admin User: ");
  } else {
    Meteor.logger.info("Found Admin User: ");
  }
  Meteor.logger.logobj(adminUser);

});

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

TopBarContainer = createContainer(({ params }) => {
  const user = Meteor.user();
  return {
    user,
    isAdmin() {
      return user ? user.hasRole('admin') : false;
    }
  };
}, TopBar);

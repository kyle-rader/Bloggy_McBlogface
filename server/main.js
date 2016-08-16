import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const logger = require('winston');

Meteor.logger = logger;

require('./StartUp.js');
require('./Accounts.js');



import User from '../models/user';
import { Roles } from './constants';
import logger from './logger';

function createUserAdmin() {
  const newUser = new User({
    name: 'Administrator',
    lastname: 'Application',
    email: 'admin@infocar.com',
    password: 'infocar@1234',
    enabled: true,
    role: Roles.ADMIN,
  });

  newUser
    .save()
    .catch((err) => {
      logger.info(err.message);
    });
}

export function initializeApplication() {
  createUserAdmin();
}

export default initializeApplication;

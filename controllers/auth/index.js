const userRegister = require('./register');

const userLogin = require('./login');

const logout = require('./logout');

const getCurrent = require('./getCurrent');

const updateSubscription = require('./updateSubscription');

const uploadAvatar = require('./uploadAvatar');

const { ctrlWrapper } = require('../../dec');

module.exports = {
  userRegister: ctrlWrapper(userRegister),
  userLogin: ctrlWrapper(userLogin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  uploadAvatar: ctrlWrapper(uploadAvatar),
};

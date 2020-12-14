const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcryp = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email },
        });
        if (!user) {
          return done(null, false, { reason: 'user not found' });
        }
        const passwordCorrect = await bcryp.compare(password, user.password);
        if (!passwordCorrect) {
          return done(null, false, { reason: 'passwords do not match' });
        }
        return done(null, user);
      } catch (e) {
        console.error(e);
        return done(e);
      }
    },
  ));
};

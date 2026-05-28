require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        user.googleId = profile.id;
        user.avatar = user.avatar || profile.photos[0].value;
        await user.save({ validateBeforeSave: false });
      } else {
        user = await User.create({
          username: profile.displayName.replace(/\s+/g, '_') + '_' + profile.id.slice(-4),
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value,
          isVerified: true,
          isProfileComplete: false,
          unlockedTiers: ['Easy'],
        });
      }
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback',
  scope: ['user:email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
      user = await User.findOne({ email });
      if (user) {
        user.githubId = profile.id;
        user.avatar = user.avatar || profile.photos?.[0]?.value || '';
        await user.save({ validateBeforeSave: false });
      } else {
        user = await User.create({
          username: profile.username + '_' + profile.id.slice(-4),
          email,
          githubId: profile.id,
          avatar: profile.photos?.[0]?.value || '',
          isVerified: true,
          unlockedTiers: ['Easy'],
        });
      }
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
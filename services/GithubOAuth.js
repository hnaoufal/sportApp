const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const User = require('../models/users');

passport.use(new GitHubStrategy({
    clientID: 'ed5c897bb01b160352ce',
    clientSecret: '1c46c2237e67480156d4d19f7a47255f81fe21d0',
    callbackURL: 'http://127.0.0.1:30000/auth/github/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({githubId: profile.id}, function (err, user) {
            return cb(err, user);
        });
    }
));

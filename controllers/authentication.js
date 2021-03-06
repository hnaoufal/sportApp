const jwt = require('jwt-simple');
const User = require('../models/users');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    console.log(user.id);
    return jwt.encode({sub: user.id, iat: timestamp}, 'ohenuhoenuhoeu');
}

exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.body.email)});
};

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide an email'});
    }

    User.findOne({ email: email}, (err, existingUser) => {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use'});
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save((err) => {
            if (err) { return next(err); }

            res.json({token: tokenForUser(user)});
        });
    });

};

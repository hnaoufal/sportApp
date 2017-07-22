const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const User = require('./models/users');

mongoose.connection.openUri('mongodb://hichamn:hicham.naoufal@ds115573.mlab.com:15573/sportsapp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('openUri', () => {

});

const PORT = 30000;

const app = express();

User.find(function(err, user) {
    console.log(user);
});

const jsonParser = bodyParser.json();

app.post('/users', jsonParser, (req,res) => {
    if (!req.body) return res.sendStatus(400)
    const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        companyId: req.body.companyId,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, res) => {
        console.log(err, res);
    })
});

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.use('/', express.static('public'));

app.listen(PORT, () => {
    console.log(`Der Server wurde auf Port = ${PORT}`);
});

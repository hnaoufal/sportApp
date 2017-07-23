const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const User = require('./models/users');
const Event = require('./models/events');
const cors = require('cors');
const Authentication = require('./controllers/authentication');
const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth   = passport.authenticate('jwt', {session: false});

mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://hichamn:hicham.naoufal@ds115573.mlab.com:15573/sportsapp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('openUri', () => {

});

const PORT = 30000;

const app = express();

app.use(cors());

User.find(function(err, user) {
    console.log(user);
});

const jsonParser = bodyParser.json();

app.post('/users', jsonParser, (req,res) => {
    if (!req.body) return res.sendStatus(400);
    const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        companyId: req.body.companyId,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, ress) => {
        if (err) return res.sendStatus(400);
        return res.sendStatus(200);
    })
});

app.get('/users', (req,res) => {
    User.find( (err, user) => {
        res.send(user);
    });
});

app.post('/signup', jsonParser, Authentication.signup);
app.post('/signin', jsonParser, Authentication.signin);

app.get('/events', (req,res) => {
    Event.find( (err, event) => {
        res.send(event);
    });
});

app.get('/users/:id', (req,res) => {
    User.findOne({firstName: req.params.id},(err, user) => {
        res.send(user);
    });
});

app.post('/events', jsonParser, (req,res) => {
    if (!req.body) return res.sendStatus(400);
    const event = new Event({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        date: req.body.date,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        members: req.body.members,
        maxMembers: req.body.maxMembers,
    });

    event.save((err, ress) => {
        if (err) return res.sendStatus(400);
        return res.sendStatus(200);
    })
});

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.use('/', requireAuth, express.static('public'));

app.listen(PORT, () => {
    console.log(`Der Server wurde auf Port = ${PORT}`);
});

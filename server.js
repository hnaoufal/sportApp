const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const PORT = 30000;

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.use('/', express.static('client'));

app.listen(PORT, () => {
    console.log(`Der Server wurde auf Port = ${PORT}`);
});

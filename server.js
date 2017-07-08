const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(30000, () => {
    console.log("Server is running on Port 30000");
});

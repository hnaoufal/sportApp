const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        age: { type: GraphQLInt}
    }
});

/* Root Entry */
const RootQuery = new GraphQLObjectType({
    name: 'RootQType',
    fields: {
        user: {
            type: User,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                const users = axios.get('http://localhost:3000/users');

                return _.find(users, { id: args.id });
            }
        }
    }
});

const schema = new GraphQLSchema({
   query: RootQuery
});

module.exports = schema;

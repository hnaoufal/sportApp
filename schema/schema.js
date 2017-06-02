const graphql = require('graphql');
const _ = require('lodash');

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

/* Mocked-Data: Comes from MongoDB @Needs to be implemented */
const users = [
    { id: '24', firstName: 'Hicham', lastName: 'Naoufal', age: 31},
    { id: '25', firstName: 'Hiba', lastName: 'Naoufal', age: 29},
    { id: '23', firstName: 'Ala', lastName: 'Naoufal', age: 27},
    { id: '26', firstName: 'Susanna', lastName: 'Naoufal', age: 26}
];

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
                return _.find(users, { id: args.id });
            }
        }
    }
});

const schema = new GraphQLSchema({
   query: RootQuery
});

module.exports = schema;

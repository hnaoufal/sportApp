const graphql = require('graphql');

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
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

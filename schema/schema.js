const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/companies/${parent.id}/users`)
                    .then(res => res.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        age: { type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parent, args) {
                return axios.get(`http://localhost:30000/events/${parent.companyId}`)
                    .then(res => res.data);
            }
        }
    })
});

/* Root Entry */
const RootQuery = new GraphQLObjectType({
    name: 'RootQType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return axios.get(`http://localhost:30000/users/${args.id}`)
                    .then(resp => resp.data);
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return axios.get(`http://localhost:30000/events/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)},
                companyId: { type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:30000/users', { firstName: args.firstName, age: args.age })
                    .then( res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.delete(`http://localhost:30000/users/${args.id}`)
                    .then(resp => resp.data);
            }

        },
        updateUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString},
                age: { type: GraphQLInt},
                companyId: { type: GraphQLString},
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/users/${args.id}`, { firstName: args.firstName, age: args.age })
                    .then(resp => resp.data);
            }

        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
});

module.exports = schema;

const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// People Type
const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: () => ({
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    birth_year: { type: GraphQLString }
  })
});

// Person Type
const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    gender: { type: GraphQLString },
    mass: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    birth_year: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    people: {
      type: new GraphQLList(PeopleType),
      resolve(parent, args) {
        return axios
          .get("https://swapi.dev/api/people/")
          .then(res => res.data.results);
      }
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://swapi.dev/api/people/${args.id}`)
          .then(res => res.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
